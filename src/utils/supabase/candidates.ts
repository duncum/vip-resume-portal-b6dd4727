
/**
 * Supabase operations for Candidates
 */

import { supabase, isSupabaseAvailable, handleSupabaseError } from './config'
import type { Candidate } from '../sheets/types'
import { recordActivity } from '../sheets/api/trackActivity'

// Table name in Supabase
const CANDIDATES_TABLE = 'candidates'

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
    
    return data as Candidate[]
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
    
    return data as Candidate
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
    
    // Add timestamp for tracking
    const candidateWithTimestamp = {
      ...candidate,
      updated_at: new Date().toISOString()
    }
    
    const { error } = await supabase
      .from(CANDIDATES_TABLE)
      .upsert(candidateWithTimestamp, { 
        onConflict: 'id',
        ignoreDuplicates: false 
      })
    
    if (error) throw error
    
    // Record the activity in Google Sheets (as backup)
    // Adding second parameter 'supabase' to indicate source of the operation
    recordActivity(`Candidate ${candidate.id} saved to database`, 'supabase')
    
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
    
    // Record the activity in Google Sheets (as backup)
    // Adding second parameter 'supabase' to indicate source of the operation
    recordActivity(`Candidate ${id} deleted from database`, 'supabase')
    
    return true
  } catch (error) {
    handleSupabaseError(error, `deleting candidate ${id}`)
    return false
  }
}
