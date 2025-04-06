
// Handles Google API authentication without requiring user sign-in
// Modified for Memberspace integration

import { toast } from "sonner";
import { loadGoogleApi, isApiLoaded } from './loader';
import { CLIENT_ID, API_KEY, DISCOVERY_DOCS, SCOPES } from './config';

// Global variables to track initialization state
let isGapiInitialized = false;

/**
 * Initialize the Google API client with API key only
 * No user sign-in required as authentication is handled by Memberspace
 */
export const initGoogleApi = async (): Promise<boolean> => {
  if (isGapiInitialized) {
    console.log("Google API already initialized");
    return true;
  }

  try {
    // Check for API credentials
    if (!API_KEY || !CLIENT_ID) {
      console.error('Google API credentials missing. Client ID and API Key must both be provided.');
      toast.error('Google API credentials missing. Please enter your Client ID and API Key.');
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
          console.log("Initializing client with API_KEY and CLIENT_ID...");
          
          await window.gapi.client.init({
            apiKey: API_KEY,
            clientId: CLIENT_ID,
            discoveryDocs: DISCOVERY_DOCS,
            scope: SCOPES
          });
          
          // Simple check to see if API is initialized
          if (!window.gapi.client) {
            console.error("Client not initialized properly");
            toast.error("Failed to initialize Google API. Please try again later.");
            resolve(false);
            return;
          }
          
          isGapiInitialized = true;
          console.log("Google API initialized successfully (service account mode)");
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
 * Check if the API is initialized (we don't check user authorization)
 */
export const isUserAuthorized = async (): Promise<boolean> => {
  if (!isGapiInitialized) {
    const initialized = await initGoogleApi();
    return initialized;
  }
  
  return isGapiInitialized;
};

// Simplified implementations for Memberspace integration
export const signInToGoogle = async (): Promise<boolean> => {
  return await initGoogleApi();
};

export const signOutFromGoogle = async (): Promise<void> => {
  isGapiInitialized = false;
  toast.success('Disconnected from Google API');
};
