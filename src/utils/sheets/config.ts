
// Configuration for Google Sheets integration

/**
 * Google Sheet configuration
 */
export const SPREADSHEET_ID = import.meta.env.VITE_GOOGLE_SPREADSHEET_ID || "YOUR_SPREADSHEET_ID";
export const CANDIDATES_RANGE = "Candidates!A2:Z"; // Adjust based on your sheet structure
