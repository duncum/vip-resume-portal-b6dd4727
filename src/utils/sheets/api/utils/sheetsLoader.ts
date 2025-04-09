
/**
 * Utility for loading the Google Sheets API
 */

/**
 * Ensures the Sheets API is loaded
 * @returns {Promise<boolean>} True if Sheets API is available
 */
export const ensureSheetsApiLoaded = async (): Promise<boolean> => {
  // Check if the Sheets API is already available
  if (window.gapi?.client?.sheets) {
    console.log("Google Sheets API already loaded");
    return true;
  }
  
  console.log("Sheets API not available. Trying to load it now.");
  
  // Try to load the Sheets API if not already loaded
  try {
    await new Promise<void>((resolve, reject) => {
      if (!window.gapi?.client) {
        console.error("Google API client not initialized");
        reject(new Error("Google API client not initialized"));
        return;
      }
      
      window.gapi.client.load('sheets', 'v4')
        .then(() => {
          console.log("Sheets API loaded successfully");
          resolve();
        })
        .catch(err => {
          console.error("Failed to load Sheets API:", err);
          reject(err);
        });
    });
    
    return !!window.gapi?.client?.sheets;
  } catch (error) {
    console.error("Failed to load Sheets API:", error);
    return false;
  }
};
