
import { useEffect, useRef, useState } from "react";
import ResumeViewer from "@/components/candidates/ResumeViewer";
import { Button } from "@/components/ui/button";
import { Printer, Mail } from "lucide-react";
import { toast } from "sonner";
import { trackDownload } from "@/utils/ipTracker";
import EmailResumeDialog from "./EmailResumeDialog";

interface CandidateResumeProps {
  resumeUrl: string;
  candidateId: string;
}

const CandidateResume = ({ resumeUrl, candidateId }: CandidateResumeProps) => {
  const [isEmailDialogOpen, setIsEmailDialogOpen] = useState(false);
  
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
      
      // Generate multiple watermarks for better coverage
      const watermarkRows = 20; // More rows for better coverage
      const watermarksPerRow = 10;
      const watermarkHTML = Array(watermarkRows).fill(0).map(() => {
        return `<div class="watermark-row">
          ${Array(watermarksPerRow).fill(0).map(() => `
            <div class="watermark">
              <img src="/lovable-uploads/2b0b5215-0006-407b-97e0-707e78f84b1d.png" alt="CRE Confidential" width="100%">
            </div>
          `).join('')}
        </div>`;
      }).join('');
      
      // Add necessary content to the window with improved watermark coverage
      printWindow.document.write(`
        <!DOCTYPE html>
        <html>
        <head>
          <title>Resume Print</title>
          <style>
            body { 
              margin: 0; 
              padding: 0; 
              position: relative;
              height: 100%;
            }
            
            /* Watermark styles with improved coverage */
            .watermark-container {
              position: fixed;
              top: 0;
              left: 0;
              width: 100%;
              height: 100%;
              z-index: 1000;
              pointer-events: none;
              overflow: hidden;
              background: rgba(255,255,255,0.1);
            }
            
            .watermark-grid {
              display: flex;
              flex-direction: column;
              position: fixed;
              top: 0;
              left: 0;
              width: 100%;
              height: 100%;
              transform: rotate(-45deg);
              transform-origin: center center;
              padding: 100px;
            }
            
            .watermark-row {
              display: flex;
              justify-content: space-around;
              margin: 40px 0;
            }
            
            .watermark {
              opacity: 0.15;
              width: 100px;
              margin: 0 50px;
              flex-shrink: 0;
            }
            
            .document-container {
              width: 100%;
              height: 100vh;
              position: relative;
              z-index: 1;
            }
            
            iframe {
              width: 100%;
              height: 100vh;
              border: none;
              display: block;
            }
            
            /* Critical print styling */
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
                opacity: 1 !important;
              }
              
              .watermark { 
                opacity: 0.25 !important; 
                -webkit-print-color-adjust: exact !important;
                print-color-adjust: exact !important;
                color-adjust: exact !important;
              }
              
              /* Force background printing */
              * { 
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
              ${watermarkHTML}
            </div>
          </div>
          
          <div class="document-container">
            ${isGoogleDriveUrl ? 
              `<iframe src="https://drive.google.com/file/d/${fileId}/preview?usp=sharing&nocopy=true&embedded=true&rm=minimal"></iframe>` : 
              `<iframe src="${resumeUrl}"></iframe>`
            }
          </div>
          
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
                      // Hide any download/print buttons (broader selectors)
                      const buttons = iframeDocument.querySelectorAll('[role="button"], button, .ndfHFb-c4YZDc-Wrql6b, .goog-inline-block, .ndfHFb-c4YZDc-to915-LgbsSe');
                      buttons.forEach(function(button) {
                        if (button instanceof HTMLElement) {
                          button.style.display = 'none';
                        }
                      });
                      
                      // Force disable interactive elements
                      const clickables = iframeDocument.querySelectorAll('a, [onClick], [role="link"]');
                      clickables.forEach(function(element) {
                        if (element instanceof HTMLElement) {
                          element.style.pointerEvents = 'none';
                        }
                      });
                    }
                  } catch(e) {
                    console.log("Note: Unable to modify iframe content due to security restrictions");
                  }
                  
                  // Trigger print
                  window.print();
                  
                  // After printing, wait briefly then notify user
                  setTimeout(function() {
                    document.body.innerHTML += '<div style="position:fixed;top:0;left:0;right:0;background:#4CAF50;color:white;padding:15px;text-align:center;z-index:9999">Print job sent to printer. You may close this window.</div>';
                  }, 1000);
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
    }
  };

  return (
    <div className="border-t border-grey-700 pt-4 md:pt-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg md:text-xl font-semibold">Resume Preview</h2>
        <div className="flex gap-2">
          <Button 
            onClick={() => setIsEmailDialogOpen(true)}
            size="sm"
            variant="outline"
            className="bg-white text-gold border-gold hover:bg-gold/10"
          >
            <Mail className="mr-2 h-4 w-4" />
            Email Resume
          </Button>
          <Button 
            onClick={handlePrint}
            size="sm"
            className="bg-gold text-black hover:bg-gold/90"
          >
            <Printer className="mr-2 h-4 w-4" />
            Print
          </Button>
        </div>
      </div>
      <ResumeViewer fileUrl={resumeUrl} candidateId={candidateId} />
      
      <EmailResumeDialog 
        open={isEmailDialogOpen} 
        onOpenChange={setIsEmailDialogOpen}
        candidateId={candidateId}
        resumeUrl={resumeUrl}
      />
    </div>
  );
};

export default CandidateResume;
