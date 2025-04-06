
import ResumeViewer from "@/components/candidates/ResumeViewer";
import { Button } from "@/components/ui/button";
import { Printer } from "lucide-react";
import { toast } from "sonner";
import { trackDownload } from "@/utils/ipTracker";
import { useEffect, useRef } from "react";

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
      
      // Add necessary content to the window
      printWindow.document.write(`
        <!DOCTYPE html>
        <html>
        <head>
          <title>Resume Print</title>
          <style>
            body { margin: 0; padding: 0; }
            iframe { width: 100%; height: 100vh; border: none; }
            
            /* Watermark styles */
            .watermark-container {
              position: fixed;
              top: 0;
              left: 0;
              width: 100%;
              height: 100%;
              z-index: 1000;
              pointer-events: none;
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
              opacity: 0.3;
              margin: 50px;
              width: 200px;
            }
            @media print {
              .watermark-container {
                position: fixed;
                display: block !important;
                z-index: 9999;
              }
              .watermark { opacity: 0.4 !important; }
              
              /* Force background printing */
              html, body { 
                -webkit-print-color-adjust: exact !important;
                print-color-adjust: exact !important;
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
          
          <!-- Direct link to PDF instead of iframe to avoid cross-origin issues -->
          <iframe src="${resumeUrl}"></iframe>
          
          <script>
            // Auto-print when loaded
            window.onload = function() {
              setTimeout(function() {
                window.print();
              }, 1000);
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
