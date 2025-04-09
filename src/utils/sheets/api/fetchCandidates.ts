
import { toast } from "sonner";
import { Candidate } from '../types';
import { ensureAuthorization, resetAuthState } from '../auth-helper';
import { rowToCandidate } from '../data-mapper';
import { SPREADSHEET_ID, CANDIDATES_RANGE } from '../config';
import { mockCandidates } from '../mock-data';
import { getIsGapiInitialized } from '../../google/auth/initialize';

// Track repeated failures to prevent constant error messages
let consecutiveFailures = 0;
const MAX_FAILURES_BEFORE_RESET = 3;

// Track last attempt time for rate limiting
let lastAttemptTime = 0;
const MIN_ATTEMPT_INTERVAL = 2000; // 2 seconds

/**
 * Fetch all candidates from Google Sheets API
 */
export const fetchCandidates = async (): Promise<Candidate[]> => {
  // Check if we have proper authorization
  console.log("Starting fetchCandidates...");
  
  // Rate limit requests to prevent API abuse
  const now = Date.now();
  if (now - lastAttemptTime < MIN_ATTEMPT_INTERVAL) {
    console.log(`Request too frequent, throttling. Last attempt was ${now - lastAttemptTime}ms ago`);
    // Don't increment failures for throttled requests
    return mockCandidates;
  }
  lastAttemptTime = now;
  
  // Log critical configuration values
  const apiKey = localStorage.getItem('google_api_key');
  const spreadsheetId = localStorage.getItem('google_spreadsheet_id') || SPREADSHEET_ID;
  
  console.log("API Key exists:", !!apiKey);
  console.log("Spreadsheet ID:", spreadsheetId);
  console.log("API initialized according to state:", getIsGapiInitialized());
  console.log("Sheets API available:", !!window.gapi?.client?.sheets);
  
  // If we have too many consecutive failures, reset the auth state
  if (consecutiveFailures >= MAX_FAILURES_BEFORE_RESET) {
    console.log("Too many consecutive failures, resetting auth state");
    resetAuthState();
    consecutiveFailures = 0;
  }
  
  // Clear previous authorization state if API is not available
  if (!window.gapi?.client?.sheets && getIsGapiInitialized()) {
    console.log("API was marked as initialized but Sheets API is unavailable - resetting state");
    resetAuthState();
  }
  
  const isAuthorized = await ensureAuthorization();
  console.log("Authorization check result:", isAuthorized);
  
  if (!isAuthorized) {
    console.log("Not authorized, using mock data for candidates");
    consecutiveFailures++;
    
    // Only show toast if not too many failures (to prevent toast spam)
    if (consecutiveFailures < 3) {
      toast.warning("Using demo data - check Google integration settings", {
        duration: 4000
      });
    }
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 300));
    return mockCandidates;
  }
  
  try {
    console.log("Authorized successfully, attempting to fetch candidates from Google Sheets");
    
    // Make sure we have a spreadsheet ID
    if (!spreadsheetId) {
      console.log("No spreadsheet ID found");
      toast.error("Spreadsheet ID missing. Please add it in Google settings.", {
        duration: 5000
      });
      return mockCandidates;
    }
    
    // Check if the Sheets API is available
    if (!window.gapi?.client?.sheets) {
      console.error("Sheets API not available. Trying to load it now.");
      
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
      } catch (error) {
        console.error("Failed to load Sheets API:", error);
        consecutiveFailures++;
        toast.error("Failed to load Google Sheets API - using demo data instead", {
          duration: 5000
        });
        return mockCandidates;
      }
    }
    
    // Double-check if the API is now available
    if (!window.gapi?.client?.sheets) {
      console.error("Sheets API still not available after loading attempt");
      consecutiveFailures++;
      toast.error("Google Sheets API unavailable - using demo data", {
        duration: 5000
      });
      return mockCandidates;
    }
    
    console.log("Making API request to Google Sheets with spreadsheet ID:", spreadsheetId);
    console.log("Range:", CANDIDATES_RANGE);
    
    const response = await window.gapi.client.sheets.spreadsheets.values.get({
      spreadsheetId: spreadsheetId,
      range: CANDIDATES_RANGE
    });
    
    console.log("Response received from Google Sheets");
    const rows = response.result.values;
    
    if (!rows || rows.length === 0) {
      console.log("No data found in Google Sheet");
      toast.info("Your Google Sheet appears to be empty", {
        duration: 5000
      });
      return mockCandidates; // Return mock data if sheet is empty
    }
    
    // Convert rows to candidate objects
    console.log(`Found ${rows.length} candidates in the sheet`);
    const candidates = rows.map(row => {
      try {
        return rowToCandidate(row);
      } catch (error) {
        console.error("Error parsing row:", row, error);
        // Return a minimal valid candidate to prevent crashes
        return {
          id: "error",
          headline: "Error parsing data",
          sectors: [],
          tags: [],
          category: "Error"
        } as Candidate;
      }
    });
    
    // Filter out error entries
    const validCandidates = candidates.filter(c => c.id !== "error");
    
    // Reset failure counter on success
    consecutiveFailures = 0;
    
    // Log success
    console.log(`Successfully converted ${validCandidates.length} candidates from ${rows.length} rows`);
    
    return validCandidates;
  } catch (error: any) {
    console.error("Error fetching candidates from Google Sheets:", error);
    console.log("Error details:", JSON.stringify(error, null, 2));
    consecutiveFailures++;
    
    // More detailed error message based on the error type
    if (error.result?.error?.status === "PERMISSION_DENIED") {
      toast.error("Permission denied - make sure your sheet is shared publicly or with the service account", {
        duration: 6000
      });
    } else if (error.result?.error?.status === "NOT_FOUND") {
      toast.error("Spreadsheet not found - check your Spreadsheet ID", {
        duration: 5000
      });
    } else {
      toast.error("Failed to load data from Google Sheets - using demo data instead", {
        duration: 5000
      });
    }
    
    // If too many failures in a row, reset auth state
    if (consecutiveFailures >= MAX_FAILURES_BEFORE_RESET) {
      resetAuthState();
      consecutiveFailures = 0;
    }
    
    return mockCandidates; // Fall back to mock data on error
  }
};
