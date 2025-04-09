
// Global initialization state management

// Global initialization state
let isGapiInitialized = false;

// Store the time of last successful initialization
let lastInitTime = 0;

// Check localStorage for saved initialization state on module load
// This helps with page refreshes
if (typeof window !== 'undefined') {
  try {
    const savedState = localStorage.getItem('gapi_initialized');
    if (savedState === 'true') {
      isGapiInitialized = true;
      
      try {
        const savedTime = localStorage.getItem('gapi_init_time');
        if (savedTime) {
          lastInitTime = parseInt(savedTime, 10);
        }
      } catch (e) {
        // Ignore time parsing errors
      }
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
  
  // Check if initialization is stale (older than 30 minutes)
  const now = Date.now();
  const initAge = now - lastInitTime;
  const isStale = initAge > 1800000; // 30 minutes
  
  // If we think we're initialized but sheets is not available,
  // update our state to match reality
  if (isGapiInitialized && !sheetsAvailable && window.gapi) {
    if (isStale) {
      console.warn("isGapiInitialized was true but sheets API is not available and init is stale - correcting state");
      setGapiInitialized(false);
      return false;
    } else {
      console.log("isGapiInitialized is true but sheets API is not available - initialization not stale yet");
    }
  }
  
  return isGapiInitialized;
};

/**
 * Set the initialization state
 */
export const setGapiInitialized = (value: boolean): void => {
  isGapiInitialized = value;
  
  // Update last init time if setting to true
  if (value) {
    lastInitTime = Date.now();
  }
  
  // Also persist to localStorage for page refreshes
  if (typeof window !== 'undefined') {
    try {
      localStorage.setItem('gapi_initialized', value ? 'true' : 'false');
      if (value) {
        localStorage.setItem('gapi_init_time', lastInitTime.toString());
      }
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

/**
 * Get the last successful initialization time
 */
export const getLastInitTime = (): number => {
  return lastInitTime;
};
