
// Main entry point for the Google Auth module
// Re-exports all necessary functions for backward compatibility

export { 
  initGoogleApi,
  isGapiInitialized,
  isUserAuthorized,
  signInToGoogle, 
  signOutFromGoogle
} from './core';
