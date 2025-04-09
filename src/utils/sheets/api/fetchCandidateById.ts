import { toast } from "sonner";
import { Candidate } from '../types';
import { ensureAuthorization } from '../auth-helper';
import { rowToCandidate } from '../data-mapper';
import { SPREADSHEET_ID, CANDIDATES_RANGE } from '../config';
import { mockCandidates } from '../mock-data';
import { getIsGapiInitialized } from '../../google/auth/initialize';

// Keep track of when we last showed error toasts to prevent spam
let lastErrorToastTime = 0;

/**
 * Fetch a single candidate by ID from Google Sheets API
 */
export const fetchCandidateById = async (id: string): Promise<Candidate | null> => {
  // Always make sure we have a clean ID
  // Extract just the ID part if it contains commas or other data
  let cleanId = id.split(',')[0].trim();
  
  // Add extra safety check for extremely long IDs
  if (cleanId.length > 50) {
    console.error("ID is suspiciously long, might contain full data:", cleanId.substring(0, 30) + "...");
    // Try to extract a proper ID format if possible
    const potentialIdMatch = cleanId.match(/^([a-zA-Z0-9_-]{1,20})/);
    if (potentialIdMatch && potentialIdMatch[1]) {
      const extractedId = potentialIdMatch[1];
      console.log("Extracted potential valid ID from long string:", extractedId);
      cleanId = extractedId;
    }
  }

  console.log("Fetching candidate with original ID param:", id);
  console.log("Using clean ID for search:", cleanId);
  
  // Log API state 
  console.log("API initialized according to state:", getIsGapiInitialized());
  console.log("Sheets API available:", !!window.gapi?.client?.sheets);
  
  // Check if we have proper authorization
  const isAuthorized = await ensureAuthorization();
  
  if (!isAuthorized) {
    console.log("Not authorized, using mock data for single candidate");
    
    // Limit error toasts to once per minute to avoid spam
    const now = Date.now();
    if (now - lastErrorToastTime > 60000) {
      toast.warning("Using demo data - check Google integration settings", {
        duration: 4000
      });
      lastErrorToastTime = now;
    }
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 500));
    const candidate = mockCandidates.find(c => {
      const candidateId = c.id.split(',')[0].trim();
      return candidateId === cleanId;
    });
    
    if (!candidate) {
      return null; // Return null instead of throwing an error
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
      const candidate = mockCandidates.find(c => {
        const candidateId = c.id.split(',')[0].trim();
        return candidateId === cleanId;
      });
      if (!candidate) return null;
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
      const candidate = mockCandidates.find(c => {
        const candidateId = c.id.split(',')[0].trim();
        return candidateId === cleanId;
      });
      if (!candidate) return null;
      return candidate;
    }
    
    // Find the row with the matching ID - always compare only the first segment before any comma
    const candidateRow = rows.find(row => {
      if (!row[0]) return false;
      const rowId = row[0].split(',')[0].trim();
      return rowId === cleanId;
    });
    
    if (!candidateRow) {
      console.log("Candidate not found in sheet, checking mock data");
      // Check mock data as fallback
      const mockCandidate = mockCandidates.find(c => {
        const candidateId = c.id.split(',')[0].trim();
        return candidateId === cleanId;
      });
      if (!mockCandidate) return null;
      return mockCandidate;
    }
    
    return rowToCandidate(candidateRow);
  } catch (error: any) {
    console.error("Error fetching candidate from Google Sheets:", error);
    
    // More detailed error logging
    console.log("API Error Details:", error.result?.error || error);
    console.log("Current spreadsheet ID:", localStorage.getItem('google_spreadsheet_id') || SPREADSHEET_ID);
    console.log("API Key exists:", !!localStorage.getItem('google_api_key'));
    
    // Limit error toasts to once per minute to avoid spam
    const now = Date.now();
    if (now - lastErrorToastTime > 60000) {
      // Better error messages for the user
      if (error.result?.error?.status === "PERMISSION_DENIED") {
        toast.error("Permission denied - make sure your sheet is shared publicly or with the service account", {
          duration: 6000
        });
      } else if (error.result?.error?.status === "NOT_FOUND") {
        toast.error("Spreadsheet not found - check your Spreadsheet ID", {
          duration: 5000
        });
      } else if (!window.gapi?.client?.sheets) {
        toast.error("Google Sheets API not available - check API key and connection", {
          duration: 5000
        });
      } else {
        toast.error("Failed to load candidate details", {
          duration: 5000
        });
      }
      lastErrorToastTime = now;
    }
    
    // Fall back to mock data on error
    const candidate = mockCandidates.find(c => {
      const candidateId = c.id.split(',')[0].trim();
      return candidateId === cleanId;
    });
    return candidate || null;
  }
};
