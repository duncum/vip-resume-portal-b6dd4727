
import { trackDownload } from "../ipTracker";
import { toast } from "sonner";
import { generateWatermarkHTML, generatePrintDocument } from "./printHelpers";
import { extractGoogleDriveFileId } from "../resume/urlUtils";

/**
 * Opens a new window with the resume content and watermark for printing
 */
export const printResume = async (resumeUrl: string, candidateId: string) => {
  // Track the print action
  await trackDownload(candidateId);
  toast.info("Preparing document for printing...");
  
  try {
    // Create a new window with embedded content
    const printWindow = window.open('', '_blank');
    
    if (!printWindow) {
      toast.error("Couldn't open print window. Check your popup blocker settings.");
      return;
    }
    
    // Get file extension to determine if we need special handling
    const isGoogleDriveUrl = resumeUrl.includes('drive.google.com');
    let fileId = '';
    
    if (isGoogleDriveUrl) {
      fileId = extractGoogleDriveFileId(resumeUrl) || '';
    }
    
    // Generate watermark HTML for better coverage
    const watermarkHTML = generateWatermarkHTML();
    
    // Generate the full document with styling
    const documentHTML = generatePrintDocument(watermarkHTML, isGoogleDriveUrl, fileId, resumeUrl);
    
    // Write to the new window
    printWindow.document.write(documentHTML);
    printWindow.document.close();
    
    toast.success("Print preview opened in new window");
  } catch (error) {
    console.error("Error preparing print:", error);
    toast.error("Unable to prepare document for printing");
  }
};
