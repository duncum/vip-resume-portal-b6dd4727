
// Helper functions for managing Google authentication for Sheets API
import { initGoogleApi, isUserAuthorized, signInToGoogle } from '../google';

/**
 * Ensure the user is authorized before accessing Google Sheets
 */
export const ensureAuthorization = async (): Promise<boolean> => {
  try {
    // Initialize the API if needed
    await initGoogleApi();
    
    // Check if the user is authorized
    const authorized = await isUserAuthorized();
    
    if (!authorized) {
      // Prompt for authorization
      const signedIn = await signInToGoogle();
      return signedIn;
    }
    
    return true;
  } catch (error) {
    console.error('Authorization error:', error);
    return false;
  }
};
