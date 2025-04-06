
import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { trackIpAddress } from "@/utils/ipTracker";

interface ResumeViewerProps {
  fileUrl: string;
  candidateId: string;
}

const ResumeViewer = ({ fileUrl, candidateId }: ResumeViewerProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  
  // Fix Google Drive URLs for proper embedding (and completely remove download options)
  const getEmbedUrl = (url: string) => {
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

  const embedUrl = getEmbedUrl(fileUrl);

  useEffect(() => {
    // Track IP address when resume is viewed
    trackIpAddress(candidateId);
    
    // Simulate PDF loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);
    
    return () => clearTimeout(timer);
  }, [candidateId]);

  const handleIframeError = () => {
    setIsError(true);
    setIsLoading(false);
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
            
            {/* PDF viewer iframe with enhanced CSS to hide controls */}
            <div className="iframe-container w-full h-[800px] relative">
              <style>
                {`
                  /* Hide standard download UI elements */
                  .iframe-container::after {
                    content: '';
                    position: absolute;
                    top: 0;
                    right: 0;
                    width: 60px;
                    height: 60px;
                    background: white;
                    z-index: 100;
                    pointer-events: none;
                  }
                  
                  /* Additional overlay to hide bottom controls */
                  .iframe-container::before {
                    content: '';
                    position: absolute;
                    bottom: 0;
                    right: 0;
                    width: 40px;
                    height: 40px;
                    background: white;
                    z-index: 100;
                    pointer-events: none;
                  }
                  
                  /* Right side overlay to hide controls */
                  .right-overlay {
                    position: absolute;
                    top: 30%;
                    right: 0;
                    width: 40px;
                    height: 50%;
                    background: white;
                    z-index: 100;
                    pointer-events: none;
                  }
                `}
              </style>
              
              {/* Extra overlays to hide UI elements */}
              <div className="right-overlay"></div>
              
              <iframe
                src={embedUrl}
                className="w-full h-full border-0"
                title="Resume PDF"
                onError={handleIframeError}
                frameBorder="0"
                allowFullScreen
                id="resume-iframe"
                sandbox="allow-same-origin allow-scripts allow-forms"
              />
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ResumeViewer;
