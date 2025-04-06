
import React, { useEffect } from "react";

/**
 * Component that provides enhanced security to prevent document downloads
 * without visible overlays that interfere with document viewing
 */
const ResumeOverlays: React.FC = () => {
  // Add runtime protection against DOM manipulation
  useEffect(() => {
    // Prevent right-click on the document
    const preventContextMenu = (e: MouseEvent) => {
      e.preventDefault();
      return false;
    };
    
    // Prevent keyboard shortcuts for saving/printing
    const preventSaveShortcuts = (e: KeyboardEvent) => {
      if (e.ctrlKey && (e.key === 's' || e.key === 'p')) {
        e.preventDefault();
        return false;
      }
    };
    
    // Add event listeners to the document
    document.addEventListener('contextmenu', preventContextMenu);
    document.addEventListener('keydown', preventSaveShortcuts);
    
    // Clean up when component unmounts
    return () => {
      document.removeEventListener('contextmenu', preventContextMenu);
      document.removeEventListener('keydown', preventSaveShortcuts);
    };
  }, []);

  return (
    <>
      <style>
        {`
          /* Hide download controls without visible overlays */
          .iframe-container iframe {
            border: none;
          }
          
          /* Improve scrollbar appearance */
          .iframe-container {
            scrollbar-width: thin;
            scrollbar-color: #888 #f1f1f1;
          }
          
          .iframe-container::-webkit-scrollbar {
            width: 8px;
          }
          
          .iframe-container::-webkit-scrollbar-track {
            background: #f1f1f1;
          }
          
          .iframe-container::-webkit-scrollbar-thumb {
            background: #888;
            border-radius: 4px;
          }
          
          /* Prevent selection in the container */
          .resume-container {
            user-select: none;
            -webkit-user-select: none;
            -moz-user-select: none;
            -ms-user-select: none;
          }
        `}
      </style>
    </>
  );
};

export default ResumeOverlays;
