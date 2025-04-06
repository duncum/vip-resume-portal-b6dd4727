
import { useEffect, useState, useRef } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { trackIpAddress } from "@/utils/ipTracker";

interface ResumeViewerProps {
  fileUrl: string;
  candidateId: string;
}

const ResumeViewer = ({ fileUrl, candidateId }: ResumeViewerProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  
  // Fix Google Drive URLs for proper embedding (and remove download option)
  const getEmbedUrl = (url: string) => {
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

  const embedUrl = getEmbedUrl(fileUrl);

  useEffect(() => {
    // Track IP address when resume is viewed
    trackIpAddress(candidateId);
    
    // Simulate PDF loading
    const timer = setTimeout(() => {
      setIsLoading(false);
      
      // After loading, ensure download buttons are removed and scrollbars are styled properly
      const cleanupTimer = setTimeout(() => {
        // Only run if iframe exists and has loaded successfully
        if (iframeRef.current && !isError) {
          try {
            // Try to access the iframe's document to remove UI elements that enable downloads
            const iframeDocument = iframeRef.current.contentDocument || 
                                 (iframeRef.current.contentWindow?.document);
            
            if (iframeDocument) {
              // For Google Drive embeds - hide download buttons & print buttons
              const downloadButtons = iframeDocument.querySelectorAll('[role="button"], .ndfHFb-c4YZDc-Wrql6b');
              downloadButtons.forEach((button) => {
                if (button instanceof HTMLElement) {
                  button.style.display = 'none';
                }
              });
              
              // Style scrollbars if needed
              const scrollElements = iframeDocument.querySelectorAll('.goog-inline-block');
              scrollElements.forEach((element) => {
                if (element instanceof HTMLElement) {
                  element.style.scrollbarWidth = 'thin';
                  element.style.scrollbarColor = '#888 #f1f1f1';
                }
              });
            }
          } catch (e) {
            // Silent catch - security restrictions prevent modifying cross-origin iframes
            console.log("Note: Unable to modify iframe content due to security restrictions");
          }
        }
      }, 1000);
      
      return () => clearTimeout(cleanupTimer);
    }, 1500);
    
    return () => clearTimeout(timer);
  }, [candidateId, isError]);

  const handleIframeError = () => {
    setIsError(true);
    setIsLoading(false);
    console.error("Failed to load document:", embedUrl);
  };

  const handleIframeLoad = () => {
    // Keep the loading state for a moment to ensure document is fully rendered
    setTimeout(() => setIsLoading(false), 500);
  };

  return (
    <Card className="w-full border border-grey-200 bg-white">
      <CardContent className="p-0 relative">
        {isLoading ? (
          <div className="h-[800px] flex items-center justify-center">
            <div className="animate-pulse flex flex-col items-center">
              <div className="w-16 h-16 border-4 border-grey-300 border-t-gold rounded-full animate-spin"></div>
              <p className="mt-4 text-grey-500">Loading document...</p>
            </div>
          </div>
        ) : isError ? (
          <div className="h-[800px] flex items-center justify-center">
            <div className="flex flex-col items-center text-center px-4">
              <svg className="w-16 h-16 text-grey-500 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
              <h3 className="text-lg font-medium text-grey-700">Unable to display resume</h3>
              <p className="mt-2 text-grey-500">The resume might be unavailable or in an unsupported format.</p>
            </div>
          </div>
        ) : (
          <div className="relative resume-container" id="resume-for-print">
            {/* Watermark pattern overlay - consistent grid with alternating rows */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none z-10 print:block" id="resume-watermark">
              <div className="absolute inset-0 flex flex-col">
                {/* Generate multiple rows to ensure coverage for any document length */}
                {[...Array(20)].map((_, rowIndex) => (
                  <div 
                    key={`row-${rowIndex}`} 
                    className={`flex justify-between px-12 py-24 ${rowIndex % 2 === 0 ? '' : 'ml-32'}`}
                  >
                    {[...Array(3)].map((_, colIndex) => (
                      <div 
                        key={`watermark-${rowIndex}-${colIndex}`} 
                        className="transform -rotate-45 opacity-20 print:opacity-30"
                      >
                        <img 
                          src="/lovable-uploads/2b0b5215-0006-407b-97e0-707e78f84b1d.png" 
                          alt="CRE Confidential" 
                          className="w-52"
                        />
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>
            
            {/* PDF viewer */}
            <iframe
              ref={iframeRef}
              src={embedUrl}
              className="w-full h-[800px] border-0 print:h-auto print:min-h-screen"
              title="Resume PDF"
              onError={handleIframeError}
              onLoad={handleIframeLoad}
              frameBorder="0"
              allowFullScreen
              id="resume-iframe"
              sandbox="allow-same-origin allow-scripts allow-forms"
            />
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ResumeViewer;
