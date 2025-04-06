
// Helper functions for managing Google authentication for Sheets API
import { signInToGoogle } from '../google';
import { toast } from 'sonner';

/**
 * Ensure API is initialized for accessing Google Sheets
 * Modified to be more tolerant in API key only mode
 */
export const ensureAuthorization = async (): Promise<boolean> => {
  try {
    // Check if we have an API key
    const apiKey = localStorage.getItem('google_api_key');
    if (!apiKey || apiKey === '') {
      toast.error('Google API key missing. Please add an API Key in settings.', {
        duration: 5000
      });
      return false;
    }

    // Use signInToGoogle which will handle initialization
    const isAuthorized = await signInToGoogle();

    // In API key only mode, we may not get full authorization but that's OK
    // as long as we have initialized the API
    const clientId = localStorage.getItem('google_client_id');
    if (isAuthorized) {
      if (!clientId || clientId === '') {
        console.log('Running in API key only mode');
        // We're in API key only mode, which is fine for reading data
        return true;
      }
      
      try {
        // Check if the sheets API is available
        if (!window.gapi.client.sheets) {
          console.log('Sheets API not loaded yet, attempting to load it');
          
          // Use the simplified approach with a direct callback function
          await new Promise<void>((resolve, reject) => {
            window.gapi.load('client:auth2', () => {
              window.gapi.client.load('sheets', 'v4')
                .then(() => resolve())
                .catch(err => reject(err));
            });
          });
          
          if (!window.gapi.client.sheets) {
            throw new Error('Could not load Sheets API');
          }
        }
        
        // Try a test request to see if we have permissions
        await window.gapi.client.sheets.spreadsheets.values.get({
          spreadsheetId: localStorage.getItem('google_spreadsheet_id') || '',
          range: 'A1'
        });
        
        return true;
      } catch (error: any) {
        // Check specifically for auth errors
        if (error.result?.error?.code === 401) {
          console.warn('Sheets API requires OAuth for write operations');
          
          // In API key only mode, we'll allow read operations
          if (!clientId || clientId === '') {
            console.log('API key only mode - read operations should work');
            return true;
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
