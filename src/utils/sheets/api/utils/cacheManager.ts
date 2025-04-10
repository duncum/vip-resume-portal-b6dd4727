/**
 * Utility for managing cached candidate data
 */

import { Candidate } from '../../types';

let cachedCandidates: Candidate[] | null = null;
const CACHE_EXPIRY = 15 * 60 * 1000; // 15 minutes
let cacheTimestamp = 0;

/**
 * Cache candidate data in memory
 */
export const cacheCandidates = (candidates: Candidate[]): void => {
  cachedCandidates = candidates;
  cacheTimestamp = Date.now();
  
  try {
    localStorage.setItem('cached_candidates', JSON.stringify(candidates));
    localStorage.setItem('cached_candidates_timestamp', cacheTimestamp.toString());
    console.log(`Cached ${candidates.length} candidates at ${new Date(cacheTimestamp).toISOString()}`);
  } catch (error) {
    console.error('Error caching candidates to localStorage:', error);
  }
};

/**
 * Get cached candidates from memory
 */
export const getCachedCandidates = (): Candidate[] | null => {
  // Check for in-memory cache first
  if (cachedCandidates && Date.now() - cacheTimestamp < CACHE_EXPIRY) {
    console.log('Using in-memory cached candidates');
    return cachedCandidates;
  }
  
  // Otherwise check localStorage
  return getCachedFromStorage();
};

/**
 * Get cached candidates from localStorage
 */
export const getCachedFromStorage = (): Candidate[] | null => {
  try {
    const cachedData = localStorage.getItem('cached_candidates');
    const cachedTimestampStr = localStorage.getItem('cached_candidates_timestamp');
    
    if (cachedData && cachedTimestampStr) {
      const cachedTime = parseInt(cachedTimestampStr, 10);
      
      // Check if cache is still valid
      if (Date.now() - cachedTime < CACHE_EXPIRY) {
        const candidates = JSON.parse(cachedData) as Candidate[];
        console.log(`Using ${candidates.length} cached candidates from localStorage`);
        return candidates;
      } else {
        console.log('Cached candidates expired');
      }
    }
  } catch (error) {
    console.error('Error retrieving cached candidates from localStorage:', error);
  }
  
  return null;
};

/**
 * Clear cached candidates
 */
export const clearCachedCandidates = (): void => {
  cachedCandidates = null;
  cacheTimestamp = 0;
  
  try {
    localStorage.removeItem('cached_candidates');
    localStorage.removeItem('cached_candidates_timestamp');
  } catch (error) {
    console.error('Error clearing cached candidates:', error);
  }
};
