
import { toast } from 'sonner';
import { initGoogleApi } from '../google';

/**
 * Ensure API is initialized before accessing Google Drive
 * This version doesn't require user sign-in as authentication is handled by Memberspace
 */
export const ensureAuthorization = async (): Promise<boolean> => {
  try {
    // Initialize the API with credentials only (no user sign-in required)
    return await initGoogleApi();
  } catch (error) {
    console.error('Authorization error:', error);
    toast.error('Not connected to Google API. Please enter your credentials first.');
    return false;
  }
};
