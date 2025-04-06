
import React from "react";
import ResumeOverlays from "./ResumeOverlays";

interface DocumentViewerProps {
  embedUrl: string;
  onError: () => void;
}

/**
 * Component that renders the document in an iframe with UI controls hidden
 */
const DocumentViewer: React.FC<DocumentViewerProps> = ({ embedUrl, onError }) => {
  return (
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
      
      {/* PDF viewer iframe with comprehensive CSS to hide all controls */}
      <div className="iframe-container w-full h-[800px] relative">
        <ResumeOverlays />
        
        <iframe
          src={embedUrl}
          className="w-full h-full border-0"
          title="Resume PDF"
          onError={onError}
          frameBorder="0"
          allowFullScreen
          id="resume-iframe"
          sandbox="allow-same-origin allow-scripts allow-forms"
        />
      </div>
    </div>
  );
};

export default DocumentViewer;
