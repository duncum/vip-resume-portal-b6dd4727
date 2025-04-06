
import React, { useEffect, useRef } from "react";
import ResumeOverlays from "./ResumeOverlays";

interface DocumentViewerProps {
  embedUrl: string;
  onError: () => void;
}

/**
 * Component that renders the document in an iframe with enhanced security
 * and watermark protection
 */
const DocumentViewer: React.FC<DocumentViewerProps> = ({ embedUrl, onError }) => {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  
  // Add DOM security measures to prevent tampering
  useEffect(() => {
    const preventSaving = (e: KeyboardEvent) => {
      // Block Ctrl+S, Ctrl+P (except our print button), and other save shortcuts
      if (e.ctrlKey && (e.key === 's' || e.key === 'p')) {
        e.preventDefault();
        return false;
      }
    };
    
    // Prevent right click
    const preventContextMenu = (e: MouseEvent) => {
      e.preventDefault();
      return false;
    };
    
    // Add event listeners
    document.addEventListener('keydown', preventSaving);
    document.addEventListener('contextmenu', preventContextMenu);
    
    // Create a dense watermark pattern directly in the viewer
    const ensureWatermarks = () => {
      const watermarkEl = document.getElementById('resume-watermark');
      if (watermarkEl && watermarkEl.style.display === 'none') {
        watermarkEl.style.display = 'block';
      }
    };
    
    // Check watermarks periodically
    const intervalId = setInterval(ensureWatermarks, 1000);
    
    return () => {
      // Clean up event listeners
      document.removeEventListener('keydown', preventSaving);
      document.removeEventListener('contextmenu', preventContextMenu);
      clearInterval(intervalId);
    };
  }, []);
  
  // Additional protection for iframe content
  const handleIframeLoad = () => {
    try {
      if (iframeRef.current && iframeRef.current.contentDocument) {
        // Apply overlay protections to the iframe content
        const iframeDoc = iframeRef.current.contentDocument;
        iframeDoc.addEventListener('contextmenu', (e) => e.preventDefault());
        
        // Disable text selection inside iframe
        const style = iframeDoc.createElement('style');
        style.textContent = `
          * {
            user-select: none !important;
            -webkit-user-select: none !important;
            -moz-user-select: none !important;
            -ms-user-select: none !important;
          }
        `;
        iframeDoc.head.appendChild(style);
      }
    } catch (e) {
      // Cross-origin errors will occur, which is fine
      console.log('Cross-origin iframe, cannot access content directly');
    }
  };

  return (
    <div className="relative resume-container" id="resume-for-print">
      {/* Enhanced watermark pattern overlay with denser pattern */}
      <div 
        className="absolute inset-0 overflow-hidden pointer-events-none z-10 print:block opacity-20 print:opacity-40" 
        id="resume-watermark"
        style={{ pointerEvents: 'none' }}
      >
        <div className="absolute inset-0 flex flex-col">
          {/* Generate multiple rows to ensure coverage for any document length */}
          {[...Array(20)].map((_, rowIndex) => (
            <div 
              key={`row-${rowIndex}`} 
              className={`flex justify-between px-8 py-16 ${rowIndex % 2 === 0 ? '' : 'ml-24'}`}
            >
              {[...Array(5)].map((_, colIndex) => (
                <div 
                  key={`watermark-${rowIndex}-${colIndex}`} 
                  className="transform -rotate-45"
                >
                  <img 
                    src="/lovable-uploads/681948c4-13ef-41a2-919d-570c804385a1.png" 
                    alt="CRE Confidential" 
                    className="w-44 select-none"
                    draggable="false"
                  />
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
      
      {/* PDF viewer iframe with comprehensive CSS to hide all controls */}
      <div className="iframe-container w-full h-[800px] relative">
        <ResumeOverlays />
        
        {/* Security layer to prevent access to PDF content */}
        <div className="absolute inset-0 z-5 pointer-events-none"></div>
        
        <iframe
          ref={iframeRef}
          src={embedUrl}
          className="w-full h-full border-0"
          title="Resume PDF"
          onError={onError}
          onLoad={handleIframeLoad}
          frameBorder="0"
          allowFullScreen
          id="resume-iframe"
          sandbox="allow-same-origin allow-scripts"
        />
      </div>
    </div>
  );
};

export default DocumentViewer;
