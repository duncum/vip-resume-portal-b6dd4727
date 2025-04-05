
// Handles loading the Google API client library

// Global variables to track loading state
let isGapiLoaded = false;

/**
 * Load the Google API client library
 */
export const loadGoogleApi = (): Promise<void> => {
  if (isGapiLoaded && window.gapi) {
    console.log("Google API already loaded, reusing existing instance");
    return Promise.resolve();
  }

  return new Promise((resolve, reject) => {
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
    script.onload = () => {
      if (window.gapi) {
        isGapiLoaded = true;
        console.log('Google API client library loaded successfully');
        resolve();
      } else {
        console.error('Script loaded but window.gapi is not defined');
        reject(new Error('Script loaded but window.gapi is not defined'));
      }
    };
    script.onerror = (error) => {
      console.error('Failed to load Google API client library', error);
      reject(new Error('Failed to load Google API client library'));
    };
    document.body.appendChild(script);
  });
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
