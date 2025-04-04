
// This file is kept for backward compatibility
// It re-exports all functions from the new modular structure

export { Candidate } from './sheets';
export {
  positionCategories,
  SPREADSHEET_ID,
  CANDIDATES_RANGE,
  mockCandidates,
  fetchCandidates,
  fetchCandidateById
} from './sheets';
