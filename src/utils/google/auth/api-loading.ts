
// API specific loading functionality

import { toast } from "sonner";

/**
 * Load the Sheets API with multiple retries
 */
export async function loadSheetsApi(): Promise<boolean> {
  let sheetsLoaded = false;
  let retryCount = 0;
  const maxRetries = 3;
  
  while (!sheetsLoaded && retryCount < maxRetries) {
    try {
      console.log(`Loading Sheets API (attempt ${retryCount + 1})...`);
      await window.gapi.client.load('sheets', 'v4');
      console.log("Sheets API loaded successfully");
      sheetsLoaded = true;
    } catch (sheetsError) {
      console.error(`Failed to load Sheets API (attempt ${retryCount + 1}):`, sheetsError);
      retryCount++;
      // Wait a bit before retrying
      if (retryCount < maxRetries) {
        await new Promise(r => setTimeout(r, 300 * retryCount));
      }
    }
  }
  
  return sheetsLoaded;
}

/**
 * Load Gmail API
 */
export async function loadGmailApi(): Promise<boolean> {
  try {
    console.log("Loading Gmail API...");
    await window.gapi.client.load('gmail', 'v1');
    console.log("Gmail API loaded successfully");
    return true;
  } catch (gmailError) {
    console.warn("Gmail API not loaded, email sending may use fallback:", gmailError);
    return false;
  }
}

/**
 * Load Sheets API after OAuth errors
 */
export async function loadSheetsApiAfterOAuthError(): Promise<boolean> {
  try {
    console.log("Loading Sheets API after OAuth error...");
    await window.gapi.client.load('sheets', 'v4');
    console.log("Sheets API loaded successfully after OAuth error");
    return true;
  } catch (sheetsError) {
    console.error("Failed to load Sheets API after OAuth error:", sheetsError);
    return false;
  }
}
