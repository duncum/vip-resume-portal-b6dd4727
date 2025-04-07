
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
  return window.location.origin;
};

/**
 * Print OAuth setup instructions to console for developers
 */
export const printOAuthSetupInstructions = () => {
  console.info(
    `Google Sheets Integration Setup Instructions:
    
    1. You need these three values to connect to Google Sheets:
       - Client ID: Your OAuth Client ID
       - API Key: Your API Key
       - Spreadsheet ID: Your Spreadsheet ID
    
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
       
    4. You can enter these credentials in the API Credentials form in the app.
    
    Once you have your credentials, the Google Integration Status panel will allow you to connect and access your spreadsheet.`
  );
};

// Print setup instructions in development mode
if (import.meta.env.DEV) {
  printOAuthSetupInstructions();
}
