
/**
 * Transforms a Google Drive URL into a proper embed URL with maximum restrictions
 * @param url Original file URL
 * @returns Embed URL with enhanced download restrictions
 */
export const getEmbedUrl = (url: string): string => {
  // Check if it's a Google Drive URL
  if (url.includes('drive.google.com/file/d/')) {
    // Extract the file ID
    const fileIdMatch = url.match(/\/d\/([^\/]+)/);
    if (fileIdMatch && fileIdMatch[1]) {
      const fileId = fileIdMatch[1];
      // Return the proper embed URL for Google Drive with ALL possible restrictions to prevent downloads
      // Adding nocopy, nodownload and all available restrictive parameters
      return `https://drive.google.com/file/d/${fileId}/preview?usp=sharing&nocopy=true&nodownload=true&noprint=true&chrome=false`;
    }
  } else if (url.includes('drive.google.com')) {
    // Handle other Google Drive URL formats
    const urlObj = new URL(url);
    const params = new URLSearchParams(urlObj.search);
    const id = params.get('id');
    if (id) {
      return `https://drive.google.com/file/d/${id}/preview?usp=sharing&nocopy=true&nodownload=true&noprint=true&chrome=false`;
    }
  }
  
  // If it's not a Google Drive URL but a PDF URL, wrap it to prevent download
  if (url.endsWith('.pdf') || url.includes('pdf')) {
    // Use base URL to create a secure wrapper
    const origin = window.location.origin;
    // Return a URL that forces use of our secure viewer
    return `${origin}/api/secure-document-proxy?url=${encodeURIComponent(url)}`;
  }
  
  return url;
};
