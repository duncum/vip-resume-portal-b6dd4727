
/**
 * Utility for validating Google Sheets configuration
 */

import { toast } from "sonner";

/**
 * Validates if the necessary Google Sheets configuration is available
 * @returns {boolean} True if configuration is valid
 */
export const validateSheetsConfig = (): { isValid: boolean; errorMessage: string | null } => {
  // Check for necessary Google configuration
  const apiKey = localStorage.getItem('google_api_key');
  const spreadsheetId = localStorage.getItem('google_spreadsheet_id');
  
  console.log("Validating sheets config with API key:", !!apiKey);
  console.log("Validating sheets config with spreadsheet ID:", !!spreadsheetId);
  
  if (!apiKey) {
    return { 
      isValid: false, 
      errorMessage: "Google API key is missing" 
    };
  }
  
  if (!spreadsheetId) {
    return { 
      isValid: false, 
      errorMessage: "Google Spreadsheet ID is missing" 
    };
  }
  
  return { isValid: true, errorMessage: null };
};

/**
 * Detects if returned data is mock data
 * @param data Array of candidate data
 * @returns {boolean} True if the data appears to be mock data
 */
export const isMockData = (data: any[]): boolean => {
  // All mock data has predefined IDs 1-7
  return data.some(c => ["1", "2", "3", "4", "5", "6", "7"].includes(c.id));
};
