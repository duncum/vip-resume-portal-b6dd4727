
import { trackDownload } from "@/utils/ipTracker";
import { findRowByValue, updateCells, SPREADSHEET_ID } from "@/utils/sheets";

/**
 * Record resume share activity in the Candidates sheet
 * 
 * @param candidateId The ID of the candidate
 * @param recipientEmail Email of the recipient 
 */
export const recordResumeShareToCandidatesSheet = async (
  candidateId: string, 
  recipientEmail: string
): Promise<boolean> => {
  try {
    // Check if Google API is available
    if (!window.gapi || !window.gapi.client || !window.gapi.client.sheets) {
      console.warn("Google Sheets API not available, skipping share tracking");
      return false;
    }
    
    // Get spreadsheet ID from local storage or config
    const spreadsheetId = 
      localStorage.getItem('google_spreadsheet_id') || 
      SPREADSHEET_ID;
    
    if (!spreadsheetId) {
      console.warn("No spreadsheet ID available, skipping share tracking");
      return false;
    }
    
    // Find the candidate row by ID
    const rowIndex = await findRowByValue(
      spreadsheetId,
      "Candidates",
      "A:A", // Search in first column where IDs are stored
      candidateId
    );
    
    if (rowIndex === -1) {
      console.warn(`Candidate with ID ${candidateId} not found in sheet`);
      return false;
    }
    
    // Determine which columns to update (assuming we add these columns to the sheet)
    // We'll update the "LastEmailedTo" and "LastEmailedDate" columns
    // Assuming these might be columns P and Q (adjust based on your sheet structure)
    const timestamp = new Date().toISOString();
    
    // Update the candidate row with email tracking information
    const success = await updateCells(
      spreadsheetId,
      `Candidates!P${rowIndex}:Q${rowIndex}`,
      [[recipientEmail, timestamp]]
    );
    
    if (success) {
      console.log(`Resume share recorded for candidate ${candidateId}`);
    }
    
    return success;
  } catch (error) {
    console.error("Error recording resume share in Google Sheets:", error);
    // Don't throw here - this is a non-critical operation
    return false;
  }
};

/**
 * Track resume share action
 * Records both local tracking and Google Sheets tracking
 */
export const trackResumeShare = async (
  candidateId: string,
  recipientEmail: string
): Promise<void> => {
  // Track the download/email action in our local tracking system
  trackDownload(candidateId);
  
  // Also record this action in Google Sheets
  await recordResumeShareToCandidatesSheet(candidateId, recipientEmail);
};
