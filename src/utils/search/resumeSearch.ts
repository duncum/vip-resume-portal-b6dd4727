
import { extractTextFromPdf } from "../pdf";
import { Candidate } from "../sheets/types";

/**
 * Performs a text search across candidate data including resume content
 * 
 * @param candidates Array of candidates to search
 * @param query Search query text
 * @returns Filtered array of candidates matching the search query
 */
export const searchCandidates = (candidates: Candidate[], query: string): Candidate[] => {
  // Return all candidates if no query
  if (!query || query.trim() === '') {
    return candidates;
  }

  const lowerQuery = query.toLowerCase().trim();
  console.log(`Searching for "${lowerQuery}" in ${candidates.length} candidates`);
  
  return candidates.filter(candidate => {
    // Skip invalid candidates
    if (!candidate) return false;
    
    // Check standard fields (more efficient)
    const matchesHeadline = candidate.headline?.toLowerCase().includes(lowerQuery) || false;
    const matchesSectors = Array.isArray(candidate.sectors) && 
      candidate.sectors.some(sector => sector?.toLowerCase().includes(lowerQuery));
    const matchesTags = Array.isArray(candidate.tags) && 
      candidate.tags.some(tag => tag?.toLowerCase().includes(lowerQuery));
    const matchesTitle = typeof candidate.title === 'string' && 
      candidate.title.toLowerCase().includes(lowerQuery);
    const matchesSummary = typeof candidate.summary === 'string' && 
      candidate.summary.toLowerCase().includes(lowerQuery);
    const matchesLocation = typeof candidate.location === 'string' && 
      candidate.location.toLowerCase().includes(lowerQuery);
    const matchesEmployers = typeof candidate.notableEmployers === 'string' && 
      candidate.notableEmployers.toLowerCase().includes(lowerQuery);
    
    // If we found a match in standard fields, return true
    if (matchesHeadline || matchesSectors || matchesTags || matchesTitle || 
        matchesSummary || matchesLocation || matchesEmployers) {
      return true;
    }
    
    // Search resume text if available
    if (typeof candidate.resumeText === 'string' && candidate.resumeText.trim() !== '') {
      try {
        const matchesResume = candidate.resumeText.toLowerCase().includes(lowerQuery);
        if (matchesResume) {
          console.log(`Resume text match found for candidate ${candidate.id} with query "${lowerQuery}"`);
          return true;
        }
      } catch (error) {
        console.error(`Error searching resume text for candidate ${candidate.id}:`, error);
      }
    }
    
    return false;
  });
};

/**
 * Counts the number of matches in a specific candidate's resume text
 * 
 * @param candidate Candidate to check
 * @param query Search query
 * @returns Number of matches found in the resume
 */
export const countResumeMatches = (candidate: Candidate, query: string): number => {
  if (!query || !candidate.resumeText) return 0;
  
  const lowerQuery = query.toLowerCase().trim();
  const lowerText = candidate.resumeText.toLowerCase();
  
  // Count occurrences of the query in the resume text
  let count = 0;
  let position = lowerText.indexOf(lowerQuery);
  
  while (position !== -1) {
    count++;
    position = lowerText.indexOf(lowerQuery, position + 1);
  }
  
  return count;
};

/**
 * Gets highlighted snippets from resume text containing the search query
 * 
 * @param candidate Candidate to extract snippets from
 * @param query Search query
 * @param maxSnippets Maximum number of snippets to return
 * @param snippetLength Approximate length of each snippet
 * @returns Array of text snippets containing the search query
 */
export const getResumeSnippets = (
  candidate: Candidate, 
  query: string, 
  maxSnippets = 3,
  snippetLength = 100
): string[] => {
  if (!query || !candidate.resumeText) return [];
  
  const lowerQuery = query.toLowerCase().trim();
  const text = candidate.resumeText;
  const lowerText = text.toLowerCase();
  
  const snippets: string[] = [];
  let position = lowerText.indexOf(lowerQuery);
  
  while (position !== -1 && snippets.length < maxSnippets) {
    // Calculate snippet boundaries
    const halfLength = Math.floor(snippetLength / 2);
    let start = Math.max(0, position - halfLength);
    let end = Math.min(text.length, position + lowerQuery.length + halfLength);
    
    // Adjust to not cut words
    while (start > 0 && text[start] !== ' ' && text[start] !== '\n') start--;
    while (end < text.length && text[end] !== ' ' && text[end] !== '\n') end++;
    
    // Extract snippet
    let snippet = text.substring(start, end).trim();
    
    // Add ellipsis if needed
    if (start > 0) snippet = '...' + snippet;
    if (end < text.length) snippet = snippet + '...';
    
    snippets.push(snippet);
    
    // Find next occurrence
    position = lowerText.indexOf(lowerQuery, position + 1);
  }
  
  return snippets;
};
