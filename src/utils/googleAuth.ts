
// This file is kept for backward compatibility
// It re-exports all functions from the new modular structure

import { toast } from "sonner";
import * as GoogleAuth from './google';

// Re-export everything for backward compatibility
export const {
  CLIENT_ID,
  API_KEY,
  DISCOVERY_DOCS,
  SCOPES,
  getRedirectUri,
  loadGoogleApi,
  initGoogleApi,
  signInToGoogle,
  signOutFromGoogle,
  isUserAuthorized,
  getCurrentUserEmail
} = GoogleAuth;

// Re-export for backward compatibility - these were internal in the original file
export const isGapiLoaded = GoogleAuth.isApiLoaded;
// Use the exported function for isGapiInitialized
export const isGapiInitialized = GoogleAuth.getIsGapiInitialized;
export const isAuthorized = false; // This was internal state

// Import and export the printOAuthSetupInstructions for backward compatibility
import { printOAuthSetupInstructions } from './google/config';
export { printOAuthSetupInstructions };
