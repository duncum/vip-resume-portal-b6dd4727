
// Core authentication functionality for Google API

import { toast } from "sonner";
import { loadGoogleApi, isApiLoaded } from '../loader';
import { CLIENT_ID, API_KEY, DISCOVERY_DOCS, SCOPES } from '../config';
import { GoogleApiInitOptions } from './types';

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

    // Load the Google API if not already loaded
    const apiLoaded = await loadApiIfNeeded();
    if (!apiLoaded) return false;
    
    // Initialize with timeout protection
    return await initializeWithTimeout();
  } catch (error) {
    console.error('Error loading Google API:', error);
    toast.error(`Failed to load Google API: ${error instanceof Error ? error.message : 'Unknown error'}`);
    return false;
  }
};

/**
 * Load Google API if not already loaded
 */
const loadApiIfNeeded = async (): Promise<boolean> => {
  if (!isApiLoaded()) {
    console.log("Google API not loaded, loading now...");
    await loadGoogleApi();
  }
  
  if (!window.gapi) {
    console.error("Google API failed to load properly - window.gapi is undefined");
    toast.error("Failed to load Google API. Please check your internet connection and try again.");
    return false;
  }
  
  return true;
};

/**
 * Initialize the Google API client with timeout protection
 */
const initializeWithTimeout = async (): Promise<boolean> => {
  // Set a timeout to prevent hanging forever
  const timeoutPromise = new Promise<boolean>((_, reject) => {
    setTimeout(() => {
      reject(new Error('Google API initialization timed out after 10 seconds'));
    }, 10000);
  });
  
  try {
    return await Promise.race([
      initializeClient(),
      timeoutPromise
    ]);
  } catch (error) {
    console.error('Google API initialization timed out or failed:', error);
    toast.error('Google API is taking too long to respond. Please try again later.');
    return false;
  }
};

/**
 * Initialize the Google API client
 */
const initializeClient = async (): Promise<boolean> => {
  return new Promise<boolean>((resolve) => {
    window.gapi.load('client', async () => {
      try {
        console.log("Initializing client with API_KEY...");
        
        // Initialize with minimum required parameters
        const initConfig: GoogleApiInitOptions = {
          apiKey: API_KEY,
          discoveryDocs: DISCOVERY_DOCS
        };
        
        // Add clientId ONLY if available AND NOT empty
        if (CLIENT_ID && CLIENT_ID.trim() !== '') {
          console.log("Client ID provided, adding to initialization");
          initConfig.clientId = CLIENT_ID;
          initConfig.scope = SCOPES;
        } else {
          console.log("No Client ID provided, using API key only mode");
        }
        
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
            
            isGapiInitialized = true;
            console.log("Google API initialized successfully (API key mode)");
            resolve(true);
          } catch (error) {
            handleInitError(error);
            isGapiInitialized = false;
            resolve(false);
          }
        }, 0);
      } catch (error) {
        console.error('Error in Google API client initialization:', error);
        toast.error(`Failed to initialize Google API: ${error instanceof Error ? error.message : 'Unknown error'}`);
        isGapiInitialized = false;
        resolve(false);
      }
    });
  });
};

/**
 * Handle errors during initialization
 */
const handleInitError = (error: unknown): void => {
  console.error('Error initializing Google API client:', error);
  
  // Special handling for OAuth origin errors - suggest removing the client ID
  const errorStr = String(error);
  if (errorStr.includes('idpiframe_initialization_failed') || 
      errorStr.includes('Not a valid origin')) {
    console.log("OAuth origin error detected, suggesting to use API key only mode");
    toast.error("Your OAuth client ID is not configured for this domain. Try removing the Client ID and using only the API key.");
  } else {
    toast.error(`Failed to initialize Google API: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
};

/**
 * Check if the API is initialized
 */
export const isUserAuthorized = async (): Promise<boolean> => {
  return isGapiInitialized;
};

/**
 * Sign in to Google API
 */
export const signInToGoogle = async (): Promise<boolean> => {
  // Set a loading flag to indicate API is being initialized
  try {
    const result = await initGoogleApi();
    if (result) {
      isGapiInitialized = true;
      toast.success('Successfully connected to Google API');
    }
    return result;
  } catch (error) {
    console.error('Error signing in to Google:', error);
    isGapiInitialized = false;
    toast.error('Failed to connect to Google API');
    return false;
  }
};

/**
 * Sign out from Google API
 */
export const signOutFromGoogle = async (): Promise<void> => {
  isGapiInitialized = false;
  toast.success('Disconnected from Google API');
};

// Export the initialization state function for external modules
export const getIsGapiInitialized = (): boolean => isGapiInitialized;
