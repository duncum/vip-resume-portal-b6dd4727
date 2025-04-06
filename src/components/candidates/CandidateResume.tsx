
import ResumeViewer from "@/components/candidates/ResumeViewer";
import { Button } from "@/components/ui/button";
import { Printer } from "lucide-react";
import { toast } from "sonner";
import { trackDownload } from "@/utils/ipTracker";

interface CandidateResumeProps {
  resumeUrl: string;
  candidateId: string;
}

const CandidateResume = ({ resumeUrl, candidateId }: CandidateResumeProps) => {
  // Handle printing by directly opening the document in a new tab optimized for printing
  const handlePrint = () => {
    // Track the print action
    trackDownload(candidateId);
    toast.info("Preparing document for printing...");
    
    try {
      // Extract file details
      const isGoogleDriveUrl = resumeUrl.includes('drive.google.com');
      let fileId = '';
      let printUrl = resumeUrl;
      
      if (isGoogleDriveUrl) {
        const fileIdMatch = resumeUrl.match(/\/d\/([^\/]+)/);
        if (fileIdMatch && fileIdMatch[1]) {
          fileId = fileIdMatch[1];
          // For Google Drive, use the direct export link which works better for printing
          printUrl = `https://drive.google.com/uc?export=download&id=${fileId}`;
        }
      }
      
      // Create a new window with the optimized printing approach
      const printWindow = window.open('', '_blank');
      
      if (!printWindow) {
        toast.error("Couldn't open print window. Check your popup blocker settings.");
        return;
      }
      
      // Write HTML that's optimized for printing
      printWindow.document.write(`
        <!DOCTYPE html>
        <html>
        <head>
          <title>Resume Print</title>
          <style>
            @page {
              size: auto;
              margin: 0mm;
            }
            body {
              margin: 0;
              padding: 0;
              height: 100vh;
              overflow: auto;
            }
            
            /* Watermark styles */
            .watermark-container {
              position: fixed;
              top: 0;
              left: 0;
              width: 100%;
              height: 100%;
              z-index: 1000;
              pointer-events: none;
              opacity: 0.3;
            }
            .watermark-grid {
              display: flex;
              flex-wrap: wrap;
              justify-content: space-around;
              width: 100%;
              height: 100%;
            }
            .watermark {
              transform: rotate(-45deg);
              margin: 50px;
              width: 200px;
            }
            
            /* PDF container */
            .pdf-container {
              width: 100%;
              height: 100vh;
              overflow: auto;
              display: flex;
              flex-direction: column;
            }
            
            /* When direct embedding, use iframe for Google and object for others */
            iframe, object {
              width: 100%;
              height: 100%;
              border: none;
              flex: 1;
            }
            
            @media print {
              .watermark-container {
                position: fixed;
                display: block !important;
                z-index: 9999;
                opacity: 0.4 !important;
              }
              
              /* Force background printing */
              html, body { 
                -webkit-print-color-adjust: exact !important;
                print-color-adjust: exact !important;
                height: auto !important;
                overflow: visible !important;
              }
              
              .pdf-container {
                height: auto !important;
                overflow: visible !important;
              }
              
              /* Make sure content doesn't get cut off */
              iframe, object {
                height: auto !important;
                min-height: 100vh;
                page-break-inside: avoid !important;
              }
            }
          </style>
        </head>
        <body>
          <div class="watermark-container">
            <div class="watermark-grid">
              ${Array(20).fill(0).map(() => `
                <div class="watermark">
                  <img src="/lovable-uploads/2b0b5215-0006-407b-97e0-707e78f84b1d.png" alt="CRE Confidential" width="100%">
                </div>
              `).join('')}
            </div>
          </div>
          
          <div class="pdf-container">
            ${isGoogleDriveUrl ? 
              `<object data="${printUrl}" type="application/pdf" width="100%" height="100%">
                <iframe src="https://drive.google.com/file/d/${fileId}/preview?usp=sharing" width="100%" height="100%"></iframe>
               </object>` : 
              `<object data="${printUrl}" type="application/pdf" width="100%" height="100%">
                <p>It appears you don't have a PDF plugin for this browser. 
                You can <a href="${printUrl}">click here to download the PDF file.</a></p>
               </object>`
            }
          </div>
          
          <script>
            // Auto-print when loaded
            window.onload = function() {
              // Wait a bit to ensure document is fully loaded
              setTimeout(function() {
                window.print();
              }, 2000);
            };
          </script>
        </body>
        </html>
      `);
      
      printWindow.document.close();
      toast.success("Print preview opened in new window");
    } catch (error) {
      console.error("Error preparing print:", error);
      toast.error("Unable to prepare document for printing");
      
      // Last resort fallback - direct download
      window.open(resumeUrl, '_blank');
    }
  };

  return (
    <div className="border-t border-grey-700 pt-4 md:pt-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg md:text-xl font-semibold">Resume Preview</h2>
        <Button 
          onClick={handlePrint}
          size="sm"
          className="bg-gold text-black hover:bg-gold/90"
        >
          <Printer className="mr-2 h-4 w-4" />
          Print
        </Button>
      </div>
      <ResumeViewer fileUrl={resumeUrl} candidateId={candidateId} />
    </div>
  );
};

export default CandidateResume;
