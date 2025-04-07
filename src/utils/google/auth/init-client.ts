
// Google API client initialization functionality

import { toast } from "sonner";
import { handleInitError } from './errors';
import { setGapiInitialized } from './state';
import { GoogleApiInitOptions } from './types';

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
        
        // Get API key from localStorage or fallback
        const savedApiKey = localStorage.getItem('google_api_key');
        const apiKeyToUse = savedApiKey || localStorage.getItem('google_api_key_fallback');
        
        if (!apiKeyToUse) {
          console.error("No API key available for initialization");
          toast.error("API key missing. Please add your API key in settings.");
          resolve(false);
          return;
        }
        
        console.log("Using API key:", apiKeyToUse ? "Present (hidden)" : "Missing");
        
        // Initialize with minimum required parameters - API key only
        const initConfig: GoogleApiInitOptions = {
          apiKey: apiKeyToUse,
          discoveryDocs: [
            'https://sheets.googleapis.com/$discovery/rest?version=v4',
            'https://www.googleapis.com/discovery/v1/apis/drive/v3/rest',
            'https://www.googleapis.com/discovery/v1/apis/gmail/v1/rest'
          ]
        };
        
        // Always use API key only mode
        console.log("Using API key only mode permanently");
        
        // Use setTimeout to prevent long synchronous operations
        setTimeout(async () => {
          try {
            // Need to assert type to handle the optional properties
            await window.gapi.client.init(initConfig as any);
            
            // Simple check to see if API is initialized
            if (!window.gapi.client) {
              console.error("Client not initialized properly");
              toast.error("Failed to initialize Google API. Please try again later.");
              resolve(false);
              return;
            }
            
            // Explicitly load the Sheets API with retries
            let sheetsLoaded = await tryLoadSheetsApi();
            
            // Try to load Gmail API if available
            try {
              console.log("Loading Gmail API...");
              await window.gapi.client.load('gmail', 'v1');
              console.log("Gmail API loaded successfully");
            } catch (gmailError) {
              console.warn("Gmail API not loaded, email sending may use fallback:", gmailError);
            }
            
            if (!sheetsLoaded) {
              console.warn("Failed to load Sheets API after multiple attempts");
              // We'll still mark as initialized and try to continue
            }
            
            setGapiInitialized(true);
            console.log("Google API initialized successfully (API key mode)");
            resolve(true);
          } catch (error) {
            // In API key only mode, ignore OAuth-related errors
            const errorMsg = String(error);
            if (errorMsg.includes('idpiframe_initialization_failed') || 
                errorMsg.includes('origin') || 
                errorMsg.includes('OAuth')) {
              console.log("OAuth-related error in API key only mode - continuing anyway");
              
              // Try to explicitly load the Sheets API
              try {
                console.log("Loading Sheets API after OAuth error...");
                await window.gapi.client.load('sheets', 'v4');
                console.log("Sheets API loaded successfully after OAuth error");
              } catch (sheetsError) {
                console.error("Failed to load Sheets API after OAuth error:", sheetsError);
              }
              
              setGapiInitialized(true);
              resolve(true);
              return;
            }
            
            handleInitError(error);
            setGapiInitialized(false);
            resolve(false);
          }
        }, 0);
      } catch (error) {
        console.error('Error in Google API client initialization:', error);
        toast.error(`Failed to initialize Google API: ${error instanceof Error ? error.message : 'Unknown error'}`);
        setGapiInitialized(false);
        resolve(false);
      }
    });
  });
};

/**
 * Attempt to load the Sheets API with multiple retries
 */
async function tryLoadSheetsApi(): Promise<boolean> {
  let sheetsLoaded = false;
  let retryCount = 0;
  const maxRetries = 3;
  
  while (!sheetsLoaded && retryCount < maxRetries) {
    try {
      console.log(`Loading Sheets API (attempt ${retryCount + 1})...`);
      await window.gapi.client.load('sheets', 'v4');
      console.log("Sheets API loaded successfully");
      sheetsLoaded = true;
    } catch (sheetsError) {
      console.error(`Failed to load Sheets API (attempt ${retryCount + 1}):`, sheetsError);
      retryCount++;
      // Wait a bit before retrying
      if (retryCount < maxRetries) {
        await new Promise(r => setTimeout(r, 300 * retryCount));
      }
    }
  }
  
  return sheetsLoaded;
}
