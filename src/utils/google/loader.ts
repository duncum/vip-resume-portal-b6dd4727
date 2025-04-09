
// Handles loading the Google API client library

// Global variables to track loading state
let isGapiLoaded = false;
let loadPromise: Promise<void> | null = null;
let loadRetries = 0;
const MAX_LOAD_RETRIES = 3;

/**
 * Load the Google API client library with retries
 */
export const loadGoogleApi = (): Promise<void> => {
  if (isGapiLoaded && window.gapi) {
    console.log("Google API already loaded, reusing existing instance");
    return Promise.resolve();
  }
  
  // If we're already loading, return the existing promise
  if (loadPromise) {
    console.log("Already loading Google API, returning existing promise");
    return loadPromise;
  }

  loadPromise = new Promise((resolve, reject) => {
    const attemptLoad = (retryCount: number) => {
      // Check if script is already in the DOM
      if (document.querySelector('script[src="https://apis.google.com/js/api.js"]')) {
        if (window.gapi) {
          isGapiLoaded = true;
          console.log('Google API client library already loaded in DOM');
          resolve();
          return;
        }
      }

      console.log(`Attempting to load Google API client library (attempt ${retryCount + 1})...`);
      const script = document.createElement('script');
      script.src = 'https://apis.google.com/js/api.js';
      script.async = true;
      script.defer = true;
      
      // Set timeout for script loading
      const timeoutId = setTimeout(() => {
        if (retryCount < MAX_LOAD_RETRIES - 1) {
          console.log(`Google API script load timed out, retrying (${retryCount + 1}/${MAX_LOAD_RETRIES})...`);
          script.remove();
          attemptLoad(retryCount + 1);
        } else {
          reject(new Error(`Google API script load timed out after ${MAX_LOAD_RETRIES} attempts`));
          loadPromise = null;
        }
      }, 15000); // 15 second timeout
      
      script.onload = () => {
        clearTimeout(timeoutId);
        if (window.gapi) {
          isGapiLoaded = true;
          console.log('Google API client library loaded successfully');
          resolve();
        } else {
          console.error('Script loaded but window.gapi is not defined');
          
          if (retryCount < MAX_LOAD_RETRIES - 1) {
            console.log(`Retrying Google API load (${retryCount + 1}/${MAX_LOAD_RETRIES})...`);
            script.remove();
            setTimeout(() => attemptLoad(retryCount + 1), 1000);
          } else {
            reject(new Error('Script loaded but window.gapi is not defined after max retries'));
            loadPromise = null;
          }
        }
      };
      
      script.onerror = (error) => {
        clearTimeout(timeoutId);
        console.error('Failed to load Google API client library', error);
        
        if (retryCount < MAX_LOAD_RETRIES - 1) {
          console.log(`Retrying Google API load after error (${retryCount + 1}/${MAX_LOAD_RETRIES})...`);
          script.remove();
          setTimeout(() => attemptLoad(retryCount + 1), 1000);
        } else {
          reject(new Error('Failed to load Google API client library after max retries'));
          loadPromise = null;
        }
      };
      
      document.body.appendChild(script);
    };
    
    // Start the loading process
    attemptLoad(0);
  });
  
  return loadPromise;
};

/**
 * Check if the Google API client library is loaded
 */
export const isApiLoaded = (): boolean => {
  const loaded = isGapiLoaded && !!window.gapi;
  if (!loaded) {
    console.log("Google API is not loaded yet");
  }
  return loaded;
};

/**
 * Force reload Google API if needed
 */
export const forceReloadGoogleApi = (): Promise<void> => {
  // Reset loading state
  isGapiLoaded = false;
  loadPromise = null;
  
  // Remove existing script if any
  const existingScript = document.querySelector('script[src="https://apis.google.com/js/api.js"]');
  if (existingScript) {
    existingScript.remove();
    console.log("Removed existing Google API script");
  }
  
  // Load again
  return loadGoogleApi();
};

// Auto-recovery for window.gapi disappearing
if (typeof window !== 'undefined') {
  // Check periodically if window.gapi exists
  setInterval(() => {
    if (isGapiLoaded && !window.gapi) {
      console.warn("window.gapi disappeared unexpectedly, reloading API");
      isGapiLoaded = false;
      loadPromise = null;
      // Reload on next use
    }
  }, 30000); // Check every 30 seconds
}
