
/**
 * Utility functions for handling resume URLs
 */

/**
 * Converts a regular URL to an embeddable URL format
 * (particularly for Google Drive links)
 */
export const getEmbedUrl = (url: string): string => {
  // Check if it's a Google Drive URL
  if (url.includes('drive.google.com/file/d/')) {
    // Extract the file ID
    const fileId = extractGoogleDriveFileId(url);
    if (fileId) {
      // Return the proper embed URL for Google Drive (with nocopy parameter)
      return `https://drive.google.com/file/d/${fileId}/preview?usp=sharing&nocopy=true&embedded=true&rm=minimal`;
    }
  }
  // For other document types, return as is
  return url;
};

/**
 * Extracts the file ID from a Google Drive URL
 */
export const extractGoogleDriveFileId = (url: string): string | null => {
  const fileIdMatch = url.match(/\/d\/([^\/]+)/);
  return fileIdMatch && fileIdMatch[1] ? fileIdMatch[1] : null;
};
