
// Google API client initialization functionality

import { toast } from "sonner";
import { setGapiInitialized } from './state';
import { getApiConfig, createApiConfig } from './api-config';
import { initializeApiClient } from './api-initialization';
import { loadSheetsApi, loadGmailApi, loadSheetsApiAfterOAuthError } from './api-loading';

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
        
        // Always use API key only mode - this is what's available in 
        // the standard version of the app
        console.log("Using API key only mode");
        
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
        // Note: In API key only mode, this will always return false
        await loadGmailApi();
        
        if (!sheetsLoaded) {
          console.warn("Failed to load Sheets API after multiple attempts");
          // We'll still mark as initialized and try to continue
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
