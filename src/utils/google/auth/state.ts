
// Global initialization state management

// Global initialization state
let isGapiInitialized = false;

/**
 * Check if the API is initialized
 */
export const getIsGapiInitialized = (): boolean => {
  // Add additional check for sheets API availability
  const sheetsAvailable = !!window.gapi?.client?.sheets;
  if (isGapiInitialized && !sheetsAvailable) {
    console.warn("isGapiInitialized is true but sheets API is not available");
  }
  return isGapiInitialized;
};

/**
 * Set the initialization state (for testing or resetting)
 */
export const setGapiInitialized = (value: boolean): void => {
  isGapiInitialized = value;
};

/**
 * Get API key only mode status - always true in this implementation
 */
export const isApiKeyOnlyMode = (): boolean => {
  return true; // Always return true
};

/**
 * Enable or disable API key only mode
 */
export const setApiKeyOnlyMode = (enabled: boolean): void => {
  // Always enforce API key only mode regardless of the parameter
  localStorage.setItem('force_api_key_only', 'true');
  console.log("API key only mode enabled (permanent)");
};
