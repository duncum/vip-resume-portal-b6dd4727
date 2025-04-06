
/**
 * Utility functions for interacting with Google Sheets
 */

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
 * Update specific cells in a Google Sheet
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
  try {
    // Check if Google API is available
    if (!window.gapi || !window.gapi.client || !window.gapi.client.sheets) {
      console.warn("Google Sheets API not available");
      return false;
    }
    
    // Update the cells
    await window.gapi.client.sheets.spreadsheets.values.update({
      spreadsheetId,
      range,
      valueInputOption: "USER_ENTERED",
      resource: {
        values
      }
    });
    
    return true;
  } catch (error) {
    console.error(`Error updating cells in Google Sheets:`, error);
    return false;
  }
};

/**
 * Append values to a Google Sheet
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
      insertDataOption: "OVERWRITE",
      resource: {
        values
      }
    });
    
    return true;
  } catch (error) {
    console.error(`Error appending values to Google Sheets:`, error);
    return false;
  }
};
