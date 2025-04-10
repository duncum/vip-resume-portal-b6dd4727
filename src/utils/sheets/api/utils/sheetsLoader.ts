
/**
 * Utility for ensuring the Sheets API is loaded
 */

/**
 * Ensure Sheets API is loaded
 */
export const ensureSheetsApiLoaded = async (): Promise<boolean> => {
  if (window.gapi?.client?.sheets) {
    console.log("Sheets API already loaded");
    return true;
  }
  
  console.log("Sheets API not loaded, attempting to load...");
  try {
    // Try loading Sheets API with multiple retries
    let retryCount = 0;
    const maxRetries = 3;
    
    while (retryCount < maxRetries) {
      try {
        console.log(`Loading Sheets API (attempt ${retryCount + 1})...`);
        await window.gapi.client.load('sheets', 'v4');
        console.log("Sheets API loaded successfully");
        return true;
      } catch (err) {
        console.error(`Sheets API load attempt ${retryCount + 1} failed:`, err);
        retryCount++;
        // Wait before retrying
        if (retryCount < maxRetries) {
          await new Promise(resolve => setTimeout(resolve, 300 * retryCount));
        }
      }
    }
    
    console.error("Failed to load Sheets API after multiple attempts");
    return false;
  } catch (error) {
    console.error("Error ensuring Sheets API is loaded:", error);
    return false;
  }
};
