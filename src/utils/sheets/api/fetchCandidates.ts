
import { toast } from "sonner";
import { Candidate } from '../types';
import { ensureAuthorization, resetAuthState } from '../auth-helper';
import { rowToCandidate } from '../data-mapper';
import { SPREADSHEET_ID, CANDIDATES_RANGE } from '../config';
import { mockCandidates } from '../mock-data';
import { getIsGapiInitialized } from '../../google/auth/initialize';
import { shouldThrottleRequest } from './utils/rateLimiter';
import { 
  incrementFailures, 
  resetFailures, 
  hasTooManyFailures,
  getFailureCount 
} from './utils/failureTracker';
import { validateSheetsConfig, isMockData } from './utils/sheetValidator';
import { ensureSheetsApiLoaded } from './utils/sheetsLoader';
import { handleSheetsError } from './utils/errorHandler';

// Track retry attempts
let retryCount = 0;
const MAX_RETRIES = 3;

/**
 * Fetch all candidates from Google Sheets API
 */
export const fetchCandidates = async (): Promise<Candidate[]> => {
  // Check if we have proper authorization
  console.log("Starting fetchCandidates...");
  
  // Rate limit requests to prevent API abuse
  if (shouldThrottleRequest()) {
    // Don't increment failures for throttled requests
    return mockCandidates;
  }
  
  // Validate configuration 
  const { isValid, errorMessage } = validateSheetsConfig();
  if (!errorMessage) {
    console.log("Configuration is valid, proceeding with request");
  }
  
  // Log critical configuration values
  const spreadsheetId = localStorage.getItem('google_spreadsheet_id') || SPREADSHEET_ID;
  console.log("API initialized according to state:", getIsGapiInitialized());
  console.log("Sheets API available:", !!window.gapi?.client?.sheets);
  
  // If we have too many consecutive failures, reset the auth state
  if (hasTooManyFailures()) {
    console.log("Too many consecutive failures, resetting auth state");
    resetAuthState();
    resetFailures();
  }
  
  // Clear previous authorization state if API is not available
  if (!window.gapi?.client?.sheets && getIsGapiInitialized()) {
    console.log("API was marked as initialized but Sheets API is unavailable - resetting state");
    resetAuthState();
  }
  
  // Attempt to ensure authorization
  const isAuthorized = await ensureAuthorization();
  console.log("Authorization check result:", isAuthorized);
  
  if (!isAuthorized) {
    console.log("Not authorized, using mock data for candidates");
    incrementFailures();
    
    // Only show toast if not too many failures (to prevent toast spam)
    if (getFailureCount() < 3) {
      toast.warning("Using demo data - check Google integration settings", {
        duration: 4000
      });
    }
    
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
    
    // Ensure Sheets API is loaded
    const sheetsLoaded = await ensureSheetsApiLoaded();
    if (!sheetsLoaded) {
      incrementFailures();
      toast.error("Failed to load Google Sheets API - using demo data instead", {
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
        const candidate = rowToCandidate(row);
        console.log(`Parsed candidate: ID=${candidate.id}, Category=${candidate.category}`);
        return candidate;
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
    resetFailures();
    
    // Log success
    console.log(`Successfully converted ${validCandidates.length} candidates from ${rows.length} rows`);
    return validCandidates;
  } catch (error: any) {
    const errorMessage = handleSheetsError(error);
    incrementFailures();
    
    // If too many failures in a row, reset auth state
    if (hasTooManyFailures()) {
      resetAuthState();
      resetFailures();
    }
    
    return mockCandidates; // Fall back to mock data on error
  }
};
