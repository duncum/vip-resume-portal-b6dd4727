
/**
 * Utility functions for interacting with Google Sheets
 */

import { handleSheetsError } from './api/utils/errorHandler';

// Maximum number of retries for operations
const MAX_RETRIES = 3;

/**
 * Find a row index in a sheet by searching for a value in a specific column
 * 
 * @param spreadsheetId The ID of the spreadsheet
 * @param sheet The name of the sheet (e.g., "Candidates")
 * @param searchColumn The column range to search in (e.g., "A:A")
 * @param searchValue The value to search for
 * @returns The row index (1-indexed as per Google Sheets API) or -1 if not found
 */
export const findRowByValue = async (
  spreadsheetId: string,
  sheet: string,
  searchColumn: string,
  searchValue: string
): Promise<number> => {
  try {
    // Check if Google API is available
    if (!window.gapi || !window.gapi.client || !window.gapi.client.sheets) {
      console.warn("Google Sheets API not available");
      return -1;
    }
    
    // Get the values from the search column
    const response = await window.gapi.client.sheets.spreadsheets.values.get({
      spreadsheetId,
      range: `${sheet}!${searchColumn}`, // e.g., "Candidates!A:A"
    });
    
    const values = response.result.values || [];
    
    // Find the row with the matching value
    for (let i = 0; i < values.length; i++) {
      if (values[i][0] === searchValue) {
        return i + 1; // Sheets rows are 1-indexed
      }
    }
    
    return -1; // Not found
  } catch (error) {
    console.error(`Error finding row by value in Google Sheets:`, error);
    return -1;
  }
};

/**
 * Update specific cells in a Google Sheet with retry mechanism
 * 
 * @param spreadsheetId The ID of the spreadsheet
 * @param range The range to update (e.g., "Candidates!P5:Q5")
 * @param values The values to write
 * @returns True if successful, false otherwise
 */
export const updateCells = async (
  spreadsheetId: string,
  range: string,
  values: any[][]
): Promise<boolean> => {
  let attempts = 0;
  
  while (attempts < MAX_RETRIES) {
    try {
      // Check if Google API is available
      if (!window.gapi || !window.gapi.client || !window.gapi.client.sheets) {
        console.warn("Google Sheets API not available");
        return false;
      }
      
      // Update the cells using the correct method
      await window.gapi.client.request({
        path: `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${range}`,
        method: 'PUT',
        params: {
          valueInputOption: 'USER_ENTERED'
        },
        body: {
          values
        }
      });
      
      return true;
    } catch (error) {
      attempts++;
      
      if (attempts < MAX_RETRIES) {
        // Exponential backoff delay before retry
        const delay = Math.pow(2, attempts) * 500; // 1s, 2s, 4s
        console.log(`Update cells attempt ${attempts} failed, retrying in ${delay}ms...`);
        await new Promise(resolve => setTimeout(resolve, delay));
      } else {
        console.error(`Error updating cells in Google Sheets after ${MAX_RETRIES} attempts:`, error);
        handleSheetsError(error);
        return false;
      }
    }
  }
  
  return false;
};

/**
 * Append values to a Google Sheet with retry mechanism
 * 
 * @param spreadsheetId The ID of the spreadsheet
 * @param range The range to append to (e.g., "Candidates!A:Z")
 * @param values The values to append
 * @returns True if successful, false otherwise
 */
export const appendValues = async (
  spreadsheetId: string,
  range: string,
  values: any[][]
): Promise<boolean> => {
  let attempts = 0;
  
  while (attempts < MAX_RETRIES) {
    try {
      // Check if Google API is available
      if (!window.gapi || !window.gapi.client || !window.gapi.client.sheets) {
        console.warn("Google Sheets API not available");
        return false;
      }
      
      // Append the values
      await window.gapi.client.sheets.spreadsheets.values.append({
        spreadsheetId,
        range,
        valueInputOption: "USER_ENTERED",
        insertDataOption: "INSERT_ROWS",
        resource: {
          values
        }
      });
      
      return true;
    } catch (error) {
      attempts++;
      
      if (attempts < MAX_RETRIES) {
        // Exponential backoff delay before retry
        const delay = Math.pow(2, attempts) * 500; // 1s, 2s, 4s
        console.log(`Append values attempt ${attempts} failed, retrying in ${delay}ms...`);
        await new Promise(resolve => setTimeout(resolve, delay));
      } else {
        console.error(`Error appending values to Google Sheets after ${MAX_RETRIES} attempts:`, error);
        handleSheetsError(error);
        return false;
      }
    }
  }
  
  return false;
};

/**
 * Check if a sheet exists in a spreadsheet
 * 
 * @param spreadsheetId The ID of the spreadsheet
 * @param sheetName The name of the sheet to check
 * @returns True if the sheet exists, false otherwise
 */
export const checkSheetExists = async (
  spreadsheetId: string,
  sheetName: string
): Promise<boolean> => {
  try {
    // Check if Google API is available
    if (!window.gapi || !window.gapi.client || !window.gapi.client.sheets) {
      console.warn("Google Sheets API not available");
      return false;
    }
    
    // Get the spreadsheet metadata
    const response = await window.gapi.client.request({
      path: `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}`,
      method: 'GET'
    });
    
    // Check if the sheet exists
    const sheets = response.result.sheets || [];
    return sheets.some(sheet => sheet.properties?.title === sheetName);
  } catch (error) {
    console.error(`Error checking if sheet exists:`, error);
    return false;
  }
};

/**
 * Create a new sheet in a spreadsheet
 * 
 * @param spreadsheetId The ID of the spreadsheet
 * @param sheetName The name of the new sheet
 * @returns True if successful, false otherwise
 */
export const createSheet = async (
  spreadsheetId: string,
  sheetName: string
): Promise<boolean> => {
  try {
    // Check if Google API is available
    if (!window.gapi || !window.gapi.client || !window.gapi.client.sheets) {
      console.warn("Google Sheets API not available");
      return false;
    }
    
    // Create the sheet using the request method instead
    await window.gapi.client.request({
      path: `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}:batchUpdate`,
      method: 'POST',
      body: {
        requests: [
          {
            addSheet: {
              properties: {
                title: sheetName
              }
            }
          }
        ]
      }
    });
    
    return true;
  } catch (error) {
    console.error(`Error creating sheet:`, error);
    handleSheetsError(error);
    return false;
  }
};
