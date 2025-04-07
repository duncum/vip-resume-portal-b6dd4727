
// API loading functionality

import { toast } from "sonner";
import { loadGoogleApi, isApiLoaded } from '../loader';

/**
 * Load Google API if not already loaded
 */
export const loadApiIfNeeded = async (): Promise<boolean> => {
  if (!isApiLoaded()) {
    console.log("Google API not loaded, loading now...");
    try {
      await loadGoogleApi();
      console.log("Google API loaded successfully");
    } catch (error) {
      console.error("Failed to load Google API:", error);
      return false;
    }
  }
  
  if (!window.gapi) {
    console.error("Google API failed to load properly - window.gapi is undefined");
    toast.error("Failed to load Google API. Please check your internet connection and try again.");
    return false;
  }
  
  return true;
};
