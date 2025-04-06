
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
  const iframeRef = useRef<HTMLIFrameElement | null>(null);

  // Get reference to iframe after it's loaded
  useEffect(() => {
    const checkIframe = () => {
      const iframe = document.querySelector('iframe');
      if (iframe) {
        iframeRef.current = iframe;
      }
    };
    
    // Check on initial load and again after a delay to ensure it's fully rendered
    checkIframe();
    const timer = setTimeout(checkIframe, 2000);
    
    return () => clearTimeout(timer);
  }, []);

  const handlePrint = () => {
    // Track the print action
    trackDownload(candidateId);
    toast.info("Preparing document for printing...");
    
    // Method 1: Use the iframe's contentWindow if available
    if (iframeRef.current && iframeRef.current.contentWindow) {
      try {
        // Focus on iframe to ensure it's the active element
        iframeRef.current.focus();
        
        // Access the contentWindow and call print
        iframeRef.current.contentWindow.print();
        toast.success("Print dialog opened");
        return;
      } catch (error) {
        console.error("Error printing iframe:", error);
        // Fall through to fallback
      }
    }
    
    // Method 2: Create a printable version with watermark
    try {
      // Find the resume container with watermark
      const resumeContainer = document.querySelector('.resume-container');
      
      if (resumeContainer) {
        // Create a new window with the content
        const printWindow = window.open('', '_blank');
        
        if (printWindow) {
          printWindow.document.write(`
            <html>
              <head>
                <title>Resume Print</title>
                <style>
                  body { margin: 0; }
                  .watermark-container {
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    z-index: 10;
                    pointer-events: none;
                    overflow: hidden;
                  }
                  .watermark-grid {
                    position: absolute;
                    inset: 0;
                    display: flex;
                    flex-direction: column;
                  }
                  .watermark-row {
                    display: flex;
                    justify-content: space-between;
                    padding: 96px 48px;
                  }
                  .watermark-row:nth-child(even) {
                    margin-left: 128px;
                  }
                  .watermark {
                    transform: rotate(-45deg);
                    opacity: 0.3;
                    width: 208px;
                  }
                  iframe {
                    width: 100%;
                    height: 100vh;
                    border: none;
                  }
                </style>
              </head>
              <body>
                <div class="watermark-container">
                  <div class="watermark-grid">
                    ${Array(10).fill(0).map((_, rowIndex) => `
                      <div class="watermark-row" style="${rowIndex % 2 === 0 ? '' : 'margin-left: 128px;'}">
                        ${Array(3).fill(0).map(() => `
                          <div class="watermark">
                            <img src="/lovable-uploads/2b0b5215-0006-407b-97e0-707e78f84b1d.png" alt="CRE Confidential" width="100%">
                          </div>
                        `).join('')}
                      </div>
                    `).join('')}
                  </div>
                </div>
                <iframe src="${resumeUrl}" width="100%" height="100%"></iframe>
              </body>
            </html>
          `);
          
          // Add event listener for when content is loaded
          printWindow.addEventListener('load', () => {
            printWindow.print();
            // Don't close the window automatically to allow user to view it
          });
          
          toast.success("Opening print preview in new window");
          return;
        }
      }
    } catch (error) {
      console.error("Error with print window method:", error);
    }
    
    // Method 3: Final fallback to window.print()
    window.print();
    toast.warning("Using system print (watermark may not appear)", {
      description: "Please ensure your browser allows printing of background elements"
    });
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
