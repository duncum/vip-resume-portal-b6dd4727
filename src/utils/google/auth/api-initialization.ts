
// API initialization functionality

import { GoogleApiInitOptions } from './types';
import { handleInitError } from './errors';
import { setGapiInitialized } from './state';
import { toast } from "sonner";

/**
 * Initialize the Google API client with the provided configuration
 */
export const initializeApiClient = async (initConfig: GoogleApiInitOptions): Promise<boolean> => {
  try {
    console.log("Initializing Google API client...");
    
    // Use setTimeout to prevent long synchronous operations
    return await new Promise<boolean>((resolve) => {
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
            setGapiInitialized(true);
            resolve(true);
            return;
          }
          
          handleInitError(error);
          setGapiInitialized(false);
          resolve(false);
        }
      }, 0);
    });
  } catch (error) {
    console.error('Error in API client initialization:', error);
    toast.error(`Failed to initialize Google API: ${error instanceof Error ? error.message : 'Unknown error'}`);
    setGapiInitialized(false);
    return false;
  }
};
