
import { ViewData } from './types';

// In-memory storage for tracked views (used alongside Google Sheets)
const viewsHistory: ViewData[] = [];

/**
 * Add a view record to the in-memory storage
 */
export const addViewRecord = (viewData: ViewData): void => {
  viewsHistory.push(viewData);
};

/**
 * Get all view records from in-memory storage
 */
export const getAllViewRecords = (): ViewData[] => {
  return [...viewsHistory];
};

/**
 * Get view records for a specific candidate
 */
export const getCandidateViewRecords = (candidateId: string): ViewData[] => {
  return viewsHistory.filter(view => view.candidateId === candidateId);
};
