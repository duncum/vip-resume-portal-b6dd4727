
import { toast } from "sonner";
import { Candidate } from '../types';
import { ensureAuthorization } from '../auth-helper';
import { rowToCandidate } from '../data-mapper';
import { SPREADSHEET_ID, CANDIDATES_RANGE } from '../config';
import { mockCandidates } from '../mock-data';

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
