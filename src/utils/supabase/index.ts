
/**
 * Main entry point for Supabase utilities
 */

// Export configuration
export { supabase, isSupabaseAvailable } from './config';

// Export operations
export { 
  fetchCandidatesFromSupabase, 
  fetchCandidateByIdFromSupabase,
  upsertCandidateToSupabase,
  deleteCandidateFromSupabase
} from './candidates';

// Export sync utilities
export { 
  importFromSheets, 
  exportToSheets 
} from './syncWithSheets';

// Re-export types
export type { Candidate } from '../sheets/types';
