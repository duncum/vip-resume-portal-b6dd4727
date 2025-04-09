
// Google API initialization functionality - modular version

// Force API key only mode permanently with no chance to override
localStorage.setItem('force_api_key_only', 'true');

// Re-export everything from the modular files
export { 
  loadApiIfNeeded 
} from './loader';

export { 
  initializeWithTimeout 
} from './timeout';

export { 
  getIsGapiInitialized, 
  setGapiInitialized,
  isApiKeyOnlyMode,
  setApiKeyOnlyMode
} from './state';

// Add automatic re-initialization on window focus
// This helps recover from cases where the API becomes unavailable
if (typeof window !== 'undefined') {
  window.addEventListener('focus', () => {
    const apiKey = localStorage.getItem('google_api_key');
    if (apiKey) {
      import('./core').then(module => {
        // Only try to reinitialize if we're not in the middle of another operation
        if (!window._isGoogleInitializing && !window.gapi?.client?.sheets) {
          console.log("Window focus detected, checking API connection...");
          window._isGoogleInitializing = true;
          module.initGoogleApi().finally(() => {
            window._isGoogleInitializing = false;
          });
        }
      });
    }
  });

  // Declare property for TypeScript
  window._isGoogleInitializing = false;
}

// Extend Window interface for TypeScript
declare global {
  interface Window {
    _isGoogleInitializing: boolean;
  }
}
