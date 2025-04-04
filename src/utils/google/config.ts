
// Google API configuration constants

// Google API configuration
// In production, these values should come from environment variables
export const CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID || "YOUR_GOOGLE_CLIENT_ID"; // Replace with your actual client ID
export const API_KEY = import.meta.env.VITE_GOOGLE_API_KEY || "YOUR_GOOGLE_API_KEY"; // Replace with your actual API key
export const DISCOVERY_DOCS = [
  "https://www.googleapis.com/discovery/v1/apis/sheets/v4/rest"
];
export const SCOPES = 'https://www.googleapis.com/auth/spreadsheets.readonly'; // Read-only scope for Sheets

/**
 * Get the redirect URI for OAuth - should match what's configured in Google Cloud Console
 */
export const getRedirectUri = () => {
  return window.location.origin;
};

/**
 * Print OAuth setup instructions to console for developers
 */
export const printOAuthSetupInstructions = () => {
  console.info(
    `Google Sheets Read-Only Setup Instructions:
    
    1. In your Google Cloud Console project:
       a. Enable the Google Sheets API
       b. Configure OAuth consent screen
       c. Create OAuth credentials with these settings:
          - Authorized JavaScript origins: ${window.location.origin}
          - Authorized redirect URIs: ${getRedirectUri()}
       d. Create an API key
       
    2. In your Google Sheet:
       a. Share your sheet with read access to the email address associated with your project
       b. Note your spreadsheet ID (from the URL)
       
    3. Set these environment variables:
       - VITE_GOOGLE_CLIENT_ID: Your OAuth Client ID
       - VITE_GOOGLE_API_KEY: Your API Key
       - VITE_GOOGLE_SPREADSHEET_ID: Your Spreadsheet ID
    
    Note: This implementation only requires read-only access to your Google Sheet.`
  );
};

// Print setup instructions in development mode
if (import.meta.env.DEV) {
  printOAuthSetupInstructions();
}
