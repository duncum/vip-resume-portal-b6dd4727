
// This file manages Google API authentication and access tokens

import { toast } from "sonner";

// Google API configuration
// In production, these values should come from environment variables
const CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID || "YOUR_GOOGLE_CLIENT_ID"; // Replace with your actual client ID
const API_KEY = import.meta.env.VITE_GOOGLE_API_KEY || "YOUR_GOOGLE_API_KEY"; // Replace with your actual API key
const DISCOVERY_DOCS = [
  "https://www.googleapis.com/discovery/v1/apis/drive/v3/rest",
  "https://sheets.googleapis.com/$discovery/rest?version=v4"
];
const SCOPES = 'https://www.googleapis.com/auth/spreadsheets https://www.googleapis.com/auth/drive.file';

// Global variables to track authentication state
let isGapiInitialized = false;
let isGapiLoaded = false;
let isAuthorized = false;

/**
 * Load the Google API client library
 */
export const loadGoogleApi = (): Promise<void> => {
  if (isGapiLoaded) {
    return Promise.resolve();
  }

  return new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.src = 'https://apis.google.com/js/api.js';
    script.async = true;
    script.defer = true;
    script.onload = () => {
      isGapiLoaded = true;
      resolve();
    };
    script.onerror = () => {
      reject(new Error('Failed to load Google API client library'));
    };
    document.body.appendChild(script);
  });
};

/**
 * Initialize the Google API client
 */
export const initGoogleApi = async (): Promise<boolean> => {
  if (isGapiInitialized) {
    return true;
  }

  try {
    await loadGoogleApi();
    
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

/**
 * Get the current user's email address
 */
export const getCurrentUserEmail = (): string | null => {
  if (!isGapiInitialized || !isAuthorized) {
    return null;
  }
  
  const user = window.gapi.auth2.getAuthInstance().currentUser.get();
  const profile = user.getBasicProfile();
  
  if (profile) {
    return profile.getEmail();
  }
  
  return null;
};
