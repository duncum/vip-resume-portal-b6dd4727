
// Google API initialization functionality

import { toast } from "sonner";
import { loadGoogleApi, isApiLoaded } from '../loader';
import { API_KEY, DISCOVERY_DOCS, CLIENT_ID, SCOPES } from '../config';
import { GoogleApiInitOptions } from './types';

// Global initialization state
let isGapiInitialized = false;

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
        console.log("Initializing client with API_KEY...");
        
        // Initialize with minimum required parameters
        const initConfig: GoogleApiInitOptions = {
          apiKey: API_KEY,
          discoveryDocs: DISCOVERY_DOCS
        };
        
        // Add clientId ONLY if available AND NOT empty AND API key only mode is not forced
        const apiKeyOnlyMode = localStorage.getItem('force_api_key_only') === 'true';
        
        if (CLIENT_ID && CLIENT_ID.trim() !== '' && !apiKeyOnlyMode) {
          console.log("Client ID provided, adding to initialization");
          initConfig.clientId = CLIENT_ID;
          initConfig.scope = SCOPES;
        } else {
          console.log("No Client ID provided or API key only mode forced, using API key only mode");
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
            // If error is related to OAuth but we're using API key only mode, 
            // we can still consider this a success for read operations
            const errorMsg = String(error);
            if ((errorMsg.includes('idpiframe_initialization_failed') || 
                 errorMsg.includes('origin') || 
                 errorMsg.includes('OAuth')) && 
                (!CLIENT_ID || CLIENT_ID.trim() === '' || apiKeyOnlyMode)) {
              console.log("OAuth-related error in API key only mode - continuing anyway");
              // Force API key only mode
              localStorage.setItem('force_api_key_only', 'true');
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
  
  // Special handling for OAuth origin errors - suggest removing the client ID
  const errorStr = String(error);
  if (errorStr.includes('idpiframe_initialization_failed') || 
      errorStr.includes('Not a valid origin') ||
      errorStr.includes('OAuth')) {
    console.log("OAuth origin error detected, forcing API key only mode");
    localStorage.setItem('force_api_key_only', 'true');
    toast.error("Your OAuth client ID is not configured for this domain. Switched to API key only mode.");
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
  localStorage.setItem('force_api_key_only', enabled ? 'true' : 'false');
  console.log(`API key only mode ${enabled ? 'enabled' : 'disabled'}`);
};

/**
 * Check if we're in API key only mode
 */
export const isApiKeyOnlyMode = (): boolean => {
  return localStorage.getItem('force_api_key_only') === 'true';
};
