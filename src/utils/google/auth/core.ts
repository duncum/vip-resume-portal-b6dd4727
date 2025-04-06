
// Core authentication functionality for Google API
// This is now a thin wrapper that delegates to specialized modules

import { toast } from "sonner";
import { API_KEY } from '../config';
import { 
  loadApiIfNeeded, 
  initializeWithTimeout, 
  setGapiInitialized
} from './initialize';

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
      setGapiInitialized(false);
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

// Re-export from other modules for backward compatibility
export { 
  isUserAuthorized,
  signInToGoogle, 
  signOutFromGoogle
} from './authorize';

export { getIsGapiInitialized } from './initialize';
