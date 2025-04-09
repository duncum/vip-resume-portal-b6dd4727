
/**
 * Main utility for fetching candidate data from Google Sheets
 */

import { toast } from "sonner";
import { Candidate } from '../types';
import { ensureAuthorization, resetAuthState, isOfflineModeAvailable } from '../auth-helper';
import { CANDIDATES_RANGE } from '../config';
import { getIsGapiInitialized } from '../../google/auth/initialize';
import { shouldThrottleRequest } from './utils/rateLimiter';
import { 
  incrementFailures, 
  resetFailures, 
  hasTooManyFailures,
  getFailureCount 
} from './utils/failureTracker';
import { validateSheetsConfig } from './utils/sheetValidator';
import { ensureSheetsApiLoaded } from './utils/sheetsLoader';
import { handleSheetsError, handleNetworkError } from './utils/errorHandler';
import { getCachedCandidates, getCachedFromStorage } from './utils/cacheManager';
import { isOnline, handleOfflineState } from './utils/networkStatus';
import { fetchSheetsData } from './utils/apiRequest';

/**
 * Fetch all candidates from Google Sheets API with robust error handling
 */
export const fetchCandidates = async (): Promise<Candidate[]> => {
  console.log("Starting fetchCandidates...");
  
  // Check cache first
  const cachedData = getCachedCandidates();
  if (cachedData) {
    return cachedData;
  }
  
  // Rate limit requests to prevent API abuse
  if (shouldThrottleRequest()) {
    console.log("Request throttled");
    const storedCandidates = getCachedFromStorage();
    if (storedCandidates) {
      return storedCandidates;
    }
    throw new Error("Rate limited and no cached data available");
  }
  
  // Validate configuration 
  const { isValid, errorMessage } = validateSheetsConfig();
  if (!isValid) {
    console.warn(`Configuration invalid: ${errorMessage}`);
    toast.error(`Google Sheets configuration error: ${errorMessage}`, {
      duration: 5000
    });
    throw new Error(errorMessage || "Invalid configuration");
  }
  
  // Log critical configuration values
  const spreadsheetId = localStorage.getItem('google_spreadsheet_id') || '';
  console.log("API initialized according to state:", getIsGapiInitialized());
  console.log("Sheets API available:", !!window.gapi?.client?.sheets);
  
  // Check if we're offline
  if (!isOnline()) {
    handleOfflineState();
    const storedCandidates = getCachedFromStorage();
    if (storedCandidates) {
      return storedCandidates;
    }
    throw new Error("You're offline and no cached data is available");
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
    console.log("Not authorized for Google Sheets");
    incrementFailures();
    
    // Only show toast if not too many failures (to prevent toast spam)
    if (getFailureCount() < 3) {
      toast.error("Google authorization failed. Please check your Google integration settings", {
        duration: 4000
      });
    }
    
    throw new Error("Not authorized for Google Sheets");
  }
  
  try {
    console.log("Authorized successfully, attempting to fetch candidates from Google Sheets");
    
    // Make sure we have a spreadsheet ID
    if (!spreadsheetId) {
      console.log("No spreadsheet ID found");
      toast.error("Spreadsheet ID missing. Please add it in Google settings.", {
        duration: 5000
      });
      throw new Error("Spreadsheet ID missing");
    }
    
    // Ensure Sheets API is loaded
    const sheetsLoaded = await ensureSheetsApiLoaded();
    if (!sheetsLoaded) {
      incrementFailures();
      toast.error("Failed to load Google Sheets API", {
        duration: 5000
      });
      throw new Error("Failed to load Google Sheets API");
    }
    
    // Fetch data from the API
    const candidates = await fetchSheetsData(spreadsheetId, CANDIDATES_RANGE);
    return candidates;
    
  } catch (error: any) {
    incrementFailures();
    
    // Check if it's a network error vs. a Google API error
    if (!isOnline() || error.message?.includes('network') || error.name === 'TypeError') {
      handleNetworkError(error);
    } else {
      handleSheetsError(error);
    }
    
    // If too many failures in a row, reset auth state
    if (hasTooManyFailures()) {
      resetAuthState();
      resetFailures();
    }
    
    // Try to use cached data if available
    const storedCandidates = getCachedFromStorage();
    if (storedCandidates) {
      console.log("Returning cached data after API error");
      return storedCandidates;
    }
    
    // No cached data, throw the error
    throw error;
  }
};
