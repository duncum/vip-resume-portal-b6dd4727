
// Google API configuration constants

// Google API configuration
// These values are read from the environment variables
export const CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID || ""; 
export const API_KEY = import.meta.env.VITE_GOOGLE_API_KEY || "";
export const DISCOVERY_DOCS = [
  "https://www.googleapis.com/discovery/v1/apis/sheets/v4/rest",
  "https://www.googleapis.com/discovery/v1/apis/drive/v3/rest"  // Added Drive API for resume uploads
];
export const SCOPES = 'https://www.googleapis.com/auth/spreadsheets.readonly https://www.googleapis.com/auth/drive.file'; // Added Drive scope

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
    `Google Sheets Integration Setup Instructions:
    
    1. You need these three values to connect to Google Sheets:
       - VITE_GOOGLE_CLIENT_ID: Your OAuth Client ID
       - VITE_GOOGLE_API_KEY: Your API Key
       - VITE_GOOGLE_SPREADSHEET_ID: Your Spreadsheet ID
    
    2. To get these values:
       a) Go to https://console.cloud.google.com/
       b) Create a new project (or select an existing one)
       c) Enable both the Google Sheets API and Google Drive API
       d) Create OAuth consent screen (External)
       e) Create OAuth credentials with these settings:
          - Application type: Web application
          - Name: CRE Resume Portal (or your app name)
          - Authorized JavaScript origins: ${window.location.origin}
          - Authorized redirect URIs: ${getRedirectUri()}
       f) Create an API key
       
    3. Your Spreadsheet ID is found in your Google Sheet URL:
       https://docs.google.com/spreadsheets/d/[YOUR_SPREADSHEET_ID]/edit
       
    4. For development, you can directly modify the values in:
       - src/utils/google/config.ts 
       - src/utils/sheets/config.ts
       
    5. For production, use environment variables with your hosting service.
    
    Once you have your credentials, the Google Integration Status panel will allow you to connect and access your spreadsheet.`
  );
};

// Print setup instructions in development mode
if (import.meta.env.DEV) {
  printOAuthSetupInstructions();
}
