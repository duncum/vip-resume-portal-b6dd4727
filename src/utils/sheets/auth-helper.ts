
// Helper functions for managing Google authentication for Sheets API
import { initGoogleApi } from '../google';

/**
 * Ensure API is initialized for accessing Google Sheets
 * Using a direct API key approach to avoid user authentication
 */
export const ensureAuthorization = async (): Promise<boolean> => {
  try {
    // Initialize the API with stored credentials
    const apiInitialized = await initGoogleApi();
    return apiInitialized;
  } catch (error) {
    console.error('Authorization error:', error);
    return false;
  }
};
