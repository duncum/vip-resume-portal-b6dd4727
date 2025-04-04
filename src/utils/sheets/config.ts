
// Configuration for Google Sheets integration

/**
 * Google Sheet configuration
 * 
 * To find your spreadsheet ID:
 * 1. Open your Google Sheet
 * 2. Look at the URL: https://docs.google.com/spreadsheets/d/[YOUR_SPREADSHEET_ID]/edit
 * 3. Copy the [YOUR_SPREADSHEET_ID] portion
 */
export const SPREADSHEET_ID = import.meta.env.VITE_GOOGLE_SPREADSHEET_ID || ""; 
export const CANDIDATES_RANGE = "Candidates!A2:Z"; // Adjust based on your sheet structure

// Example sheet structure:
// | ID | Name | Email | Phone | Position | Skills | Experience | Location | Resume URL | Date Added |
// First row should contain headers, data starts from A2
