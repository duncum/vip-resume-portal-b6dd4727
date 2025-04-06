// Handles Google API authentication

import { toast } from "sonner";
import { loadGoogleApi, isApiLoaded } from './loader';
import { CLIENT_ID, API_KEY, DISCOVERY_DOCS, SCOPES } from './config';

// Global variables to track initialization state
let isGapiInitialized = false;

/**
 * Initialize the Google API client with API key only
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
          console.log("Initializing client with API_KEY...");
          
          await window.gapi.client.init({
            apiKey: API_KEY,
            discoveryDocs: DISCOVERY_DOCS,
          });
          
          // Simple check to see if API is initialized
          if (!window.gapi.client) {
            console.error("Client not initialized properly");
            toast.error("Failed to initialize Google API. Please try again later.");
            resolve(false);
            return;
          }
          
          isGapiInitialized = true;
          console.log("Google API initialized successfully");
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
 * Check if the user is currently authorized with Google
 * In our simplified approach, this just checks if the API is initialized
 */
export const isUserAuthorized = async (): Promise<boolean> => {
  if (!isGapiInitialized) {
    const initialized = await initGoogleApi();
    return initialized;
  }
  
  return isGapiInitialized;
};

// Keeping these functions with simplified implementations to maintain API compatibility
export const signInToGoogle = async (): Promise<boolean> => {
  return await initGoogleApi();
};

export const signOutFromGoogle = async (): Promise<void> => {
  isGapiInitialized = false;
  toast.success('Disconnected from Google API');
};
