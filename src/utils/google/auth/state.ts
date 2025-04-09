
// Global initialization state management

// Global initialization state
let isGapiInitialized = false;

// Check localStorage for saved initialization state on module load
// This helps with page refreshes
if (typeof window !== 'undefined') {
  try {
    const savedState = localStorage.getItem('gapi_initialized');
    if (savedState === 'true') {
      isGapiInitialized = true;
    }
  } catch (e) {
    console.warn("Could not read initialization state from localStorage");
  }
}

/**
 * Check if the API is initialized
 */
export const getIsGapiInitialized = (): boolean => {
  // Add additional check for sheets API availability
  const sheetsAvailable = !!window.gapi?.client?.sheets;
  
  // If we think we're initialized but sheets is not available,
  // update our state to match reality
  if (isGapiInitialized && !sheetsAvailable && window.gapi) {
    console.warn("isGapiInitialized was true but sheets API is not available - correcting state");
    setGapiInitialized(false);
    return false;
  }
  
  return isGapiInitialized;
};

/**
 * Set the initialization state
 */
export const setGapiInitialized = (value: boolean): void => {
  isGapiInitialized = value;
  
  // Also persist to localStorage for page refreshes
  if (typeof window !== 'undefined') {
    try {
      localStorage.setItem('gapi_initialized', value ? 'true' : 'false');
    } catch (e) {
      console.warn("Could not save initialization state to localStorage");
    }
  }
};

/**
 * Get API key only mode status - always true in this implementation
 */
export const isApiKeyOnlyMode = (): boolean => {
  return true; // Always use API key only mode
};

/**
 * Enable API key only mode (permanent in this implementation)
 */
export const setApiKeyOnlyMode = (enabled: boolean): void => {
  // Always enforce API key only mode
  localStorage.setItem('force_api_key_only', 'true');
  console.log("API key only mode enabled (permanent)");
};
