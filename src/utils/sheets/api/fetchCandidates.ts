
/**
 * Main utility for fetching candidate data from Google Sheets
 */

import { toast } from "sonner";
import { Candidate } from '../types';
import { ensureAuthorization, resetAuthState, isOfflineModeAvailable } from '../auth-helper';
import { CANDIDATES_RANGE } from '../config';
import { mockCandidates } from '../mock-data';
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
import { getCachedCandidates, getCachedOrMockData } from './utils/cacheManager';
import { isOnline, handleOfflineState } from './utils/networkStatus';
import { fetchSheetsData, isMockData } from './utils/apiRequest';

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
    console.log("Request throttled, using fallback data");
    return getCachedOrMockData(() => mockCandidates);
  }
  
  // Validate configuration 
  const { isValid, errorMessage } = validateSheetsConfig();
  if (!isValid) {
    console.warn(`Configuration invalid: ${errorMessage}`);
    return getCachedOrMockData(() => mockCandidates);
  }
  
  // Log critical configuration values
  const spreadsheetId = localStorage.getItem('google_spreadsheet_id') || '';
  console.log("API initialized according to state:", getIsGapiInitialized());
  console.log("Sheets API available:", !!window.gapi?.client?.sheets);
  
  // Check if we're offline
  if (!isOnline()) {
    handleOfflineState();
    return getCachedOrMockData(() => mockCandidates);
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
    
    return getCachedOrMockData(() => mockCandidates);
  }
  
  try {
    console.log("Authorized successfully, attempting to fetch candidates from Google Sheets");
    
    // Make sure we have a spreadsheet ID
    if (!spreadsheetId) {
      console.log("No spreadsheet ID found");
      toast.error("Spreadsheet ID missing. Please add it in Google settings.", {
        duration: 5000
      });
      return getCachedOrMockData(() => mockCandidates);
    }
    
    // Ensure Sheets API is loaded
    const sheetsLoaded = await ensureSheetsApiLoaded();
    if (!sheetsLoaded) {
      incrementFailures();
      toast.error("Failed to load Google Sheets API - using fallback data instead", {
        duration: 5000
      });
      return getCachedOrMockData(() => mockCandidates);
    }
    
    // Fetch data from the API
    const candidates = await fetchSheetsData(spreadsheetId, CANDIDATES_RANGE);
    
    // Check if it's mock data 
    const usingMockData = isMockData(candidates);
    if (usingMockData) {
      console.log("Using mock data - check Google configuration");
      if (!localStorage.getItem('google_api_key')) {
        incrementFailures();
        return getCachedOrMockData(() => mockCandidates);
      }
    }
    
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
    
    return getCachedOrMockData(() => mockCandidates); // Fall back to cached or mock data on error
  }
};
