
// Main entry point for the Google API utilities
// Re-exports all the necessary functions

export { 
  CLIENT_ID, 
  API_KEY, 
  DISCOVERY_DOCS, 
  SCOPES,
  getRedirectUri 
} from './config';

export { 
  loadGoogleApi, 
  isApiLoaded 
} from './loader';

export { 
  initGoogleApi, 
  signInToGoogle, 
  signOutFromGoogle, 
  isUserAuthorized 
} from './auth';

export { 
  getCurrentUserEmail,
  getUserProfile
} from './user';
