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
  // Check if we have proper authorization
  const isAuthorized = await ensureAuthorization();
  
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
    console.log("Attempting to fetch candidates from Google Sheets");
    
    // Make sure we have a spreadsheet ID
    const spreadsheetId = localStorage.getItem('google_spreadsheet_id') || SPREADSHEET_ID;
    if (!spreadsheetId) {
      toast.error("Spreadsheet ID missing. Please add it in Google settings.", {
        duration: 5000
      });
      return mockCandidates;
    }
    
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
    const candidates = rows.map(rowToCandidate);
    return candidates;
  } catch (error: any) {
    console.error("Error fetching candidates from Google Sheets:", error);
    
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

/**
 * Fetch a single candidate by ID from Google Sheets API
 */
export const fetchCandidateById = async (id: string): Promise<Candidate> => {
  // Check if we have proper authorization
  const isAuthorized = await ensureAuthorization();
  
  if (!isAuthorized) {
    console.log("Not authorized, using mock data for single candidate");
    toast.warning("Using demo data - check Google integration settings", {
      duration: 4000
    });
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 500));
    const candidate = mockCandidates.find(c => c.id === id);
    
    if (!candidate) {
      throw new Error("Candidate not found");
    }
    
    return candidate;
  }
  
  try {
    // Make sure we have a spreadsheet ID
    const spreadsheetId = localStorage.getItem('google_spreadsheet_id') || SPREADSHEET_ID;
    if (!spreadsheetId) {
      toast.error("Spreadsheet ID missing. Please add it in Google settings.", {
        duration: 5000
      });
      
      // Fall back to mock data
      const candidate = mockCandidates.find(c => c.id === id);
      if (!candidate) throw new Error("Candidate not found");
      return candidate;
    }
    
    // Get all candidates and filter by ID
    const response = await window.gapi.client.sheets.spreadsheets.values.get({
      spreadsheetId: spreadsheetId,
      range: CANDIDATES_RANGE
    });
    
    const rows = response.result.values;
    
    if (!rows || rows.length === 0) {
      console.log("No data found in Google Sheet, using mock data");
      toast.info("Your Google Sheet appears to be empty", {
        duration: 5000
      });
      
      // Fall back to mock data
      const candidate = mockCandidates.find(c => c.id === id);
      if (!candidate) throw new Error("Candidate not found");
      return candidate;
    }
    
    // Find the row with the matching ID
    const candidateRow = rows.find(row => row[0] === id);
    
    if (!candidateRow) {
      console.log("Candidate not found in sheet, checking mock data");
      // Check mock data as fallback
      const mockCandidate = mockCandidates.find(c => c.id === id);
      if (!mockCandidate) throw new Error("Candidate not found");
      return mockCandidate;
    }
    
    return rowToCandidate(candidateRow);
  } catch (error: any) {
    console.error("Error fetching candidate from Google Sheets:", error);
    
    // More detailed error handling
    if (error.result?.error?.status === "PERMISSION_DENIED") {
      toast.error("Permission denied - make sure your sheet is shared publicly or with the service account", {
        duration: 6000
      });
    } else if (error.result?.error?.status === "NOT_FOUND") {
      toast.error("Spreadsheet not found - check your Spreadsheet ID", {
        duration: 5000
      });
    } else if (error.message === "Candidate not found") {
      toast.error("Candidate not found with ID: " + id, {
        duration: 5000
      });
      throw error;
    } else {
      toast.error("Failed to load candidate details", {
        duration: 5000
      });
    }
    
    // Fall back to mock data on error
    const candidate = mockCandidates.find(c => c.id === id);
    
    if (!candidate) {
      throw new Error("Candidate not found");
    }
    
    return candidate;
  }
};

/**
 * Add a new candidate to Google Sheets
 */
export const addCandidate = async (candidateData: any): Promise<boolean> => {
  // Check if we have proper authorization
  const isAuthorized = await ensureAuthorization();
  
  if (!isAuthorized) {
    console.log("Not authorized, mock candidate addition:", candidateData);
    
    // If we don't have Client ID set, show an informative message
    if (!localStorage.getItem('google_client_id') || localStorage.getItem('google_client_id') === '') {
      toast.warning("In API key only mode: data saved locally but not to Google Sheets", {
        duration: 6000
      });
      // Mark as success but warn user
      return true;
    }
    
    // Otherwise simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 500));
    toast.warning("Using local storage for candidate data due to limited Google access.", {
      duration: 4000
    });
    return true;
  }
  
  try {
    // Make sure we have a spreadsheet ID
    const spreadsheetId = localStorage.getItem('google_spreadsheet_id') || SPREADSHEET_ID;
    if (!spreadsheetId) {
      toast.error("Spreadsheet ID missing. Please add it in Google settings.", {
        duration: 5000
      });
      return false;
    }
    
    // Format the data for Google Sheets
    // Adjust column order based on how your sheet is structured
    const rowData = [
      candidateData.id,
      candidateData.headline,
      (candidateData.sectors || []).join(', '),
      (candidateData.tags || []).join(', '),
      candidateData.resumeUrl || '',
      (candidateData.titleCategories || [])[0] || '',
      candidateData.titles[(candidateData.titleCategories || [])[0]]?.[0] || '',
      candidateData.summary || '',
      candidateData.location || '',
      candidateData.relocationPreference || 'flexible'
    ];
    
    console.log("Attempting to append data to Google Sheet:", rowData);
    
    // Append the data to the Google Sheet
    await window.gapi.client.sheets.spreadsheets.values.append({
      spreadsheetId: spreadsheetId,
      range: CANDIDATES_RANGE,
      valueInputOption: 'USER_ENTERED',
      insertDataOption: 'INSERT_ROWS',
      resource: {
        values: [rowData]
      }
    });
    
    console.log("Data successfully appended to Google Sheet");
    toast.success("Candidate successfully added to Google Sheets");
    return true;
  } catch (error: any) {
    console.error("Error adding candidate to Google Sheets:", error);
    
    // Improved error handling with more specific messages
    if (error.result?.error?.code === 401 || error.result?.error?.code === 403) {
      // API key only mode - this is expected
      if (!localStorage.getItem('google_client_id') || localStorage.getItem('google_client_id') === '') {
        toast.warning("API key only mode: Can view data but not write to Google Sheets. Adding OAuth Client ID would enable write access.", {
          duration: 8000
        });
        // Still return true to not block the user
        return true;
      } else {
        toast.error("OAuth authentication required for adding candidates. Please check your Google settings.", {
          duration: 6000
        });
      }
    } else if (error.result?.error?.status === "NOT_FOUND") {
      toast.error("Spreadsheet not found - check your Spreadsheet ID", {
        duration: 5000
      });
    } else if (error.result?.error?.status === "PERMISSION_DENIED") {
      toast.error("Permission denied - make sure your sheet is shared with edit access", {
        duration: 6000
      });
    } else {
      toast.error("Failed to add candidate to Google Sheets: " + (error.result?.error?.message || "Unknown error"));
    }
    
    return false;
  }
};
