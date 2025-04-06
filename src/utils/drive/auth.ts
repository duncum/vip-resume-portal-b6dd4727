
import { toast } from 'sonner';
import { signInToGoogle } from '../google';

/**
 * Ensure API is initialized before accessing Google Drive
 * This version doesn't require user sign-in as authentication is handled by Memberspace
 */
export const ensureAuthorization = async (): Promise<boolean> => {
  try {
    // Use signInToGoogle which will handle initialization
    return await signInToGoogle();
  } catch (error) {
    console.error('Drive authorization error:', error);
    toast.error('Not connected to Google API. Please enter your credentials first.');
    return false;
  }
};
