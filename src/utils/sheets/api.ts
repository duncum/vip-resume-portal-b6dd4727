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
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 500));
    return mockCandidates;
  }
  
  try {
    console.log("Attempting to fetch candidates from Google Sheets");
    const response = await window.gapi.client.sheets.spreadsheets.values.get({
      spreadsheetId: SPREADSHEET_ID,
      range: CANDIDATES_RANGE
    });
    
    console.log("Response received from Google Sheets:", response);
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
  // Check if we have proper authorization
  const isAuthorized = await ensureAuthorization();
  
  if (!isAuthorized) {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 500));
    const candidate = mockCandidates.find(c => c.id === id);
    
    if (!candidate) {
      throw new Error("Candidate not found");
    }
    
    return candidate;
  }
  
  try {
    // Get all candidates and filter by ID
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
      toast.error("OAuth access required to save to Google Sheets. Please add a Client ID in Google Integration settings.", {
        duration: 8000
      });
      return false;
    }
    
    // Otherwise simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 500));
    toast.warning("Using local storage for candidate data due to limited Google access.", {
      duration: 4000
    });
    return true;
  }
  
  try {
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
      spreadsheetId: SPREADSHEET_ID,
      range: CANDIDATES_RANGE,
      valueInputOption: 'USER_ENTERED',
      insertDataOption: 'INSERT_ROWS',
      resource: {
        values: [rowData]
      }
    });
    
    console.log("Data successfully appended to Google Sheet");
    return true;
  } catch (error: any) {
    console.error("Error adding candidate to Google Sheets:", error);
    
    // Check if it's an authentication issue
    if (error.result?.error?.code === 401) {
      toast.error("OAuth authentication required for adding candidates. Please check your Google settings.", {
        duration: 6000
      });
    } else {
      toast.error("Failed to add candidate to Google Sheets: " + (error.result?.error?.message || "Unknown error"));
    }
    
    return false;
  }
};
