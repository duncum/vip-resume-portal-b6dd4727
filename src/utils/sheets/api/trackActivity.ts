
import { toast } from "sonner";
import { ensureAuthorization } from '../auth-helper';
import { SPREADSHEET_ID } from '../config';
import { appendValues } from '../operations';

// Define tracking types
export type TrackingType = 'agreement' | 'view' | 'download' | 'print';

/**
 * Records user activity to the Google Sheets spreadsheet
 * 
 * @param trackingType Type of activity being tracked
 * @param data Object containing tracking data
 * @returns Promise that resolves to true if successful, false otherwise
 */
export const recordActivity = async (
  trackingType: TrackingType,
  data: Record<string, any>
): Promise<boolean> => {
  try {
    // Check if we have proper authorization
    const isAuthorized = await ensureAuthorization();
    if (!isAuthorized) {
      console.log("Not authorized to record tracking data");
      return false;
    }

    // Make sure we have a spreadsheet ID
    const spreadsheetId = localStorage.getItem('google_spreadsheet_id') || SPREADSHEET_ID;
    if (!spreadsheetId) {
      console.warn("No spreadsheet ID found, cannot record tracking data");
      return false;
    }

    // Get basic info that should be included in all tracked events
    const timestamp = new Date().toISOString();
    const userIp = await fetchClientIp();
    const userAgent = navigator.userAgent;
    
    // Handle different tracking types
    switch (trackingType) {
      case 'agreement':
        return recordAgreement(spreadsheetId, { ...data, timestamp, userIp, userAgent });
      case 'view':
        return recordView(spreadsheetId, { ...data, timestamp, userIp, userAgent });
      case 'download':
      case 'print':
        return recordDocumentAction(spreadsheetId, trackingType, { ...data, timestamp, userIp, userAgent });
      default:
        console.warn(`Unknown tracking type: ${trackingType}`);
        return false;
    }
  } catch (error) {
    console.error(`Error recording activity to Google Sheets:`, error);
    return false;
  }
};

/**
 * Record a user agreement to the Terms sheet
 */
async function recordAgreement(
  spreadsheetId: string,
  data: Record<string, any>
): Promise<boolean> {
  try {
    // Define the range for the Terms sheet
    const range = "Terms!A:Z";
    
    // Format the data for Google Sheets
    const values = [
      [
        data.timestamp,
        data.name,
        data.userIp,
        data.userAgent,
        "Agreement Accepted",
        window.location.origin
      ]
    ];
    
    // Append the agreement data to the sheet
    console.log("Recording agreement data to Google Sheets:", values[0]);
    return await appendValues(spreadsheetId, range, values);
  } catch (error) {
    console.error("Error recording agreement to Google Sheets:", error);
    return false;
  }
}

/**
 * Record a candidate view to the Analytics sheet
 */
async function recordView(
  spreadsheetId: string,
  data: Record<string, any>
): Promise<boolean> {
  try {
    // Define the range for the Analytics sheet
    const range = "Analytics!A:Z";
    
    // Format the data for Google Sheets
    const values = [
      [
        data.timestamp,
        data.candidateId,
        data.userIp,
        data.userAgent,
        "View",
        window.location.href
      ]
    ];
    
    // Append the view data to the sheet
    console.log("Recording view data to Google Sheets:", values[0]);
    return await appendValues(spreadsheetId, range, values);
  } catch (error) {
    console.error("Error recording view to Google Sheets:", error);
    return false;
  }
}

/**
 * Record a document action (download, print) to the Analytics sheet
 */
async function recordDocumentAction(
  spreadsheetId: string,
  action: 'download' | 'print',
  data: Record<string, any>
): Promise<boolean> {
  try {
    // Define the range for the Analytics sheet
    const range = "Analytics!A:Z";
    
    // Format the data for Google Sheets
    const values = [
      [
        data.timestamp,
        data.candidateId,
        data.userIp,
        data.userAgent,
        action.charAt(0).toUpperCase() + action.slice(1), // Capitalize action
        window.location.href
      ]
    ];
    
    // Append the action data to the sheet
    console.log(`Recording ${action} data to Google Sheets:`, values[0]);
    return await appendValues(spreadsheetId, range, values);
  } catch (error) {
    console.error(`Error recording ${action} to Google Sheets:`, error);
    return false;
  }
}

/**
 * Try to fetch the client's IP address
 * Note: This requires an external service for real IP tracking
 */
async function fetchClientIp(): Promise<string> {
  try {
    // In a production environment, you'd ideally use a server-side solution
    // For this demo, we'll use a free IP API service
    const response = await fetch('https://api.ipify.org?format=json');
    const data = await response.json();
    return data.ip;
  } catch (error) {
    console.error("Error fetching IP address:", error);
    return "unknown";
  }
}
