
/**
 * Transforms a Google Drive URL into a proper embed URL with restrictions
 * @param url Original file URL
 * @returns Embed URL with download restrictions
 */
export const getEmbedUrl = (url: string): string => {
  // Check if it's a Google Drive URL
  if (url.includes('drive.google.com/file/d/')) {
    // Extract the file ID
    const fileIdMatch = url.match(/\/d\/([^\/]+)/);
    if (fileIdMatch && fileIdMatch[1]) {
      const fileId = fileIdMatch[1];
      // Return the proper embed URL for Google Drive with ALL options to prevent downloads
      // Adding nocopy, nodownload and all available restrictions
      return `https://drive.google.com/file/d/${fileId}/preview?usp=sharing&nocopy=true&nodownload=true`;
    }
  }
  return url;
};
