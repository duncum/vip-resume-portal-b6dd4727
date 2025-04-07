
import { updateCells, findRowByValue } from "@/utils/sheets/operations";

/**
 * Track the email in Google Sheets
 */
export const trackEmailInSheets = async (candidateId: string, recipientEmail: string): Promise<boolean> => {
  try {
    // Check if Google API is available
    if (!window.gapi || !window.gapi.client || !window.gapi.client.sheets) {
      console.warn("Google Sheets API not available, skipping email tracking");
      return false;
    }
    
    // Get spreadsheet ID from local storage or default
    const spreadsheetId = localStorage.getItem('google_spreadsheet_id') || "1RICk5q_nQr8JHKvlYi-1tdlVwzM57UGbRdDNOdMwOFk";
    
    if (!spreadsheetId) {
      console.warn("No spreadsheet ID available, skipping email tracking");
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
    
    // Update the candidate row with email tracking information
    const timestamp = new Date().toISOString();
    
    const success = await updateCells(
      spreadsheetId,
      `Candidates!P${rowIndex}:Q${rowIndex}`,
      [[recipientEmail, timestamp]]
    );
    
    if (success) {
      console.log(`Resume share tracked for candidate ${candidateId}`);
    }
    
    return success;
  } catch (error) {
    console.error("Error tracking email in Google Sheets:", error);
    return false;
  }
};
