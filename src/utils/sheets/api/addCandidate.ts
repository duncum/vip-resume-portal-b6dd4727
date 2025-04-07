import { toast } from "sonner";
import { ensureAuthorization } from '../auth-helper';
import { SPREADSHEET_ID, CANDIDATES_RANGE } from '../config';

/**
 * Add a new candidate to Google Sheets
 * Note: This will always use API key only mode which is read-only
 */
export const addCandidate = async (candidateData: any): Promise<boolean> => {
  // Check if we have proper authorization
  const isAuthorized = await ensureAuthorization();
  
  if (!isAuthorized) {
    console.log("Not authorized, mock candidate addition:", candidateData);
    toast.error(
      "Cannot add candidates in read-only mode. This application is configured for viewing only.", 
      { duration: 8000 }
    );
    return false;
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
    
    // Always show the API key only mode message
    toast.error(
      "This application is in read-only mode. Adding candidates is not supported.", 
      { duration: 8000 }
    );
    return false;
    
    // The code below will never execute, but keeping it commented for reference
    /*
    // Format the data for Google Sheets
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
      candidateData.relocationPreference || 'flexible',
      candidateData.notableEmployers || '',
      candidateData.resumeText || '' // Add resume text to sheet
    ];
    
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
    */
  } catch (error: any) {
    console.error("Error adding candidate to Google Sheets:", error);
    toast.error("This application is in read-only mode. Adding candidates is not supported.");
    return false;
  }
};
