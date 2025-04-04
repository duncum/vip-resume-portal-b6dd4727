
// Handles loading the Google API client library

// Global variables to track loading state
let isGapiLoaded = false;

/**
 * Load the Google API client library
 */
export const loadGoogleApi = (): Promise<void> => {
  if (isGapiLoaded) {
    return Promise.resolve();
  }

  return new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.src = 'https://apis.google.com/js/api.js';
    script.async = true;
    script.defer = true;
    script.onload = () => {
      isGapiLoaded = true;
      resolve();
    };
    script.onerror = () => {
      reject(new Error('Failed to load Google API client library'));
    };
    document.body.appendChild(script);
  });
};

/**
 * Check if the Google API client library is loaded
 */
export const isApiLoaded = (): boolean => {
  return isGapiLoaded;
};
