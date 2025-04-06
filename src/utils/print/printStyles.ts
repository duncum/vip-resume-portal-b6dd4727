
/**
 * Returns the CSS styles for the print document
 */
export const getPrintStyles = (): string => {
  return `
    body { 
      margin: 0; 
      padding: 0; 
      position: relative;
      height: 100%;
    }
    
    /* Watermark styles with improved coverage */
    .watermark-container {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      z-index: 1000;
      pointer-events: none;
      overflow: hidden;
      background: rgba(255,255,255,0.1);
    }
    
    .watermark-grid {
      display: flex;
      flex-direction: column;
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      transform: rotate(-45deg);
      transform-origin: center center;
      padding: 100px;
    }
    
    .watermark-row {
      display: flex;
      justify-content: space-around;
      margin: 40px 0;
    }
    
    .watermark {
      opacity: 0.15;
      width: 100px;
      margin: 0 50px;
      flex-shrink: 0;
    }
    
    .document-container {
      width: 100%;
      height: 100vh;
      position: relative;
      z-index: 1;
    }
    
    iframe {
      width: 100%;
      height: 100vh;
      border: none;
      display: block;
    }
    
    /* Critical print styling */
    @media print {
      @page {
        size: auto;
        margin: 0mm;
      }
      
      html, body {
        height: 100%;
        width: 100%;
        margin: 0;
        padding: 0;
      }
      
      .watermark-container {
        position: fixed;
        display: block !important;
        z-index: 9999;
        opacity: 1 !important;
      }
      
      .watermark { 
        opacity: 0.25 !important; 
        -webkit-print-color-adjust: exact !important;
        print-color-adjust: exact !important;
        color-adjust: exact !important;
      }
      
      /* Force background printing */
      * { 
        -webkit-print-color-adjust: exact !important;
        print-color-adjust: exact !important;
        color-adjust: exact !important;
      }
      
      iframe {
        height: auto !important;
        min-height: 100vh !important;
      }
    }
  `;
};
