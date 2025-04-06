
import { getPrintStyles } from "./printStyles";

/**
 * Generates the watermark HTML pattern for the print document
 */
export const generateWatermarkHTML = (): string => {
  const watermarkRows = 20; // More rows for better coverage
  const watermarksPerRow = 10;
  
  return Array(watermarkRows).fill(0).map(() => {
    return `<div class="watermark-row">
      ${Array(watermarksPerRow).fill(0).map(() => `
        <div class="watermark">
          <img src="/lovable-uploads/2b0b5215-0006-407b-97e0-707e78f84b1d.png" alt="CRE Confidential" width="100%">
        </div>
      `).join('')}
    </div>`;
  }).join('');
};

/**
 * Generates the complete HTML document for printing
 */
export const generatePrintDocument = (
  watermarkHTML: string, 
  isGoogleDriveUrl: boolean, 
  fileId: string, 
  resumeUrl: string
): string => {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <title>Resume Print</title>
      <style>
        ${getPrintStyles()}
      </style>
    </head>
    <body>
      <div class="watermark-container">
        <div class="watermark-grid">
          ${watermarkHTML}
        </div>
      </div>
      
      <div class="document-container">
        ${isGoogleDriveUrl ? 
          `<iframe src="https://drive.google.com/file/d/${fileId}/preview?usp=sharing&nocopy=true&embedded=true&rm=minimal"></iframe>` : 
          `<iframe src="${resumeUrl}"></iframe>`
        }
      </div>
      
      <script>
        ${getPrintDocumentScript()}
      </script>
    </body>
    </html>
  `;
};

/**
 * Returns the JavaScript for the print document
 */
const getPrintDocumentScript = (): string => {
  return `
    // Auto-print when loaded
    window.onload = function() {
      // Wait for iframe to load
      const iframe = document.querySelector('iframe');
      iframe.onload = function() {
        setTimeout(function() {
          // Try to access iframe contents to remove download buttons
          try {
            const iframeDocument = iframe.contentDocument || 
                                  (iframe.contentWindow && iframe.contentWindow.document);
            
            if (iframeDocument) {
              // Hide any download/print buttons (broader selectors)
              const buttons = iframeDocument.querySelectorAll('[role="button"], button, .ndfHFb-c4YZDc-Wrql6b, .goog-inline-block, .ndfHFb-c4YZDc-to915-LgbsSe');
              buttons.forEach(function(button) {
                if (button instanceof HTMLElement) {
                  button.style.display = 'none';
                }
              });
              
              // Force disable interactive elements
              const clickables = iframeDocument.querySelectorAll('a, [onClick], [role="link"]');
              clickables.forEach(function(element) {
                if (element instanceof HTMLElement) {
                  element.style.pointerEvents = 'none';
                }
              });
            }
          } catch(e) {
            console.log("Note: Unable to modify iframe content due to security restrictions");
          }
          
          // Trigger print
          window.print();
          
          // After printing, wait briefly then notify user
          setTimeout(function() {
            document.body.innerHTML += '<div style="position:fixed;top:0;left:0;right:0;background:#4CAF50;color:white;padding:15px;text-align:center;z-index:9999">Print job sent to printer. You may close this window.</div>';
          }, 1000);
        }, 1500);
      };
    };
  `;
};
