
import { toast } from "sonner";
import { Candidate } from '../types';
import { ensureAuthorization, resetAuthState, isOfflineModeAvailable } from '../auth-helper';
import { rowToCandidate } from '../data-mapper';
import { SPREADSHEET_ID, CANDIDATES_RANGE } from '../config';
import { mockCandidates } from '../mock-data';
import { getIsGapiInitialized } from '../../google/auth/initialize';
import { shouldThrottleRequest, getBackoffDelay } from './utils/rateLimiter';
import { 
  incrementFailures, 
  resetFailures, 
  hasTooManyFailures,
  getFailureCount 
} from './utils/failureTracker';
import { validateSheetsConfig } from './utils/sheetValidator';
import { ensureSheetsApiLoaded } from './utils/sheetsLoader';
import { handleSheetsError, handleNetworkError } from './utils/errorHandler';

// Track retry attempts
let retryCount = 0;
const MAX_RETRIES = 3;

// Cache for reducing API calls
let cachedCandidates: Candidate[] | null = null;
let lastCacheTime = 0;
const CACHE_DURATION = 60000; // 1 minute cache

/**
 * Fetch all candidates from Google Sheets API with robust error handling
 */
export const fetchCandidates = async (): Promise<Candidate[]> => {
  console.log("Starting fetchCandidates...");
  
  // Check cache first
  const now = Date.now();
  if (cachedCandidates && (now - lastCacheTime < CACHE_DURATION)) {
    console.log("Using cached candidates data");
    return cachedCandidates;
  }
  
  // Rate limit requests to prevent API abuse
  if (shouldThrottleRequest()) {
    console.log("Request throttled, using fallback data");
    return getCachedOrMockData();
  }
  
  // Validate configuration 
  const { isValid, errorMessage } = validateSheetsConfig();
  if (!isValid) {
    console.warn(`Configuration invalid: ${errorMessage}`);
    return getCachedOrMockData();
  }
  
  // Log critical configuration values
  const spreadsheetId = localStorage.getItem('google_spreadsheet_id') || SPREADSHEET_ID;
  console.log("API initialized according to state:", getIsGapiInitialized());
  console.log("Sheets API available:", !!window.gapi?.client?.sheets);
  
  // Check if we're offline
  if (!navigator.onLine) {
    console.log("Browser is offline, using offline data");
    
    if (isOfflineModeAvailable()) {
      toast.info("You're offline. Using previously cached data.", {
        duration: 3000
      });
    } else {
      toast.warning("You're offline. Using demo data until connection is restored.", {
        duration: 4000
      });
    }
    
    return getCachedOrMockData();
  }
  
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
    console.log("Not authorized, using fallback data for candidates");
    incrementFailures();
    
    // Only show toast if not too many failures (to prevent toast spam)
    if (getFailureCount() < 3) {
      toast.warning("Using demo data - check Google integration settings", {
        duration: 4000
      });
    }
    
    return getCachedOrMockData();
  }
  
  try {
    console.log("Authorized successfully, attempting to fetch candidates from Google Sheets");
    
    // Make sure we have a spreadsheet ID
    if (!spreadsheetId) {
      console.log("No spreadsheet ID found");
      toast.error("Spreadsheet ID missing. Please add it in Google settings.", {
        duration: 5000
      });
      return getCachedOrMockData();
    }
    
    // Ensure Sheets API is loaded
    const sheetsLoaded = await ensureSheetsApiLoaded();
    if (!sheetsLoaded) {
      incrementFailures();
      toast.error("Failed to load Google Sheets API - using fallback data instead", {
        duration: 5000
      });
      return getCachedOrMockData();
    }
    
    console.log("Making API request to Google Sheets with spreadsheet ID:", spreadsheetId);
    console.log("Range:", CANDIDATES_RANGE);
    
    // Implement retry with exponential backoff
    let response;
    let attemptCount = 0;
    let lastError;
    
    while (attemptCount <= MAX_RETRIES) {
      try {
        response = await window.gapi.client.sheets.spreadsheets.values.get({
          spreadsheetId: spreadsheetId,
          range: CANDIDATES_RANGE
        });
        break; // Success! Exit the retry loop
      } catch (error) {
        lastError = error;
        attemptCount++;
        
        if (attemptCount <= MAX_RETRIES) {
          // Wait with exponential backoff before retrying
          const delay = getBackoffDelay(attemptCount - 1);
          console.log(`API request failed, retrying (${attemptCount}/${MAX_RETRIES}) after ${delay}ms...`);
          await new Promise(resolve => setTimeout(resolve, delay));
        } else {
          console.error(`API request failed after ${MAX_RETRIES} retries`);
          throw error; // Rethrow to be caught by the outer catch block
        }
      }
    }
    
    if (!response) {
      throw lastError || new Error("Failed to get response from Google Sheets");
    }
    
    console.log("Response received from Google Sheets");
    const rows = response.result.values;
    
    if (!rows || rows.length === 0) {
      console.log("No data found in Google Sheet");
      toast.info("Your Google Sheet appears to be empty", {
        duration: 5000
      });
      return getCachedOrMockData(); // Return mock data if sheet is empty
    }
    
    // Convert rows to candidate objects
    console.log(`Found ${rows.length} candidates in the sheet`);
    const candidates = rows.map(row => {
      try {
        const candidate = rowToCandidate(row);
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
    
    // Update cache
    cachedCandidates = validCandidates;
    lastCacheTime = Date.now();
    
    // Also store in localStorage for offline fallback
    try {
      localStorage.setItem('cached_candidates', JSON.stringify(validCandidates));
      localStorage.setItem('cached_candidates_time', lastCacheTime.toString());
    } catch (cacheError) {
      console.warn("Failed to cache candidates in localStorage:", cacheError);
    }
    
    // Log success
    console.log(`Successfully converted ${validCandidates.length} candidates from ${rows.length} rows`);
    return validCandidates;
  } catch (error: any) {
    incrementFailures();
    
    // Check if it's a network error vs. a Google API error
    if (!navigator.onLine || error.message?.includes('network') || error.name === 'TypeError') {
      handleNetworkError(error);
    } else {
      handleSheetsError(error);
    }
    
    // If too many failures in a row, reset auth state
    if (hasTooManyFailures()) {
      resetAuthState();
      resetFailures();
    }
    
    return getCachedOrMockData(); // Fall back to cached or mock data on error
  }
};

/**
 * Helper to get cached data from localStorage or fall back to mock data
 */
function getCachedOrMockData(): Candidate[] {
  try {
    const cachedData = localStorage.getItem('cached_candidates');
    if (cachedData) {
      const cachedTimeStr = localStorage.getItem('cached_candidates_time');
      const cachedTime = cachedTimeStr ? parseInt(cachedTimeStr, 10) : 0;
      const age = Date.now() - cachedTime;
      
      // Check if cache is too old (over 1 day)
      if (age > 86400000) { // 24 hours
        console.log("Cached data is over 24 hours old");
        // Still return it but inform user
        if (navigator.onLine) {
          toast.info("Using older cached data while attempting to refresh", {
            duration: 3000
          });
        }
      } else {
        console.log("Using cached data from localStorage");
      }
      
      return JSON.parse(cachedData);
    }
  } catch (error) {
    console.error("Error retrieving cached data:", error);
  }
  
  console.log("No cached data available, using mock data");
  return mockCandidates;
}
