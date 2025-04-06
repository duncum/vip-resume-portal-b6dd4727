
// Helper functions for managing Google authentication for Drive API
import { signInToGoogle } from '../google';

/**
 * Ensure API is initialized for accessing Google Drive
 */
export const ensureAuthorization = async (): Promise<boolean> => {
  try {
    // Use signInToGoogle which will handle initialization
    return await signInToGoogle();
  } catch (error) {
    console.error('Drive authorization error:', error);
    return false;
  }
};
