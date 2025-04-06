
import { useEffect, useRef } from "react";
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
  // Handle printing by creating a new window with the content and watermark
  const handlePrint = () => {
    // Track the print action
    trackDownload(candidateId);
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
        const fileIdMatch = resumeUrl.match(/\/d\/([^\/]+)/);
        if (fileIdMatch && fileIdMatch[1]) {
          fileId = fileIdMatch[1];
        }
      }
      
      // Add necessary content to the window
      printWindow.document.write(`
        <!DOCTYPE html>
        <html>
        <head>
          <title>Resume Print</title>
          <style>
            body { 
              margin: 0; 
              padding: 0; 
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
              overflow: hidden;
            }
            .watermark-grid {
              display: flex;
              flex-wrap: wrap;
              justify-content: center;
              align-items: center;
              width: 100%;
              height: 100%;
              transform: rotate(-45deg);
              position: fixed;
              top: 0;
              left: 0;
            }
            .watermark {
              opacity: 0.2;
              margin: 30px;
              width: 150px;
            }
            iframe {
              width: 100%;
              height: 100vh;
              border: none;
              display: block;
            }
            @media print {
              @page {
                size: auto;
                margin: 0mm;
              }
              html, body {
                height: 100%;
                width: 100%;
                margin: 0;
                padding: 0;
              }
              .watermark-container {
                position: fixed;
                display: block !important;
                z-index: 9999;
              }
              .watermark { 
                opacity: 0.3 !important; 
              }
              
              /* Force background printing */
              html, body { 
                -webkit-print-color-adjust: exact !important;
                print-color-adjust: exact !important;
                color-adjust: exact !important;
              }
              
              iframe {
                height: auto !important;
                min-height: 100vh !important;
              }
            }
          </style>
        </head>
        <body>
          <div class="watermark-container">
            <div class="watermark-grid">
              ${Array(30).fill(0).map(() => `
                <div class="watermark">
                  <img src="/lovable-uploads/2b0b5215-0006-407b-97e0-707e78f84b1d.png" alt="CRE Confidential" width="100%">
                </div>
              `).join('')}
            </div>
          </div>
          
          ${isGoogleDriveUrl ? 
            `<iframe src="https://drive.google.com/file/d/${fileId}/preview?usp=sharing&nocopy=true&embedded=true&rm=minimal"></iframe>` : 
            `<iframe src="${resumeUrl}"></iframe>`
          }
          
          <script>
            // Auto-print when loaded
            window.onload = function() {
              // Wait for iframe to load
              const iframe = document.querySelector('iframe');
              iframe.onload = function() {
                setTimeout(function() {
                  // Try to access iframe contents to remove download buttons
                  try {
                    const iframeDocument = iframe.contentDocument || 
                                         (iframe.contentWindow && iframe.contentWindow.document);
                    
                    if (iframeDocument) {
                      // Hide any download/print buttons
                      const buttons = iframeDocument.querySelectorAll('[role="button"], .ndfHFb-c4YZDc-Wrql6b, .goog-inline-block');
                      buttons.forEach(function(button) {
                        button.style.display = 'none';
                      });
                    }
                  } catch(e) {
                    console.log("Note: Unable to modify iframe content due to security restrictions");
                  }
                  
                  // Trigger print
                  window.print();
                }, 1500);
              };
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
