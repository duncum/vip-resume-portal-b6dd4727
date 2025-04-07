
// Helper functions for managing Google authentication for Sheets API
import { signInToGoogle } from '../google';
import { toast } from 'sonner';

/**
 * Ensure API is initialized for accessing Google Sheets
 * Modified to always work in API key only mode
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
    
    console.log("API key found, proceeding with Google sign-in in API key only mode");

    // Use signInToGoogle which will handle initialization
    const isInitialized = await signInToGoogle();
    console.log("Google sign-in result:", isInitialized);

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
      
      // In API key only mode, we can continue if the API is initialized
      if (window.gapi?.client) {
        console.log('Running in API key only mode with initialized client');
        return true;
      }
      
      // If we get here with initialization success, we should be good to go
      if (isInitialized) {
        console.log('Initialized with Google and Sheets API is available');
        return true;
      }
    } catch (error) {
      console.error("Error loading Sheets API:", error);
      
      // In API key only mode, we'll still try to continue if client is initialized
      if (window.gapi?.client) {
        console.log('API key only mode - continuing despite Sheets API load error');
        return true;
      }
    }
    
    // Special case for API key only mode - if API initialization worked, continue
    if (window.gapi?.client) {
      console.log('API client initialized - continuing');
      return true;
    }
    
    console.log("Authorization failed - API not initialized");
    return false;
  } catch (error) {
    console.error('Sheets authorization error:', error);
    // Try to return true anyway if client is initialized
    if (window.gapi?.client) {
      console.log('API key only mode - continuing despite errors');
      return true;
    }
    return false;
  }
};
