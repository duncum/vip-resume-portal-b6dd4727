
// Helper functions for managing Google authentication for Sheets API
import { signInToGoogle } from '../google';
import { toast } from 'sonner';

/**
 * Ensure API is initialized for accessing Google Sheets
 * Modified to be more tolerant in API key only mode
 */
export const ensureAuthorization = async (): Promise<boolean> => {
  try {
    console.log("Checking authorization status...");
    
    // Check if we have an API key
    const apiKey = localStorage.getItem('google_api_key');
    if (!apiKey || apiKey === '') {
      console.log("No API key found in localStorage");
      toast.error('Google API key missing. Please add an API Key in settings.', {
        duration: 5000
      });
      return false;
    }
    
    console.log("API key found, proceeding with Google sign-in");

    // Check if API key only mode is forced
    const forceApiKeyOnly = localStorage.getItem('force_api_key_only') === 'true';
    if (forceApiKeyOnly) {
      console.log("API key only mode is forced, skipping OAuth checks");
    }

    // Use signInToGoogle which will handle initialization
    const isAuthorized = await signInToGoogle();
    console.log("Google sign-in result:", isAuthorized);

    // In API key only mode, we may not get full authorization but that's OK
    // as long as we have initialized the API
    const clientId = localStorage.getItem('google_client_id');
    const isApiKeyOnlyMode = forceApiKeyOnly || !clientId || clientId === '';
    console.log("Client ID exists:", !!clientId);
    console.log("API key only mode:", isApiKeyOnlyMode);
    
    if (isAuthorized || isApiKeyOnlyMode) {
      // Always make sure Sheets API is loaded
      try {
        console.log("Checking if Sheets API is loaded:", !!window.gapi?.client?.sheets);
        
        if (!window.gapi?.client?.sheets) {
          console.log('Sheets API not loaded yet, attempting to load it');
          
          await new Promise<void>((resolve, reject) => {
            window.gapi.client.load('sheets', 'v4')
              .then(() => {
                console.log("Sheets API loaded successfully");
                resolve();
              })
              .catch(err => {
                console.error("Failed to load Sheets API:", err);
                reject(err);
              });
          });
          
          console.log("After loading attempt, Sheets API available:", !!window.gapi?.client?.sheets);
        }
        
        // If in API key only mode, we can consider it successful if the API is at least initialized
        if (isApiKeyOnlyMode) {
          if (window.gapi?.client) {
            console.log('Running in API key only mode with initialized client');
            return true;
          }
        }
        
        // If we get here with authorization, we should be good to go
        if (isAuthorized) {
          console.log('Authorized with Google and Sheets API is available');
          return true;
        }
      } catch (error) {
        console.error("Error loading Sheets API:", error);
        
        // In API key only mode, we'll still try to continue
        if (isApiKeyOnlyMode) {
          console.log('API key only mode - continuing despite Sheets API load error');
          return true;
        }
      }
    }
    
    // Special case for API key only mode - bypass OAuth errors if API initialization worked
    if (isApiKeyOnlyMode && window.gapi?.client) {
      console.log('API key only mode with initialized client - continuing');
      return true;
    }
    
    console.log("Authorization failed - not authorized");
    return false;
  } catch (error) {
    console.error('Sheets authorization error:', error);
    // In API key only mode, return true anyway to allow reading
    if (localStorage.getItem('force_api_key_only') === 'true') {
      console.log('API key only mode - continuing despite errors');
      return true;
    }
    return false;
  }
};
