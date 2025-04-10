
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

// Import the functions from state.ts to use them locally
import { getIsGapiInitialized, setGapiInitialized } from './state';

// Add a debug flag for testing
window._debugGoogleAuth = true;

// Fix the API Key Only mode flag
if (typeof window !== 'undefined' && window.localStorage) {
  localStorage.setItem('force_api_key_only', 'true');
  if (localStorage.getItem('google_client_id')) {
    console.log("Warning: Client ID found but API Key Only mode is enforced");
  }
}

// Periodic health check and recovery function
const performHealthCheck = () => {
  const isInitialized = getIsGapiInitialized();
  const apiKey = localStorage.getItem('google_api_key');
  
  // Only perform health check if we should be initialized
  if (isInitialized && apiKey) {
    // Check if API client is actually available
    if (!window.gapi?.client) {
      console.warn("Health check: API client unavailable despite initialized state");
      
      // Reset initialization flag
      setGapiInitialized(false);
      
      // Attempt to reinitialize if not already trying
      if (!window._isGoogleInitializing) {
        console.log("Health check: attempting to recover API client");
        
        import('./core').then(module => {
          window._isGoogleInitializing = true;
          module.initGoogleApi().finally(() => {
            window._isGoogleInitializing = false;
          });
        });
      }
    } else {
      console.log("Health check: API client is healthy");
    }
  }
};

// Add automatic re-initialization on window focus
// This helps recover from cases where the API becomes unavailable
if (typeof window !== 'undefined') {
  // Focus event listener
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

  // Regular health checks (every 5 minutes)
  setInterval(performHealthCheck, 300000);
  
  // Declare property for TypeScript
  window._isGoogleInitializing = false;
  
  // Try to preload the core module for faster initialization
  setTimeout(() => {
    import('./core').catch(() => {
      // Silent catch - just preloading for performance
    });
  }, 5000);
}

// Extend Window interface for TypeScript
declare global {
  interface Window {
    _isGoogleInitializing: boolean;
    _debugGoogleAuth?: boolean;
  }
}
