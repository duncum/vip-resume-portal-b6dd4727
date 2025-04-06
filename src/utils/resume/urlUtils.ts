
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
    const fileIdMatch = url.match(/\/d\/([^\/]+)/);
    if (fileIdMatch && fileIdMatch[1]) {
      const fileId = fileIdMatch[1];
      // Return the proper embed URL for Google Drive (with nocopy parameter)
      return `https://drive.google.com/file/d/${fileId}/preview?usp=sharing&nocopy=true&embedded=true&rm=minimal`;
    }
  }
  // For other document types, return as is
  return url;
};
