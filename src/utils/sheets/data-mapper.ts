
import { Candidate } from './types';

/**
 * Map a row from Google Sheets to a Candidate object
 */
export const rowToCandidate = (row: any[]): Candidate => {
  // Extract just the ID part from the first column if it contains commas
  // This prevents using the entire row as an ID
  const rawId = row[0] || '';
  const id = rawId.includes(',') ? rawId.split(',')[0] : rawId;

  return {
    id,
    headline: row[1] || '',
    sectors: (row[2] || '').split(',').map((s: string) => s.trim()).filter(Boolean),
    tags: (row[3] || '').split(',').map((t: string) => t.trim()).filter(Boolean),
    resumeUrl: row[4] || '',
    titleCategories: (row[5] || '').split(',').map((c: string) => c.trim()).filter(Boolean),
    titles: {
      // Extract title categories and create a map of titles
      [(row[5] || '').split(',')[0]?.trim() || 'Other']: 
        [(row[6] || '').split(',').map((t: string) => t.trim())[0]].filter(Boolean)
    },
    title: (row[6] || '').split(',')[0]?.trim() || '',
    category: (row[5] || '').split(',')[0]?.trim() || '',
    summary: row[7] || '',
    location: row[8] || '',
    relocationPreference: row[9] || 'flexible',
    notableEmployers: row[10] || '',
    resumeText: row[11] || '',
  };
};
