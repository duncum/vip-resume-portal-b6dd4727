
/**
 * Utility for handling API requests to Google Sheets
 */

import { toast } from "sonner";
import { Candidate } from '../../types';
import { rowToCandidate } from '../../data-mapper';
import { getBackoffDelay } from './rateLimiter';
import { updateCache } from './cacheManager';
import { incrementFailures, resetFailures } from './failureTracker';

// Maximum number of retries for API requests
const MAX_RETRIES = 3;

/**
 * Fetch data from Google Sheets API with retry mechanism
 * @param {string} spreadsheetId The ID of the spreadsheet
 * @param {string} range The range to fetch
 * @returns {Promise<Candidate[]>} The candidates fetched from the API
 */
export const fetchSheetsData = async (
  spreadsheetId: string, 
  range: string
): Promise<Candidate[]> => {
  console.log("Making API request to Google Sheets with spreadsheet ID:", spreadsheetId);
  console.log("Range:", range);
  
  // Implement retry with exponential backoff
  let response;
  let attemptCount = 0;
  let lastError;
  
  while (attemptCount <= MAX_RETRIES) {
    try {
      response = await window.gapi.client.sheets.spreadsheets.values.get({
        spreadsheetId,
        range
      });
      break; // Success! Exit the retry loop
    } catch (error) {
      lastError = error;
      attemptCount++;
      
      if (attemptCount <= MAX_RETRIES) {
        // Wait with exponential backoff before retrying
        const delay = getBackoffDelay(attemptCount - 1);
        console.log(`API request failed, retrying (${attemptCount}/${MAX_RETRIES}) after ${delay}ms...`);
        await new Promise(resolve => setTimeout(resolve, delay));
      } else {
        console.error(`API request failed after ${MAX_RETRIES} retries`);
        throw error; // Rethrow to be caught by the outer catch block
      }
    }
  }
  
  if (!response) {
    throw lastError || new Error("Failed to get response from Google Sheets");
  }
  
  console.log("Response received from Google Sheets");
  const rows = response.result.values;
  
  if (!rows || rows.length === 0) {
    console.log("No data found in Google Sheet");
    toast.info("Your Google Sheet appears to be empty", {
      duration: 5000
    });
    throw new Error("No data found in Google Sheet");
  }
  
  // Convert rows to candidate objects
  console.log(`Found ${rows.length} candidates in the sheet`);
  const candidates = rows.map(row => {
    try {
      const candidate = rowToCandidate(row);
      return candidate;
    } catch (error) {
      console.error("Error parsing row:", row, error);
      // Return a minimal valid candidate to prevent crashes
      return {
        id: "error",
        headline: "Error parsing data",
        sectors: [],
        tags: [],
        category: "Error"
      } as Candidate;
    }
  });
  
  // Filter out error entries
  const validCandidates = candidates.filter(c => c.id !== "error");
  
  // Reset failure counter on success
  resetFailures();
  
  // Update cache
  updateCache(validCandidates);
  
  // Log success
  console.log(`Successfully converted ${validCandidates.length} candidates from ${rows.length} rows`);
  return validCandidates;
};
