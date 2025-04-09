
/**
 * Supabase operations for Candidates
 */

import { supabase, isSupabaseAvailable, handleSupabaseError } from './config'
import type { Candidate } from '../sheets/types'
import { recordActivity } from '../sheets/api/trackActivity'

// Table name in Supabase
const CANDIDATES_TABLE = 'candidates'

/**
 * Map database record to Candidate type
 */
const mapDbRecordToCandidate = (record: any): Candidate => {
  return {
    id: record.id,
    headline: record.headline || '',
    sectors: record.sectors || [],
    tags: record.tags || [],
    resumeUrl: record.resumeurl || '', // Map resumeurl (DB) -> resumeUrl (app)
    category: record.category || '',
    title: record.title || '',
    summary: record.summary || '',
    location: record.location || '',
    relocationPreference: record.relocationpreference || '',
    notableEmployers: record.notableemployers || '',
    // Map any other fields as needed
  };
};

/**
 * Map Candidate to database record format
 */
const mapCandidateToDbRecord = (candidate: Candidate): any => {
  return {
    id: candidate.id,
    headline: candidate.headline,
    sectors: candidate.sectors,
    tags: candidate.tags,
    resumeurl: candidate.resumeUrl, // Map resumeUrl (app) -> resumeurl (DB)
    category: candidate.category,
    title: candidate.title,
    summary: candidate.summary,
    location: candidate.location,
    relocationpreference: candidate.relocationPreference,
    notableemployers: candidate.notableEmployers,
    // Map any other fields as needed
  };
};

/**
 * Fetch all candidates from Supabase
 */
export const fetchCandidatesFromSupabase = async (): Promise<Candidate[]> => {
  if (!isSupabaseAvailable()) return []

  try {
    const { data, error } = await supabase
      .from(CANDIDATES_TABLE)
      .select('*')
      .order('id')
    
    if (error) throw error
    
    // Map database records to Candidate type
    return data ? data.map(record => mapDbRecordToCandidate(record)) : [];
  } catch (error) {
    handleSupabaseError(error, 'fetching candidates')
    return []
  }
}

/**
 * Fetch a candidate by ID from Supabase
 */
export const fetchCandidateByIdFromSupabase = async (id: string): Promise<Candidate | null> => {
  if (!isSupabaseAvailable()) return null

  try {
    const { data, error } = await supabase
      .from(CANDIDATES_TABLE)
      .select('*')
      .eq('id', id)
      .single()
    
    if (error) throw error
    
    // Record the view in tracking
    const userId = localStorage.getItem('user_id') || 'anonymous';
    recordActivity('view', {
      candidateId: id,
      action: 'fetch',
      source: 'supabase',
      userId
    });
    
    // Map database record to Candidate type
    return data ? mapDbRecordToCandidate(data) : null;
  } catch (error) {
    handleSupabaseError(error, `fetching candidate ${id}`)
    return null
  }
}

/**
 * Add or update a candidate in Supabase
 */
export const upsertCandidateToSupabase = async (candidate: Candidate): Promise<boolean> => {
  if (!isSupabaseAvailable()) return false

  try {
    // Ensure the candidate has an ID
    if (!candidate.id) {
      throw new Error('Candidate must have an ID')
    }
    
    // Convert Candidate to DB format
    const dbRecord = mapCandidateToDbRecord(candidate);
    
    // Add timestamp for tracking
    dbRecord.updated_at = new Date().toISOString();
    
    const { error } = await supabase
      .from(CANDIDATES_TABLE)
      .upsert(dbRecord, { 
        onConflict: 'id',
        ignoreDuplicates: false 
      })
    
    if (error) throw error
    
    // Get user ID if available
    const userId = localStorage.getItem('user_id') || 'anonymous';
    
    // Record the activity in Google Sheets (as backup)
    // Using 'view' as TrackingType and adding data object with additional info
    recordActivity('view', {
      candidateId: candidate.id,
      action: 'saved',
      source: 'supabase',
      userId
    })
    
    return true
  } catch (error) {
    handleSupabaseError(error, `saving candidate ${candidate.id}`)
    return false
  }
}

/**
 * Delete a candidate from Supabase
 */
export const deleteCandidateFromSupabase = async (id: string): Promise<boolean> => {
  if (!isSupabaseAvailable()) return false

  try {
    const { error } = await supabase
      .from(CANDIDATES_TABLE)
      .delete()
      .eq('id', id)
    
    if (error) throw error
    
    // Get user ID if available
    const userId = localStorage.getItem('user_id') || 'anonymous';
    
    // Record the activity in Google Sheets (as backup)
    // Using 'view' as TrackingType and adding data object with additional info
    recordActivity('view', {
      candidateId: id,
      action: 'deleted',
      source: 'supabase',
      userId
    })
    
    return true
  } catch (error) {
    handleSupabaseError(error, `deleting candidate ${id}`)
    return false
  }
}
