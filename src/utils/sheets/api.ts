
// Core API functions for interacting with Google Sheets
import { toast } from "sonner";
import { Candidate } from './types';
import { ensureAuthorization } from './auth-helper';
import { rowToCandidate } from './data-mapper';
import { SPREADSHEET_ID, CANDIDATES_RANGE } from './config';
import { mockCandidates } from './mock-data';

/**
 * Fetch all candidates from Google Sheets API
 */
export const fetchCandidates = async (): Promise<Candidate[]> => {
  // Check if we need to use mock data (during development or when not authorized)
  const useRealApi = await ensureAuthorization();
  
  if (!useRealApi) {
    console.log("Using mock data for candidates");
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    return mockCandidates;
  }
  
  try {
    const response = await window.gapi.client.sheets.spreadsheets.values.get({
      spreadsheetId: SPREADSHEET_ID,
      range: CANDIDATES_RANGE
    });
    
    const rows = response.result.values;
    
    if (!rows || rows.length === 0) {
      console.log("No data found in Google Sheet");
      return [];
    }
    
    // Convert rows to candidate objects
    const candidates = rows.map(rowToCandidate);
    return candidates;
  } catch (error) {
    console.error("Error fetching candidates from Google Sheets:", error);
    toast.error("Failed to load candidates from Google Sheets");
    return mockCandidates; // Fall back to mock data on error
  }
};

/**
 * Fetch a single candidate by ID from Google Sheets API
 */
export const fetchCandidateById = async (id: string): Promise<Candidate> => {
  // Check if we need to use mock data
  const useRealApi = await ensureAuthorization();
  
  if (!useRealApi) {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 800));
    const candidate = mockCandidates.find(c => c.id === id);
    
    if (!candidate) {
      throw new Error("Candidate not found");
    }
    
    return candidate;
  }
  
  try {
    // Get all candidates and filter by ID
    // A more efficient approach would be to use a query with a filter if your sheet is large
    const response = await window.gapi.client.sheets.spreadsheets.values.get({
      spreadsheetId: SPREADSHEET_ID,
      range: CANDIDATES_RANGE
    });
    
    const rows = response.result.values;
    
    if (!rows || rows.length === 0) {
      throw new Error("No data found in Google Sheet");
    }
    
    // Find the row with the matching ID
    const candidateRow = rows.find(row => row[0] === id);
    
    if (!candidateRow) {
      throw new Error("Candidate not found");
    }
    
    return rowToCandidate(candidateRow);
  } catch (error) {
    console.error("Error fetching candidate from Google Sheets:", error);
    toast.error("Failed to load candidate details");
    
    // Fall back to mock data on error
    const candidate = mockCandidates.find(c => c.id === id);
    
    if (!candidate) {
      throw new Error("Candidate not found");
    }
    
    return candidate;
  }
};
