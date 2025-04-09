
/**
 * Utility functions for handling resume URLs
 */

/**
 * Converts a regular URL to an embeddable URL format
 * (particularly for Google Drive links)
 */
export const getEmbedUrl = (url: string): string => {
  if (!url) return '';
  
  // Check if it's a Google Drive URL
  if (url.includes('drive.google.com/file/d/')) {
    // Extract the file ID
    const fileId = extractGoogleDriveFileId(url);
    if (fileId) {
      // Return the proper embed URL for Google Drive (with nocopy parameter)
      console.log("Converting Drive URL to embed URL with file ID:", fileId);
      return `https://drive.google.com/file/d/${fileId}/preview?usp=sharing&nocopy=true&embedded=true&rm=minimal`;
    }
  } else if (url.includes('drive.google.com/open')) {
    // Handle "open" format drive links
    const urlParams = new URLSearchParams(url.split('?')[1]);
    const fileId = urlParams.get('id');
    if (fileId) {
      console.log("Converting Drive open URL to embed URL with file ID:", fileId);
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
  // Handle standard file URL format
  const fileIdMatch = url.match(/\/d\/([^\/]+)/);
  if (fileIdMatch && fileIdMatch[1]) {
    return fileIdMatch[1];
  }
  
  // Handle "open" format drive links
  if (url.includes('drive.google.com/open')) {
    const urlParams = new URLSearchParams(url.split('?')[1]);
    const fileId = urlParams.get('id');
    if (fileId) return fileId;
  }
  
  return null;
};
