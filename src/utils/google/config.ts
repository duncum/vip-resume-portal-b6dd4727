
// Google API configuration constants

// Get credentials from localStorage if available
export const CLIENT_ID = 
  typeof window !== 'undefined' && window.localStorage.getItem('google_client_id') || 
  "353615110421-8o1i2nfo0tp97btrvhmjghvu3hk24c2a.apps.googleusercontent.com" || 
  "";

export const API_KEY = 
  typeof window !== 'undefined' && window.localStorage.getItem('google_api_key') || 
  import.meta.env.VITE_GOOGLE_API_KEY || 
  "";

export const DISCOVERY_DOCS = [
  "https://www.googleapis.com/discovery/v1/apis/sheets/v4/rest",
  "https://www.googleapis.com/discovery/v1/apis/drive/v3/rest"  // Added Drive API for resume uploads
];
export const SCOPES = 'https://www.googleapis.com/auth/spreadsheets https://www.googleapis.com/auth/drive.file'; // Updated to include full sheets access

/**
 * Get the redirect URI for OAuth - should match what's configured in Google Cloud Console
 */
export const getRedirectUri = () => {
  // Always return the raw origin without any paths to match OAuth settings
  return window.location.origin;
};

/**
 * Print OAuth setup instructions to console for developers
 */
export const printOAuthSetupInstructions = () => {
  console.info(
    `Google Sheets Integration Setup Instructions:
    
    1. You need these three values to connect to Google Sheets:
       - Client ID: ${CLIENT_ID || "Your OAuth Client ID"} 
       - API Key: Your API Key
       - Spreadsheet ID: Your Spreadsheet ID
    
    2. Google Cloud Console OAuth Settings:
       - Application type: Web application
       - Authorized JavaScript origins: ${window.location.origin}
       - Authorized redirect URIs: ${getRedirectUri()}
       
    3. Make sure to add ${window.location.origin} to your allowed origins in Google Cloud Console
       
    4. Your Spreadsheet ID is found in your Google Sheet URL:
       https://docs.google.com/spreadsheets/d/[YOUR_SPREADSHEET_ID]/edit
    `
  );
};

// Print setup instructions in development mode
if (import.meta.env.DEV) {
  printOAuthSetupInstructions();
}
