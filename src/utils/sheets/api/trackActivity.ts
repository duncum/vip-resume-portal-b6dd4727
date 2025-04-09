
import { toast } from "sonner";
import { ensureAuthorization } from '../auth-helper';
import { SPREADSHEET_ID } from '../config';
import { appendValues } from '../operations';
import { handleSheetsError } from './utils/errorHandler';

// Define tracking types
export type TrackingType = 'agreement' | 'view' | 'download' | 'print';

// Tracking queue for offline or error recovery
interface TrackedEvent {
  type: TrackingType;
  data: Record<string, any>;
  timestamp: string;
}

const trackingQueue: TrackedEvent[] = [];
let isProcessingQueue = false;
const QUEUE_KEY = 'tracking_queue';

// Initialize queue from localStorage
function initializeQueue() {
  try {
    const savedQueue = localStorage.getItem(QUEUE_KEY);
    if (savedQueue) {
      const parsed = JSON.parse(savedQueue);
      if (Array.isArray(parsed)) {
        trackingQueue.push(...parsed);
        console.log(`Restored ${parsed.length} tracking events from localStorage`);
      }
    }
  } catch (error) {
    console.error('Error loading tracking queue from localStorage:', error);
  }
}

// Save queue to localStorage
function saveQueue() {
  try {
    localStorage.setItem(QUEUE_KEY, JSON.stringify(trackingQueue));
  } catch (error) {
    console.error('Error saving tracking queue to localStorage:', error);
  }
}

// Initialize queue on module load
if (typeof window !== 'undefined') {
  initializeQueue();
}

/**
 * Records user activity to the Google Sheets spreadsheet with robust error handling
 * and offline support
 * 
 * @param trackingType Type of activity being tracked
 * @param data Object containing tracking data
 * @returns Promise that resolves to true if successfully queued, false otherwise
 */
export const recordActivity = async (
  trackingType: TrackingType,
  data: Record<string, any>
): Promise<boolean> => {
  try {
    // Get basic info that should be included in all tracked events
    const timestamp = new Date().toISOString();
    const userIp = await fetchClientIp();
    const userAgent = navigator.userAgent;
    
    // Queue the event
    trackingQueue.push({
      type: trackingType,
      data: { ...data, userIp, userAgent },
      timestamp
    });
    
    // Save updated queue to localStorage
    saveQueue();
    
    // Try to process the queue right away if online
    if (navigator.onLine) {
      processQueue().catch(error => {
        console.error('Error processing tracking queue:', error);
      });
    } else {
      console.log('Offline - event queued for later processing');
    }
    
    return true;
  } catch (error) {
    console.error(`Error queueing activity:`, error);
    return false;
  }
};

/**
 * Process the tracking queue in the background
 */
async function processQueue(): Promise<void> {
  // Prevent multiple simultaneous processing
  if (isProcessingQueue) {
    return;
  }
  
  isProcessingQueue = true;
  
  try {
    // Check if we have proper authorization
    const isAuthorized = await ensureAuthorization();
    if (!isAuthorized) {
      console.log("Not authorized to record tracking data");
      isProcessingQueue = false;
      return;
    }
    
    // Make sure we have a spreadsheet ID
    const spreadsheetId = localStorage.getItem('google_spreadsheet_id') || SPREADSHEET_ID;
    if (!spreadsheetId) {
      console.warn("No spreadsheet ID found, cannot record tracking data");
      isProcessingQueue = false;
      return;
    }
    
    // Process events in the queue
    while (trackingQueue.length > 0) {
      const event = trackingQueue[0];
      let success = false;
      
      try {
        switch (event.type) {
          case 'agreement':
            success = await recordAgreement(spreadsheetId, { 
              ...event.data,
              timestamp: event.timestamp
            });
            break;
          case 'view':
            success = await recordView(spreadsheetId, { 
              ...event.data,
              timestamp: event.timestamp
            });
            break;
          case 'download':
          case 'print':
            success = await recordDocumentAction(spreadsheetId, event.type, { 
              ...event.data,
              timestamp: event.timestamp
            });
            break;
        }
        
        if (success) {
          // Remove the processed event from queue
          trackingQueue.shift();
          // Update localStorage with the shorter queue
          saveQueue();
        } else {
          // Stop processing if an event fails
          break;
        }
      } catch (error) {
        console.error(`Error processing tracking event:`, error);
        break;
      }
    }
  } finally {
    isProcessingQueue = false;
  }
}

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
    handleSheetsError(error);
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
    handleSheetsError(error);
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
    handleSheetsError(error);
    return false;
  }
}

/**
 * Try to fetch the client's IP address
 * Note: This requires an external service for real IP tracking
 */
async function fetchClientIp(): Promise<string> {
  try {
    // Try multiple IP services for redundancy
    const ipServices = [
      'https://api.ipify.org?format=json',
      'https://ip.seeip.org/jsonip',
      'https://api.ip.sb/jsonip'
    ];
    
    // Try each service with a short timeout
    for (const service of ipServices) {
      try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 3000);
        
        const response = await fetch(service, { 
          signal: controller.signal 
        });
        clearTimeout(timeoutId);
        
        if (response.ok) {
          const data = await response.json();
          return data.ip || "unknown";
        }
      } catch (serviceError) {
        console.warn(`IP service ${service} failed:`, serviceError);
        // Continue to next service
      }
    }
    
    console.warn("All IP services failed, using fallback value");
    return "unknown";
  } catch (error) {
    console.error("Error fetching IP address:", error);
    return "unknown";
  }
}

// Set up auto-processing when coming back online
if (typeof window !== 'undefined') {
  window.addEventListener('online', () => {
    console.log('Network connection restored - processing tracking queue');
    processQueue().catch(error => {
      console.error('Error processing tracking queue after coming online:', error);
    });
  });
}

// Export additional functions for testing and debugging
export const _testExports = {
  trackingQueue,
  processQueue
};
