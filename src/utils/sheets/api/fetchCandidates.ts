
import { toast } from "sonner";
import { Candidate } from '../types';
import { ensureAuthorization } from '../auth-helper';
import { rowToCandidate } from '../data-mapper';
import { SPREADSHEET_ID, CANDIDATES_RANGE } from '../config';
import { mockCandidates } from '../mock-data';

/**
 * Fetch all candidates from Google Sheets API
 */
export const fetchCandidates = async (): Promise<Candidate[]> => {
  // Check if we have proper authorization
  console.log("Starting fetchCandidates...");
  
  // Log critical configuration values
  const apiKey = localStorage.getItem('google_api_key');
  const spreadsheetId = localStorage.getItem('google_spreadsheet_id') || SPREADSHEET_ID;
  
  console.log("API Key exists:", !!apiKey);
  console.log("Spreadsheet ID:", spreadsheetId ? "Exists" : "Missing");
  
  const isAuthorized = await ensureAuthorization();
  console.log("Authorization check result:", isAuthorized);
  
  if (!isAuthorized) {
    console.log("Not authorized, using mock data for candidates");
    toast.warning("Using demo data - check Google integration settings", {
      duration: 4000
    });
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 500));
    return mockCandidates;
  }
  
  try {
    console.log("Authorized successfully, attempting to fetch candidates from Google Sheets");
    
    // Make sure we have a spreadsheet ID
    if (!spreadsheetId) {
      console.log("No spreadsheet ID found");
      toast.error("Spreadsheet ID missing. Please add it in Google settings.", {
        duration: 5000
      });
      return mockCandidates;
    }
    
    console.log("Making API request to Google Sheets with spreadsheet ID:", spreadsheetId);
    console.log("Range:", CANDIDATES_RANGE);
    
    const response = await window.gapi.client.sheets.spreadsheets.values.get({
      spreadsheetId: spreadsheetId,
      range: CANDIDATES_RANGE
    });
    
    console.log("Response received from Google Sheets:", response);
    const rows = response.result.values;
    
    if (!rows || rows.length === 0) {
      console.log("No data found in Google Sheet");
      toast.info("Your Google Sheet appears to be empty", {
        duration: 5000
      });
      return mockCandidates; // Return mock data if sheet is empty
    }
    
    // Convert rows to candidate objects
    console.log(`Found ${rows.length} candidates in the sheet`);
    const candidates = rows.map(rowToCandidate);
    return candidates;
  } catch (error: any) {
    console.error("Error fetching candidates from Google Sheets:", error);
    console.log("Error details:", JSON.stringify(error, null, 2));
    
    // More detailed error message based on the error type
    if (error.result?.error?.status === "PERMISSION_DENIED") {
      toast.error("Permission denied - make sure your sheet is shared publicly or with the service account", {
        duration: 6000
      });
    } else if (error.result?.error?.status === "NOT_FOUND") {
      toast.error("Spreadsheet not found - check your Spreadsheet ID", {
        duration: 5000
      });
    } else {
      toast.error("Failed to load data from Google Sheets - using demo data instead", {
        duration: 5000
      });
    }
    
    return mockCandidates; // Fall back to mock data on error
  }
};
