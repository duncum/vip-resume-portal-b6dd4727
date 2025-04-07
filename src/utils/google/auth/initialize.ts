
// Google API initialization functionality

import { toast } from "sonner";
import { loadGoogleApi, isApiLoaded } from '../loader';
import { API_KEY, DISCOVERY_DOCS, CLIENT_ID, SCOPES } from '../config';
import { GoogleApiInitOptions } from './types';

// Global initialization state
let isGapiInitialized = false;

// Force API key only mode permanently
localStorage.setItem('force_api_key_only', 'true');

/**
 * Load Google API if not already loaded
 */
export const loadApiIfNeeded = async (): Promise<boolean> => {
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
export const initializeWithTimeout = async (): Promise<boolean> => {
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
export const initializeClient = async (): Promise<boolean> => {
  return new Promise<boolean>((resolve) => {
    window.gapi.load('client', async () => {
      try {
        console.log("Initializing client with API_KEY only...");
        
        // Initialize with minimum required parameters - API key only
        const initConfig: GoogleApiInitOptions = {
          apiKey: API_KEY,
          discoveryDocs: DISCOVERY_DOCS
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
            
            // Explicitly load the Sheets API
            try {
              console.log("Loading Sheets API...");
              await window.gapi.client.load('sheets', 'v4');
              console.log("Sheets API loaded successfully during initialization");
            } catch (sheetsError) {
              console.error("Failed to load Sheets API during initialization:", sheetsError);
              // Continue anyway since we'll try again later if needed
            }
            
            isGapiInitialized = true;
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
                // Continue anyway since we'll try again later if needed
              }
              
              isGapiInitialized = true;
              resolve(true);
              return;
            }
            
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
export const handleInitError = (error: unknown): void => {
  console.error('Error initializing Google API client:', error);
  
  // Special handling for OAuth origin errors
  const errorStr = String(error);
  if (errorStr.includes('idpiframe_initialization_failed') || 
      errorStr.includes('Not a valid origin') ||
      errorStr.includes('OAuth')) {
    console.log("OAuth origin error detected, in permanent API key only mode");
    toast.error("API connection issue. Please make sure your API key is correct.", {
      duration: 6000
    });
  } else {
    toast.error(`Failed to initialize Google API: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
};

/**
 * Check if the API is initialized
 */
export const getIsGapiInitialized = (): boolean => isGapiInitialized;

/**
 * Set the initialization state (for testing or resetting)
 */
export const setGapiInitialized = (value: boolean): void => {
  isGapiInitialized = value;
};

/**
 * Enable or disable API key only mode
 */
export const setApiKeyOnlyMode = (enabled: boolean): void => {
  // Always enforce API key only mode regardless of the parameter
  localStorage.setItem('force_api_key_only', 'true');
  console.log("API key only mode enabled (permanent)");
};

/**
 * Check if we're in API key only mode
 */
export const isApiKeyOnlyMode = (): boolean => {
  return true; // Always return true
};
