
// Handles Google API authentication without requiring user sign-in
// Modified for Memberspace integration

import { toast } from "sonner";
import { loadGoogleApi, isApiLoaded } from './loader';
import { CLIENT_ID, API_KEY, DISCOVERY_DOCS, SCOPES } from './config';

// Global variables to track initialization state
let isGapiInitialized = false;

/**
 * Initialize the Google API client with API key
 * No user sign-in required as authentication is handled by Memberspace
 */
export const initGoogleApi = async (): Promise<boolean> => {
  try {
    console.log("Initializing Google API...");
    
    // Check for API key (required)
    if (!API_KEY) {
      console.error('Google API key missing. API Key must be provided.');
      toast.error('Google API key missing. Please enter your API Key.');
      isGapiInitialized = false;
      return false;
    }

    if (!isApiLoaded()) {
      console.log("Google API not loaded, loading now...");
      await loadGoogleApi();
    }
    
    if (!window.gapi) {
      console.error("Google API failed to load properly - window.gapi is undefined");
      toast.error("Failed to load Google API. Please check your internet connection and try again.");
      return false;
    }
    
    return new Promise((resolve) => {
      window.gapi.load('client', async () => {
        try {
          console.log("Initializing client with API_KEY...");
          
          // Initialize with minimum required parameters
          const initConfig: any = {
            apiKey: API_KEY,
            discoveryDocs: DISCOVERY_DOCS
          };
          
          // Add clientId if available but not required
          if (CLIENT_ID) {
            initConfig.clientId = CLIENT_ID;
            initConfig.scope = SCOPES;
            console.log("Client ID provided, adding to initialization");
          }
          
          await window.gapi.client.init(initConfig);
          
          // Simple check to see if API is initialized
          if (!window.gapi.client) {
            console.error("Client not initialized properly");
            toast.error("Failed to initialize Google API. Please try again later.");
            resolve(false);
            return;
          }
          
          isGapiInitialized = true;
          console.log("Google API initialized successfully (API key mode)");
          resolve(true);
        } catch (error) {
          console.error('Error initializing Google API client:', error);
          toast.error(`Failed to initialize Google API: ${error instanceof Error ? error.message : 'Unknown error'}`);
          isGapiInitialized = false;
          resolve(false);
        }
      });
    });
  } catch (error) {
    console.error('Error loading Google API:', error);
    toast.error(`Failed to load Google API: ${error instanceof Error ? error.message : 'Unknown error'}`);
    return false;
  }
};

/**
 * Check if the API is initialized
 */
export const isUserAuthorized = async (): Promise<boolean> => {
  return isGapiInitialized;
};

// Simplified implementations for Memberspace integration
export const signInToGoogle = async (): Promise<boolean> => {
  const result = await initGoogleApi();
  if (result) {
    isGapiInitialized = true;
    toast.success('Successfully connected to Google API');
  }
  return result;
};

export const signOutFromGoogle = async (): Promise<void> => {
  isGapiInitialized = false;
  toast.success('Disconnected from Google API');
};
