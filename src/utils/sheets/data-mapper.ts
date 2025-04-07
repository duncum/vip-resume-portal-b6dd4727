
import { Candidate } from './types';

/**
 * Map a row from Google Sheets to a Candidate object
 */
export const rowToCandidate = (row: any[]): Candidate => {
  // Extract just the ID part from the first column if it contains commas
  // This prevents using the entire row as an ID
  const rawId = row[0] || '';
  const id = rawId.includes(',') ? rawId.split(',')[0] : rawId;

  // Process categories and titles from the spreadsheet
  const categoryString = row[5] || '';
  const titleString = row[6] || '';
  
  // Split and clean the categories and titles
  const categories = categoryString.split(',').map((c: string) => c.trim()).filter(Boolean);
  const titles = titleString.split(',').map((t: string) => t.trim()).filter(Boolean);
  
  // Create a titles object with all categories and their associated titles
  const titlesObject: Record<string, string[]> = {};
  
  // If we have at least one category, assign all titles to the first category
  // This handles the case where there's just one category with multiple titles
  if (categories.length > 0) {
    titlesObject[categories[0]] = titles;
  }
  
  // For multi-category cases, we would need more complex mapping logic
  // but for now this ensures all titles are at least accessible

  return {
    id,
    headline: row[1] || '',
    sectors: (row[2] || '').split(',').map((s: string) => s.trim()).filter(Boolean),
    tags: (row[3] || '').split(',').map((t: string) => t.trim()).filter(Boolean),
    resumeUrl: row[4] || '',
    titles: titlesObject,
    title: titles.join(', '), // Join all titles for display purposes
    category: categories.join(', '), // Join all categories for display purposes
    summary: row[7] || '',
    location: row[8] || '',
    relocationPreference: row[9] || 'flexible',
    notableEmployers: row[10] || '',
    resumeText: row[11] || '',
  };
};
