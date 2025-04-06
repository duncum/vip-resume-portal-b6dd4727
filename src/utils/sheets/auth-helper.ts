
// Helper functions for managing Google authentication for Sheets API
import { signInToGoogle } from '../google';

/**
 * Ensure API is initialized for accessing Google Sheets
 * Using a direct API key approach to avoid user authentication
 */
export const ensureAuthorization = async (): Promise<boolean> => {
  try {
    // Use signInToGoogle which will handle initialization
    return await signInToGoogle();
  } catch (error) {
    console.error('Sheets authorization error:', error);
    return false;
  }
};
