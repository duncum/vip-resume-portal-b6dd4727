
// Handles loading the Google API client library

// Global variables to track loading state
let isGapiLoaded = false;
let loadPromise: Promise<void> | null = null;

/**
 * Load the Google API client library
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
    // Check if script is already in the DOM
    if (document.querySelector('script[src="https://apis.google.com/js/api.js"]')) {
      if (window.gapi) {
        isGapiLoaded = true;
        console.log('Google API client library already loaded in DOM');
        resolve();
        return;
      }
    }

    console.log("Attempting to load Google API client library...");
    const script = document.createElement('script');
    script.src = 'https://apis.google.com/js/api.js';
    script.async = true;
    script.defer = true;
    
    // Set timeout for script loading
    const timeoutId = setTimeout(() => {
      reject(new Error('Google API script load timed out after 20 seconds'));
    }, 20000);
    
    script.onload = () => {
      clearTimeout(timeoutId);
      if (window.gapi) {
        isGapiLoaded = true;
        console.log('Google API client library loaded successfully');
        resolve();
      } else {
        console.error('Script loaded but window.gapi is not defined');
        reject(new Error('Script loaded but window.gapi is not defined'));
      }
      // Reset the loadPromise so we can try again if needed
      loadPromise = null;
    };
    
    script.onerror = (error) => {
      clearTimeout(timeoutId);
      console.error('Failed to load Google API client library', error);
      reject(new Error('Failed to load Google API client library'));
      // Reset the loadPromise so we can try again if needed
      loadPromise = null;
    };
    
    document.body.appendChild(script);
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
