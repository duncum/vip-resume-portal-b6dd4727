
/**
 * Hybrid data provider that uses Supabase as primary and Google Sheets as backup
 */

import { 
  fetchCandidatesFromSupabase, 
  fetchCandidateByIdFromSupabase,
  upsertCandidateToSupabase,
  isSupabaseAvailable
} from './supabase';

import {
  fetchCandidates as fetchCandidatesFromSheets,
  fetchCandidateById as fetchCandidateByIdFromSheets,
  addCandidate as addCandidateToSheets,
  type Candidate
} from './sheets';

/**
 * Fetch all candidates using Supabase first, falling back to Google Sheets
 */
export const fetchCandidates = async (): Promise<Candidate[]> => {
  console.log('Fetching candidates from hybrid provider');
  
  // Try Supabase first
  if (isSupabaseAvailable()) {
    try {
      const supabaseData = await fetchCandidatesFromSupabase();
      
      // If we have data from Supabase, use it
      if (supabaseData && supabaseData.length > 0) {
        console.log(`Returning ${supabaseData.length} candidates from Supabase`);
        return supabaseData;
      }
    } catch (error) {
      console.error('Error fetching from Supabase:', error);
      // Continue to fallback
    }
  }
  
  // Fall back to Google Sheets - no mock data
  console.log('Falling back to Google Sheets for candidates');
  return fetchCandidatesFromSheets();
};

/**
 * Fetch a candidate by ID using Supabase first, falling back to Google Sheets
 */
export const fetchCandidateById = async (id: string): Promise<Candidate | null> => {
  console.log(`Fetching candidate ${id} from hybrid provider`);
  
  // Try Supabase first
  if (isSupabaseAvailable()) {
    const supabaseData = await fetchCandidateByIdFromSupabase(id);
    
    // If we have data from Supabase, use it
    if (supabaseData) {
      console.log(`Found candidate ${id} in Supabase`);
      return supabaseData;
    }
  }
  
  // Fall back to Google Sheets - no mock data
  console.log(`Falling back to Google Sheets for candidate ${id}`);
  return fetchCandidateByIdFromSheets(id);
};

/**
 * Add or update a candidate using Supabase first, with Google Sheets as backup
 */
export const addCandidate = async (candidate: Candidate): Promise<boolean> => {
  console.log(`Adding candidate ${candidate.id} to hybrid provider`);
  let supabaseSuccess = false;
  
  // Try to save to Supabase first
  if (isSupabaseAvailable()) {
    supabaseSuccess = await upsertCandidateToSupabase(candidate);
  }
  
  // Always try to save to Google Sheets as backup
  const sheetsSuccess = await addCandidateToSheets(candidate);
  
  // Return true if either operation succeeded
  return supabaseSuccess || sheetsSuccess;
};
