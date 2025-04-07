
// Google Drive configuration settings

// Folder name for resume storage
export const RESUME_FOLDER_NAME = "CRE Redacted";

// Folder ID for direct access (using the ID from the user's shared folder)
export const RESUME_FOLDER_ID_DEFAULT = "1Vo5z_plKtmSzKqinGwGbugZlbNBsQXYx";

// Cache for the folder ID to avoid repeated lookups
let RESUME_FOLDER_ID: string | null = RESUME_FOLDER_ID_DEFAULT;

/**
 * Get the current cached folder ID
 */
export const getResumeFolderId = (): string | null => {
  return RESUME_FOLDER_ID;
};

/**
 * Set the resume folder ID in cache
 */
export const setResumeFolderId = (id: string): void => {
  RESUME_FOLDER_ID = id;
};
