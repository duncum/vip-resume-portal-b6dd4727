
// Google API authorization functionality

import { toast } from "sonner";
import { getIsGapiInitialized, setGapiInitialized } from './initialize';
import { API_KEY } from '../config';

/**
 * Check if user is authorized with the Google API
 */
export const isUserAuthorized = async (): Promise<boolean> => {
  return getIsGapiInitialized();
};

/**
 * Sign in to Google API
 */
export const signInToGoogle = async (): Promise<boolean> => {
  // Set a loading flag to indicate API is being initialized
  try {
    const result = await import('./core').then(module => module.initGoogleApi());
    if (result) {
      setGapiInitialized(true);
      toast.success('Successfully connected to Google API');
    }
    return result;
  } catch (error) {
    console.error('Error signing in to Google:', error);
    setGapiInitialized(false);
    toast.error('Failed to connect to Google API');
    return false;
  }
};

/**
 * Sign out from Google API
 */
export const signOutFromGoogle = async (): Promise<void> => {
  setGapiInitialized(false);
  toast.success('Disconnected from Google API');
};
