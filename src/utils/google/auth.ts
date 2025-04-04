
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
          await window.gapi.client.init({
            apiKey: API_KEY,
            clientId: CLIENT_ID,
            discoveryDocs: DISCOVERY_DOCS,
            scope: SCOPES
          });
          
          // Listen for sign-in state changes
          window.gapi.auth2.getAuthInstance().isSignedIn.listen(updateSignInStatus);
          
          // Set the initial sign-in state
          updateSignInStatus(window.gapi.auth2.getAuthInstance().isSignedIn.get());
          
          isGapiInitialized = true;
          resolve(true);
        } catch (error) {
          console.error('Error initializing Google API client:', error);
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
    await window.gapi.auth2.getAuthInstance().signIn();
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
    await window.gapi.auth2.getAuthInstance().signOut();
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
  
  return isAuthorized;
};
