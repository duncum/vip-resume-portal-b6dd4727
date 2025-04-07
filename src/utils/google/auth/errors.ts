
// Error handling for Google API initialization

import { toast } from "sonner";

/**
 * Handle errors during initialization
 */
export const handleInitError = (error: unknown): void => {
  console.error('Error initializing Google API client:', error);
  
  // Special handling for OAuth origin errors
  const errorStr = String(error);
  if (errorStr.includes('idpiframe_initialization_failed') || 
      errorStr.includes('Not a valid origin') ||
      errorStr.includes('OAuth')) {
    console.log("OAuth origin error detected, in permanent API key only mode");
    toast.error("API connection issue. Please make sure your API key is correct.", {
      duration: 6000
    });
  } else {
    toast.error(`Failed to initialize Google API: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
};
