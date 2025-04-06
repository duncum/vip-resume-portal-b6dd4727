
import { toast } from 'sonner';
import { initGoogleApi } from '../google';

/**
 * Ensure API is initialized before accessing Google Drive
 */
export const ensureAuthorization = async (): Promise<boolean> => {
  try {
    // Initialize the API with credentials
    return await initGoogleApi();
  } catch (error) {
    console.error('Authorization error:', error);
    toast.error('Not connected to Google API. Please enter your credentials first.');
    return false;
  }
};
