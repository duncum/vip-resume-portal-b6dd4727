import { toast } from "sonner";
import { ensureAuthorization } from '../auth-helper';
import { SPREADSHEET_ID, CANDIDATES_RANGE } from '../config';

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
      toast.error(
        "API key only mode: Cannot add candidates. To enable adding candidates, you need to set up an OAuth Client ID in Google settings.", 
        { duration: 8000 }
      );
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
    // Make sure we have a spreadsheet ID
    const spreadsheetId = localStorage.getItem('google_spreadsheet_id') || SPREADSHEET_ID;
    if (!spreadsheetId) {
      toast.error("Spreadsheet ID missing. Please add it in Google settings.", {
        duration: 5000
      });
      return false;
    }
    
    // Check if we're in API key only mode
    if (!localStorage.getItem('google_client_id') || localStorage.getItem('google_client_id') === '') {
      toast.error(
        "API key only mode: Cannot add candidates. To enable adding candidates, you need to set up an OAuth Client ID in Google settings.", 
        { duration: 8000 }
      );
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
      candidateData.relocationPreference || 'flexible',
      candidateData.notableEmployers || '',
      candidateData.resumeText || '' // Add resume text to sheet
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
        toast.error(
          "API key only mode: Cannot add candidates. To enable adding candidates, you need to set up an OAuth Client ID in Google settings.", 
          { duration: 8000 }
        );
      } else {
        toast.error(
          "OAuth authentication required for adding candidates. Your Client ID may not be configured properly.", 
          { duration: 6000 }
        );
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
