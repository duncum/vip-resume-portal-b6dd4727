
// API configuration management

import { GoogleApiInitOptions } from './types';
import { toast } from "sonner";

/**
 * Get API configuration from localStorage
 */
export const getApiConfig = (): { 
  apiKey: string | null, 
  hasValidConfig: boolean 
} => {
  // Get API key from localStorage or fallback
  const savedApiKey = localStorage.getItem('google_api_key');
  const apiKeyToUse = savedApiKey || localStorage.getItem('google_api_key_fallback');
  
  if (!apiKeyToUse) {
    console.error("No API key available for initialization");
    toast.error("API key missing. Please add your API key in settings.");
    return { apiKey: null, hasValidConfig: false };
  }
  
  console.log("Using API key:", apiKeyToUse ? "Present (hidden)" : "Missing");
  return { apiKey: apiKeyToUse, hasValidConfig: true };
};

/**
 * Create API initialization configuration
 */
export const createApiConfig = (apiKey: string): GoogleApiInitOptions => {
  // To fix the "API keys are not supported by this API" error, we need to make sure
  // that operations that require OAuth aren't attempted with just an API key
  return {
    apiKey: apiKey,
    discoveryDocs: [
      'https://sheets.googleapis.com/$discovery/rest?version=v4',
      'https://www.googleapis.com/discovery/v1/apis/drive/v3/rest'
    ]
  };
};
