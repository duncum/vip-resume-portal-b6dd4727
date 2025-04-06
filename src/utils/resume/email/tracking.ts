
import { trackDownload } from "@/utils/ipTracker";

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
      import('@/utils/sheets').then(module => module.SPREADSHEET_ID);
    
    if (!spreadsheetId) {
      console.warn("No spreadsheet ID available, skipping share tracking");
      return false;
    }
    
    // First, get the candidate row by searching for the ID in the Candidates sheet
    const response = await window.gapi.client.sheets.spreadsheets.values.get({
      spreadsheetId,
      range: "Candidates!A:A", // Search in first column where IDs are stored
    });
    
    const values = response.result.values || [];
    let rowIndex = -1;
    
    // Find the row with the matching candidate ID
    for (let i = 0; i < values.length; i++) {
      if (values[i][0] === candidateId) {
        rowIndex = i + 1; // Sheets rows are 1-indexed
        break;
      }
    }
    
    if (rowIndex === -1) {
      console.warn(`Candidate with ID ${candidateId} not found in sheet`);
      return false;
    }
    
    // Determine which columns to update (assuming we add these columns to the sheet)
    // We'll update the "LastEmailedTo" and "LastEmailedDate" columns
    // Assuming these might be columns P and Q (adjust based on your sheet structure)
    const timestamp = new Date().toISOString();
    
    // Update the candidate row with email tracking information
    // Using the append method which is available in the API
    await window.gapi.client.sheets.spreadsheets.values.append({
      spreadsheetId,
      range: `Candidates!P${rowIndex}:Q${rowIndex}`,
      valueInputOption: "USER_ENTERED",
      insertDataOption: "OVERWRITE",
      resource: {
        values: [[recipientEmail, timestamp]]
      }
    });
    
    console.log(`Resume share recorded for candidate ${candidateId}`);
    return true;
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
