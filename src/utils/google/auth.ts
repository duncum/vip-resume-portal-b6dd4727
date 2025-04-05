
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
    return true;
  }

  try {
    if (!isApiLoaded()) {
      await loadGoogleApi();
    }
    
    return new Promise((resolve) => {
      window.gapi.load('client:auth2', async () => {
        try {
          // Check if API key and client ID are available
          if (!API_KEY || !CLIENT_ID) {
            console.info('client_id and apiKey must both be provided to initialize OAuth.');
            isGapiInitialized = false;
            resolve(false);
            return;
          }

          await window.gapi.client.init({
            apiKey: API_KEY,
            clientId: CLIENT_ID,
            discoveryDocs: DISCOVERY_DOCS,
            scope: SCOPES
          });
          
          // Check if auth instance exists before accessing it
          const authInstance = window.gapi.auth2.getAuthInstance();
          if (authInstance) {
            // Listen for sign-in state changes
            authInstance.isSignedIn.listen(updateSignInStatus);
            
            // Set the initial sign-in state
            updateSignInStatus(authInstance.isSignedIn.get());
          } else {
            console.error('Auth instance is null');
            resolve(false);
            return;
          }
          
          isGapiInitialized = true;
          resolve(true);
        } catch (error) {
          console.error('Error initializing Google API client:', error);
          isGapiInitialized = false;
          resolve(false);
        }
      });
    });
  } catch (error) {
    console.error('Error loading Google API:', error);
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
      toast.error('Failed to initialize Google API');
      return false;
    }
  }

  try {
    const authInstance = window.gapi.auth2.getAuthInstance();
    if (!authInstance) {
      toast.error('Google Auth not initialized properly');
      return false;
    }
    
    await authInstance.signIn();
    return true;
  } catch (error) {
    console.error('Error signing in to Google:', error);
    toast.error('Failed to sign in to Google');
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
    const authInstance = window.gapi.auth2.getAuthInstance();
    if (authInstance) {
      await authInstance.signOut();
    }
  } catch (error) {
    console.error('Error signing out from Google:', error);
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
    const authInstance = window.gapi.auth2.getAuthInstance();
    return authInstance ? authInstance.isSignedIn.get() : false;
  } catch (error) {
    console.error('Error checking authorization status:', error);
    return false;
  }
};
