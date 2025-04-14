
// Google API client initialization functionality

import { toast } from "sonner";
import { setGapiInitialized } from './state';
import { getApiConfig, createApiConfig } from './api-config';
import { initializeApiClient } from './api-initialization';
import { loadSheetsApi, loadGmailApi } from './api-loading';

/**
 * Initialize the Google API client
 */
export const initializeClient = async (): Promise<boolean> => {
  // Early return if already initialized with Sheets API available
  if (window.gapi?.client?.sheets) {
    console.log("Google API already initialized with Sheets API");
    return true;
  }
  
  return new Promise<boolean>((resolve) => {
    window.gapi.load('client', async () => {
      try {
        console.log("Initializing client with API_KEY only...");
        
        // Get API configuration
        const { apiKey, hasValidConfig } = getApiConfig();
        if (!hasValidConfig || !apiKey) {
          resolve(false);
          return;
        }
        
        // Create API configuration
        const initConfig = createApiConfig(apiKey);
        
        // Initialize the API client
        const initSuccess = await initializeApiClient(initConfig);
        if (!initSuccess) {
          resolve(false);
          return;
        }
        
        // Explicitly load the Sheets API with retries - this is the core API we need
        let sheetsLoaded = await loadSheetsApi();
        
        // Try to load Gmail API if available, but don't consider it a failure if it doesn't load
        await loadGmailApi();
        
        if (!sheetsLoaded) {
          console.warn("Failed to load Sheets API after multiple attempts");
          
          // Try one more approach - specific to the permissions issue
          try {
            console.log("Trying alternate API loading approach");
            
            // Direct method to get spreadsheets API
            await window.gapi.client.load('https://sheets.googleapis.com/$discovery/rest?version=v4');
            console.log("Sheets API loaded via alternate method");
            sheetsLoaded = true;
          } catch (loadErr) {
            console.error("Alternate loading approach failed:", loadErr);
          }
          
          // If still not loaded, we'll mark as initialized anyway and let individual operations handle errors
          if (!sheetsLoaded) {
            console.warn("Failed to load Sheets API after all attempts");
          }
        }
        
        // Create a test spreadsheet object to check if API access works
        // This helps us detect permission issues early
        if (sheetsLoaded && window.gapi.client.sheets?.spreadsheets) {
          try {
            const testSpreadsheetId = localStorage.getItem('google_spreadsheet_id');
            if (testSpreadsheetId) {
              console.log("Testing API access with spreadsheet:", testSpreadsheetId);
              await window.gapi.client.sheets.spreadsheets.values.get({
                spreadsheetId: testSpreadsheetId,
                range: 'A1:A2'
              });
              console.log("API access test successful");
            }
          } catch (testError: any) {
            console.warn("API access test failed:", testError?.result?.error || testError);
            // We'll continue anyway, individual operations will handle errors
          }
        }
        
        setGapiInitialized(true);
        resolve(true);
      } catch (error) {
        console.error('Error in Google API client initialization:', error);
        toast.error(`Failed to initialize Google API: ${error instanceof Error ? error.message : 'Unknown error'}`);
        setGapiInitialized(false);
        resolve(false);
      }
    });
  });
};
