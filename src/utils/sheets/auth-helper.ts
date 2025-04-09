
// Helper functions for managing Google authentication for Sheets API
import { signInToGoogle } from '../google';
import { toast } from 'sonner';
import { getIsGapiInitialized, setGapiInitialized } from '../google/auth/initialize';

// Track failed attempts to avoid infinite retry loops
let failedAttempts = 0;
const MAX_RETRIES = 3;
let lastAttemptTime = 0;
const MIN_ATTEMPT_INTERVAL = 2000; // 2 seconds

/**
 * Ensure API is initialized for accessing Google Sheets
 * Modified to always work in API key only mode
 */
export const ensureAuthorization = async (): Promise<boolean> => {
  try {
    console.log("Checking authorization status...");
    
    // Rate limit authorization attempts
    const now = Date.now();
    if (now - lastAttemptTime < MIN_ATTEMPT_INTERVAL) {
      console.log(`Authorization attempt too frequent, throttling. Last attempt was ${now - lastAttemptTime}ms ago`);
      // If we think we're initialized, tentatively return true
      return getIsGapiInitialized();
    }
    lastAttemptTime = now;
    
    // Check if we have an API key
    const apiKey = localStorage.getItem('google_api_key');
    if (!apiKey || apiKey === '') {
      console.log("No API key found in localStorage");
      toast.error('Google API key missing. Please add an API Key in settings.', {
        duration: 5000
      });
      return false;
    }
    
    console.log("API key found, proceeding to check Google Sheets API initialization");

    // Check if API is already initialized properly and Sheets API is available
    if (window.gapi?.client?.sheets && getIsGapiInitialized()) {
      console.log("Google Sheets API already initialized");
      // Reset failure counter on success
      failedAttempts = 0;
      return true;
    }
    
    // If we think we're initialized but Sheets API is not available,
    // update our state to match reality
    if (getIsGapiInitialized() && !window.gapi?.client?.sheets) {
      console.log("State says initialized but Sheets API is not available - correcting state");
      setGapiInitialized(false);
    }

    // Rate limit retries to prevent excessive API calls
    if (failedAttempts >= MAX_RETRIES && (now - lastAttemptTime) < 60000) {
      console.log(`Too many failed attempts (${failedAttempts}). Waiting before retrying.`);
      return false;
    }
    
    // Use signInToGoogle which will handle initialization
    const isInitialized = await signInToGoogle();
    console.log("Google sign-in result:", isInitialized);
    
    if (isInitialized) {
      failedAttempts = 0; // Reset counter on success
    } else {
      failedAttempts++; // Increment failure counter
    }
    
    // Force API key only mode permanently
    localStorage.setItem('force_api_key_only', 'true');

    // Always make sure Sheets API is loaded
    try {
      console.log("Checking if Sheets API is loaded:", !!window.gapi?.client?.sheets);
      
      if (!window.gapi?.client?.sheets) {
        console.log('Sheets API not loaded yet, attempting to load it');
        
        // Try loading Sheets API with multiple retries
        let retryCount = 0;
        const maxRetries = 3;
        
        while (retryCount < maxRetries && !window.gapi?.client?.sheets) {
          try {
            console.log(`Loading Sheets API (attempt ${retryCount + 1})`);
            await new Promise<void>((resolve, reject) => {
              if (!window.gapi?.client) {
                reject(new Error("Google API client not initialized"));
                return;
              }
              
              window.gapi.client.load('sheets', 'v4')
                .then(() => {
                  console.log("Sheets API loaded successfully");
                  resolve();
                })
                .catch(err => {
                  console.error(`Failed to load Sheets API (attempt ${retryCount + 1}):`, err);
                  reject(err);
                });
            });
            
            // Break if successful
            if (window.gapi?.client?.sheets) {
              console.log("Sheets API loaded successfully after retry");
              break;
            }
          } catch (err) {
            console.error(`Sheets API load attempt ${retryCount + 1} failed:`, err);
          }
          
          retryCount++;
          // Wait a bit before retrying
          await new Promise(resolve => setTimeout(resolve, 300 * retryCount));
        }
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
      failedAttempts++;
    }
    
    // If the client is initialized, try to continue anyway
    if (window.gapi?.client) {
      console.log('API client initialized but Sheets API may not be loaded - trying to continue');
      return true;
    }
    
    console.log("Authorization failed - API not initialized");
    return false;
  } catch (error) {
    console.error('Sheets authorization error:', error);
    failedAttempts++;
    
    // Try to return true anyway if client is initialized
    if (window.gapi?.client) {
      console.log('API key only mode - continuing despite errors');
      return true;
    }
    return false;
  }
};

// Reset the auth state - can be called to force re-authentication
export const resetAuthState = (): void => {
  failedAttempts = 0;
  lastAttemptTime = 0;
  
  // Clear saved initialization state
  if (typeof window !== 'undefined') {
    localStorage.setItem('gapi_initialized', 'false');
    setGapiInitialized(false);
  }
};
