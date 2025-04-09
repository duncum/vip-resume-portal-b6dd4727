
/**
 * Utility for handling API errors
 */

import { toast } from "sonner";

/**
 * Handles and formats Google Sheets API errors
 * @param error The error object from the API call
 * @returns Formatted error message
 */
export const handleSheetsError = (error: any): string => {
  console.error("Error fetching candidates from Google Sheets:", error);
  console.log("Error details:", JSON.stringify(error, null, 2));
  
  // More detailed error message based on the error type
  if (error.result?.error?.status === "PERMISSION_DENIED") {
    toast.error("Permission denied - make sure your sheet is shared publicly or with the service account", {
      duration: 6000
    });
    return "Permission denied for Google Sheet";
  } else if (error.result?.error?.status === "NOT_FOUND") {
    toast.error("Spreadsheet not found - check your Spreadsheet ID", {
      duration: 5000
    });
    return "Spreadsheet not found";
  } else {
    toast.error("Failed to load data from Google Sheets - using demo data instead", {
      duration: 5000
    });
    return "Failed to load data from Google Sheets";
  }
};
