
/**
 * Utility for managing candidate data caching
 */

import { Candidate } from '../../types';

// Cache configuration
const CACHE_DURATION = 60000; // 1 minute cache

// Cache state
let cachedCandidates: Candidate[] | null = null;
let lastCacheTime = 0;

/**
 * Check if the cache is valid
 * @returns {boolean} True if the cache is valid and can be used
 */
export const isCacheValid = (): boolean => {
  const now = Date.now();
  return !!(cachedCandidates && (now - lastCacheTime < CACHE_DURATION));
};

/**
 * Get candidates from cache
 * @returns {Candidate[] | null} Cached candidates or null if cache is invalid
 */
export const getCachedCandidates = (): Candidate[] | null => {
  if (!isCacheValid()) return null;
  console.log("Using cached candidates data");
  return cachedCandidates;
};

/**
 * Update the candidates cache
 * @param {Candidate[]} candidates The candidates to cache
 */
export const updateCache = (candidates: Candidate[]): void => {
  cachedCandidates = candidates;
  lastCacheTime = Date.now();
  
  // Also store in localStorage for offline fallback
  try {
    localStorage.setItem('cached_candidates', JSON.stringify(candidates));
    localStorage.setItem('cached_candidates_time', lastCacheTime.toString());
  } catch (cacheError) {
    console.warn("Failed to cache candidates in localStorage:", cacheError);
  }
};

/**
 * Get candidates from localStorage or fall back to mock data
 * @param {Function} getMockData Function to get mock data if no cache exists
 * @returns {Candidate[]} Candidates from localStorage or mock data
 */
export const getCachedOrMockData = (getMockData: () => Candidate[]): Candidate[] => {
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
          import('sonner').then(({ toast }) => {
            toast.info("Using older cached data while attempting to refresh", {
              duration: 3000
            });
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
  return getMockData();
};
