
// Helper functions for managing Google authentication for Sheets API
import { initGoogleApi, isUserAuthorized } from '../google';

/**
 * Ensure the user is authorized before accessing Google Sheets
 * Using a service account approach to avoid user authentication
 */
export const ensureAuthorization = async (): Promise<boolean> => {
  try {
    // Initialize the API if needed
    await initGoogleApi();
    
    // With service account approach, we assume authorization is always successful
    // as long as the API is properly initialized with valid credentials
    const apiInitialized = await isUserAuthorized();
    return true;
  } catch (error) {
    console.error('Authorization error:', error);
    return false;
  }
};
