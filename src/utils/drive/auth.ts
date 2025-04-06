
// Helper functions for managing Google authentication for Drive API
import { signInToGoogle } from '../google';
import { toast } from 'sonner';

/**
 * Ensure API is initialized for accessing Google Drive
 */
export const ensureAuthorization = async (): Promise<boolean> => {
  try {
    // Use signInToGoogle which will handle initialization
    const isAuthorized = await signInToGoogle();
    
    // Check if we have sufficient Drive permissions
    if (isAuthorized) {
      try {
        // Test with a minimal Drive API request
        await window.gapi.client.drive.about.get({
          fields: 'user'
        });
        return true;
      } catch (error: any) {
        // If we get a permission error, we don't have drive access
        if (error.result?.error?.code === 403) {
          console.warn('Drive API access is not available with current authentication');
          toast.warning('Google Drive access is limited. Resume storage will use local fallback.');
          return false;
        }
        
        // For other errors, we might still have access
        console.warn('Warning checking Drive permissions:', error);
        return true;
      }
    }
    
    return false;
  } catch (error) {
    console.error('Drive authorization error:', error);
    return false;
  }
};
