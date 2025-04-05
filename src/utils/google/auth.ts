
// Handles Google API authentication

import { toast } from "sonner";
import { loadGoogleApi, isApiLoaded } from './loader';
import { CLIENT_ID, API_KEY, DISCOVERY_DOCS, SCOPES } from './config';

// Global variables to track authentication state
let isGapiInitialized = false;
let isAuthorized = false;

/**
 * Update the sign-in status based on the current auth state
 */
const updateSignInStatus = (isSignedIn: boolean) => {
  isAuthorized = isSignedIn;
  
  if (isSignedIn) {
    console.log('User is signed in to Google');
  } else {
    console.log('User is not signed in to Google');
  }
};

/**
 * Initialize the Google API client
 */
export const initGoogleApi = async (): Promise<boolean> => {
  if (isGapiInitialized) {
    console.log("Google API already initialized");
    return true;
  }

  try {
    // Check for API credentials
    if (!API_KEY || !CLIENT_ID) {
      console.error('Google API credentials missing. Client ID and API Key must both be provided to initialize OAuth.');
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
      window.gapi.load('client:auth2', async () => {
        try {
          console.log("Initializing client with API_KEY and CLIENT_ID...");
          console.log(`API_KEY: ${API_KEY ? "provided" : "missing"}, CLIENT_ID: ${CLIENT_ID ? "provided" : "missing"}`);

          await window.gapi.client.init({
            apiKey: API_KEY,
            clientId: CLIENT_ID,
            discoveryDocs: DISCOVERY_DOCS,
            scope: SCOPES
          });
          
          console.log("Client initialized, getting auth instance...");
          
          // Check if auth2 module exists before accessing it
          if (!window.gapi.auth2) {
            console.error("Auth2 module not loaded properly");
            toast.error("Failed to initialize Google auth. Please try again later.");
            resolve(false);
            return;
          }
          
          const authInstance = window.gapi.auth2.getAuthInstance();
          if (authInstance) {
            // Listen for sign-in state changes
            authInstance.isSignedIn.listen(updateSignInStatus);
            
            // Set the initial sign-in state
            updateSignInStatus(authInstance.isSignedIn.get());
            
            console.log("Auth instance initialized successfully");
          } else {
            console.error('Auth instance is null');
            toast.error("Failed to initialize Google auth. Please try again later.");
            resolve(false);
            return;
          }
          
          isGapiInitialized = true;
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
 * Handle the sign-in process
 */
export const signInToGoogle = async (): Promise<boolean> => {
  if (!isGapiInitialized) {
    const initialized = await initGoogleApi();
    if (!initialized) {
      toast.error('Failed to initialize Google API. Please check your credentials.');
      return false;
    }
  }

  try {
    if (!window.gapi || !window.gapi.auth2) {
      toast.error('Google Auth not initialized properly');
      return false;
    }
    
    const authInstance = window.gapi.auth2.getAuthInstance();
    if (!authInstance) {
      toast.error('Google Auth not initialized properly');
      return false;
    }
    
    await authInstance.signIn();
    toast.success('Successfully signed in to Google');
    return true;
  } catch (error) {
    console.error('Error signing in to Google:', error);
    if (error instanceof Error && error.message.includes('popup')) {
      toast.error('Pop-up blocked. Please allow pop-ups for this site and try again.');
    } else if (error instanceof Error && error.message.includes('user closed')) {
      toast.error('Sign-in cancelled by user.');
    } else {
      toast.error('Failed to sign in to Google. Please try again.');
    }
    return false;
  }
};

/**
 * Handle the sign-out process
 */
export const signOutFromGoogle = async (): Promise<void> => {
  if (!isGapiInitialized) {
    return;
  }

  try {
    if (!window.gapi || !window.gapi.auth2) {
      console.log("Auth2 module not loaded, cannot sign out");
      return;
    }
    
    const authInstance = window.gapi.auth2.getAuthInstance();
    if (authInstance) {
      await authInstance.signOut();
      toast.success('Successfully signed out from Google');
    }
  } catch (error) {
    console.error('Error signing out from Google:', error);
    toast.error('Error signing out from Google');
  }
};

/**
 * Check if the user is currently authorized with Google
 */
export const isUserAuthorized = async (): Promise<boolean> => {
  if (!isGapiInitialized) {
    const initialized = await initGoogleApi();
    if (!initialized) {
      return false;
    }
  }
  
  // Safely check if auth instance exists and user is signed in
  try {
    if (!window.gapi || !window.gapi.auth2) {
      console.log("Auth2 module not loaded, user cannot be authorized");
      return false;
    }
    
    const authInstance = window.gapi.auth2.getAuthInstance();
    return authInstance ? authInstance.isSignedIn.get() : false;
  } catch (error) {
    console.error('Error checking authorization status:', error);
    return false;
  }
};
