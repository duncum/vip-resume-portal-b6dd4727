
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
  console.error("Error fetching data from Google Sheets:", error);
  
  // Extract detailed error information if available
  const errorDetails = error.result?.error?.message || error.message || String(error);
  console.log("Error details:", errorDetails);
  
  // Check for specific error types
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
  } else if (errorDetails.includes("Rate Limit Exceeded")) {
    toast.error("Google API rate limit exceeded. Please try again later.", {
      duration: 5000
    });
    return "API rate limit exceeded";
  } else if (errorDetails.includes("invalid_grant")) {
    toast.error("Authentication expired. Please sign in again.", {
      duration: 5000
    });
    return "Authentication expired";
  } else if (errorDetails.includes("The caller does not have permission")) {
    toast.error("Your account doesn't have permission to access this sheet", {
      duration: 6000
    });
    return "Permission denied for Google Sheet";
  } else if (errorDetails.includes("quota")) {
    toast.error("Google API quota exceeded. Please try again later.", {
      duration: 5000
    });
    return "API quota exceeded";
  } else {
    toast.error("Failed to load data from Google Sheets - using demo data instead", {
      duration: 5000
    });
    return "Failed to load data from Google Sheets";
  }
};

/**
 * Handle network/connectivity errors
 * @param error The error object
 * @returns Formatted error message
 */
export const handleNetworkError = (error: any): string => {
  console.error("Network error:", error);
  
  if (!navigator.onLine) {
    toast.error("You're offline. Please check your internet connection.", {
      duration: 5000
    });
    return "Network offline";
  }
  
  toast.error("Network error. Please check your connection and try again.", {
    duration: 5000
  });
  return "Network error";
};
