
// Helper functions for managing Google authentication for Sheets API
import { signInToGoogle } from '../google';
import { toast } from 'sonner';

/**
 * Ensure API is initialized for accessing Google Sheets
 * Sheets API requires OAuth token for write operations, not just API key
 */
export const ensureAuthorization = async (): Promise<boolean> => {
  try {
    // Use signInToGoogle which will handle initialization
    const isAuthorized = await signInToGoogle();

    // If we're authorized in API key only mode, we need to warn the user
    // that they won't be able to write to sheets without OAuth
    if (isAuthorized) {
      try {
        // Try a test request to see if we have write permissions
        // This will be a small request that won't actually modify anything
        await window.gapi.client.sheets.spreadsheets.values.get({
          spreadsheetId: localStorage.getItem('google_spreadsheet_id') || '',
          range: 'A1'
        });
        
        return true;
      } catch (error: any) {
        // Check specifically for auth errors
        if (error.result?.error?.code === 401) {
          console.warn('Sheets API requires OAuth for write operations');
          
          // Check if we're in API key only mode
          if (!localStorage.getItem('google_client_id') || localStorage.getItem('google_client_id') === '') {
            toast.error('OAuth authentication required for Google Sheets. Please add a Client ID in settings.', {
              duration: 5000
            });
          } else {
            toast.warning('Google Sheets permissions are limited. Some features may not work.', {
              duration: 5000
            });
          }
        }
        
        console.error('Sheets API test request failed:', error);
        return false;
      }
    }
    
    return false;
  } catch (error) {
    console.error('Sheets authorization error:', error);
    return false;
  }
};
