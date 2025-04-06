
import React, { useEffect, useRef } from "react";
import ResumeOverlays from "./ResumeOverlays";
import { ScrollArea } from "@/components/ui/scroll-area";

interface DocumentViewerProps {
  embedUrl: string;
  onError: () => void;
}

/**
 * Component that renders the document in an iframe with enhanced security
 * and watermark protection without interfering with document viewing
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
        // Apply protection to the iframe content
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
          
          /* Hide download UI elements */
          #download, .download, button[download], a[download],
          [id*="download"], [class*="download"],
          [id*="print"], [class*="print"],
          [id*="save"], [class*="save"] {
            display: none !important;
            visibility: hidden !important;
            opacity: 0 !important;
            pointer-events: none !important;
          }
        `;
        iframeDoc.head.appendChild(style);
        
        // Find and remove download buttons
        const removeDownloadButtons = () => {
          const elements = iframeDoc.querySelectorAll('button, a');
          elements.forEach(el => {
            if (el.textContent?.toLowerCase().includes('download') || 
                el.getAttribute('aria-label')?.toLowerCase().includes('download')) {
              el.style.display = 'none';
              el.style.visibility = 'hidden';
              el.style.pointerEvents = 'none';
            }
          });
        };
        
        // Run immediately and periodically check
        removeDownloadButtons();
        setInterval(removeDownloadButtons, 500);
      }
    } catch (e) {
      // Cross-origin errors will occur, which is fine
      console.log('Cross-origin iframe, cannot access content directly');
    }
  };

  return (
    <div className="relative resume-container" id="resume-for-print">
      {/* Enhanced watermark pattern overlay with subtle opacity */}
      <div 
        className="absolute inset-0 overflow-hidden pointer-events-none z-10 print:block opacity-[0.15] print:opacity-30" 
        id="resume-watermark"
        style={{ pointerEvents: 'none' }}
      >
        <div className="absolute inset-0 flex flex-col">
          {/* Generate a pattern of watermarks */}
          {[...Array(8)].map((_, rowIndex) => (
            <div 
              key={`row-${rowIndex}`} 
              className={`flex justify-between px-12 py-24 ${rowIndex % 2 === 0 ? '' : 'ml-24'}`}
            >
              {[...Array(3)].map((_, colIndex) => (
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
      
      {/* PDF viewer with custom scroll area for better performance */}
      <ScrollArea className="h-[800px] w-full">
        <div className="iframe-container w-full relative">
          <ResumeOverlays />
          
          <iframe
            ref={iframeRef}
            src={embedUrl}
            className="w-full h-[800px] border-0"
            title="Resume PDF"
            onError={onError}
            onLoad={handleIframeLoad}
            frameBorder="0"
            allowFullScreen
            id="resume-iframe"
            sandbox="allow-same-origin allow-scripts"
          />
        </div>
      </ScrollArea>
    </div>
  );
};

export default DocumentViewer;
