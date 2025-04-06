
// Main entry point for the Google Auth module
// Re-exports all necessary functions from specialized modules

// From core module (initialization)
export { initGoogleApi } from './core';

// From authorization module
export { 
  isUserAuthorized,
  signInToGoogle, 
  signOutFromGoogle
} from './authorize';

// From initialization module
export { getIsGapiInitialized } from './initialize';
