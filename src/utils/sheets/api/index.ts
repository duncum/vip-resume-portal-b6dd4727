
// Re-export all API functions
export { fetchCandidates } from './fetchCandidates';
export { fetchCandidateById } from './fetchCandidateById';
export { addCandidate } from './addCandidate';
export { recordActivity } from './trackActivity';

// Export utility functions that may be needed elsewhere
export { getCachedOrMockData } from './utils/cacheManager';
export { isOnline } from './utils/networkStatus';
