
import React, { useEffect } from "react";

/**
 * Component that provides enhanced CSS styles and overlay elements
 * to prevent download UI elements in embedded documents with
 * strong anti-tampering measures
 */
const ResumeOverlays: React.FC = () => {
  // Add runtime protection against DOM manipulation
  useEffect(() => {
    // Create a MutationObserver to detect if overlays are removed
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        // Check if relevant classes are removed
        if (mutation.type === 'childList') {
          const overlaysRemoved = !document.querySelector('.right-overlay') || 
                                !document.querySelector('.top-right-corner') ||
                                !document.querySelector('.bottom-overlay');
          
          // If overlays are removed, recreate them
          if (overlaysRemoved) {
            const container = document.querySelector('.iframe-container');
            if (container) {
              // Recreate missing overlays
              const rightOverlay = document.createElement('div');
              rightOverlay.className = 'right-overlay';
              container.appendChild(rightOverlay);
              
              const topRightCorner = document.createElement('div');
              topRightCorner.className = 'top-right-corner';
              container.appendChild(topRightCorner);
              
              const bottomOverlay = document.createElement('div');
              bottomOverlay.className = 'bottom-overlay';
              container.appendChild(bottomOverlay);
            }
          }
        }
      });
    });
    
    // Start observing the document
    observer.observe(document.body, {
      childList: true,
      subtree: true
    });
    
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <style>
        {`
          /* Enhanced control hiding with more aggressive coverage */
          .iframe-container::after {
            content: '';
            position: absolute;
            top: 0;
            right: 0;
            width: 80px;
            height: 80px;
            background: white;
            z-index: 1000;
            pointer-events: none;
          }
          
          /* Additional overlay to hide bottom controls */
          .iframe-container::before {
            content: '';
            position: absolute;
            bottom: 0;
            right: 0;
            width: 100%;
            height: 50px;
            background: white;
            z-index: 1000;
            pointer-events: none;
          }
          
          /* Wider right side overlay to hide controls including download button */
          .right-overlay {
            position: absolute;
            top: 0;
            right: 0;
            width: 80px; 
            height: 100%;
            background: white;
            z-index: 1000;
            pointer-events: none;
          }
          
          /* Fullscreen exit button remover */
          .top-right-corner {
            position: absolute;
            top: 0;
            right: 0;
            width: 80px;
            height: 80px;
            background: white;
            z-index: 1001;
            pointer-events: none;
          }
          
          /* Fixed positioned overlay that stays in view when scrolling */
          .fixed-right-overlay {
            position: fixed;
            top: 0;
            right: 0;
            width: 80px;
            height: 100vh;
            background: white;
            z-index: 9999;
            pointer-events: none;
          }
          
          /* Enhanced bottom control hider */
          .bottom-overlay {
            position: absolute;
            bottom: 0;
            left: 0;
            width: 100%;
            height: 50px;
            background: white;
            z-index: 1000;
            pointer-events: none;
          }
          
          /* Additional anti-save measures */
          .iframe-container {
            position: relative;
            user-select: none;
            -webkit-user-select: none;
          }
          
          /* More aggressive right-side coverage for Google Drive UI */
          @media screen and (min-width: 768px) {
            .right-overlay, .fixed-right-overlay {
              width: 100px;
            }
          }
          
          /* Prevent selection of text in the entire document viewer */
          .resume-container {
            user-select: none;
            -webkit-user-select: none;
            -moz-user-select: none;
            -ms-user-select: none;
          }
        `}
      </style>
      
      {/* Extra overlays to hide all UI elements with inline styles for extra protection */}
      <div className="right-overlay" style={{ position: 'absolute', right: 0, top: 0, height: '100%', width: '80px', background: 'white', zIndex: 1000 }}></div>
      <div className="top-right-corner" style={{ position: 'absolute', right: 0, top: 0, height: '80px', width: '80px', background: 'white', zIndex: 1001 }}></div>
      <div className="bottom-overlay" style={{ position: 'absolute', bottom: 0, left: 0, height: '50px', width: '100%', background: 'white', zIndex: 1000 }}></div>
      <div className="fixed-right-overlay" style={{ position: 'fixed', right: 0, top: 0, height: '100vh', width: '80px', background: 'white', zIndex: 9999 }}></div>
      
      {/* Additional protections for other potential UI controls */}
      <div style={{ position: 'absolute', top: '0', left: '0', width: '50px', height: '50px', background: 'white', zIndex: 1000 }}></div>
    </>
  );
};

export default ResumeOverlays;
