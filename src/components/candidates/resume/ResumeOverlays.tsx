
import React from "react";

/**
 * Component that provides CSS styles and overlay elements
 * to prevent download UI elements in embedded documents
 */
const ResumeOverlays: React.FC = () => {
  return (
    <>
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
          
          /* Right side overlay to hide controls including download button */
          .right-overlay {
            position: absolute;
            top: 0;
            right: 0;
            width: 60px; 
            height: 100%;
            background: white;
            z-index: 100;
            pointer-events: none;
          }
          
          /* Fullscreen exit button remover */
          .top-right-corner {
            position: absolute;
            top: 0;
            right: 0;
            width: 60px;
            height: 60px;
            background: white;
            z-index: 101;
            pointer-events: none;
          }
          
          /* Fixed positioned overlay that stays in view when scrolling */
          .fixed-right-overlay {
            position: fixed;
            top: 0;
            right: 0;
            width: 60px;
            height: 100vh;
            background: white;
            z-index: 9999;
            pointer-events: none;
            display: none;
          }
          
          /* Show the fixed overlay only when inside an iframe */
          iframe:focus + .fixed-right-overlay {
            display: block;
          }
          
          /* Bottom control hider */
          .bottom-overlay {
            position: absolute;
            bottom: 0;
            left: 0;
            width: 100%;
            height: 40px;
            background: white;
            z-index: 100;
            pointer-events: none;
          }
        `}
      </style>
      
      {/* Extra overlays to hide all UI elements */}
      <div className="right-overlay"></div>
      <div className="top-right-corner"></div>
      <div className="bottom-overlay"></div>
      <div className="fixed-right-overlay"></div>
    </>
  );
};

export default ResumeOverlays;
