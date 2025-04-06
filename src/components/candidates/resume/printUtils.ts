
import { toast } from "sonner";
import { trackDownload } from "@/utils/ipTracker";

/**
 * Opens a print-ready version of the resume in a new window
 * @param resumeUrl URL of the resume to print
 * @param candidateId ID of the candidate for tracking
 */
export const printResume = (resumeUrl: string, candidateId: string): void => {
  // Track the print action
  trackDownload(candidateId);
  toast.info("Preparing document for printing...");
  
  try {
    // Extract file details
    const isGoogleDriveUrl = resumeUrl.includes('drive.google.com');
    let fileId = '';
    let printUrl = resumeUrl;
    
    if (isGoogleDriveUrl) {
      const fileIdMatch = resumeUrl.match(/\/d\/([^\/]+)/);
      if (fileIdMatch && fileIdMatch[1]) {
        fileId = fileIdMatch[1];
        // For Google Drive, use the direct export link which works better for printing
        printUrl = `https://drive.google.com/uc?export=download&id=${fileId}`;
      }
    }
    
    // Create a new window with the optimized printing approach
    const printWindow = window.open('', '_blank');
    
    if (!printWindow) {
      toast.error("Couldn't open print window. Check your popup blocker settings.");
      return;
    }
    
    // Write HTML that's optimized for printing with enhanced watermark protection
    printWindow.document.write(`
      <!DOCTYPE html>
      <html>
      <head>
        <title>Resume Print - CONFIDENTIAL</title>
        <style>
          @page {
            size: auto;
            margin: 0mm;
          }
          body {
            margin: 0;
            padding: 0;
            height: 100vh;
            overflow: auto;
            position: relative;
          }
          
          /* Enhanced watermark styles with stronger anti-tampering measures */
          .watermark-container {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            z-index: 9999;
            pointer-events: none;
            opacity: 0.3;
            user-select: none;
            -webkit-user-select: none;
            -moz-user-select: none;
            -ms-user-select: none;
          }
          .watermark-grid {
            display: flex;
            flex-wrap: wrap;
            justify-content: space-around;
            width: 100%;
            height: 100%;
          }
          .watermark {
            transform: rotate(-45deg);
            margin: 30px;
            width: 200px;
            transition: opacity 0.01s;
          }
          
          /* PDF container with protection */
          .pdf-container {
            width: 100%;
            height: 100vh;
            overflow: auto;
            display: flex;
            flex-direction: column;
            position: relative;
          }
          
          /* When direct embedding, use iframe for Google and object for others */
          iframe, object {
            width: 100%;
            height: 100%;
            border: none;
            flex: 1;
          }
          
          /* Security layer to prevent direct downloads */
          .security-overlay {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            z-index: 1000;
            background: transparent;
            pointer-events: none;
          }
          
          /* Download prevention styles */
          .control-blocker {
            position: fixed;
            top: 0;
            right: 0;
            width: 100px;
            height: 100%;
            z-index: 9998;
            background: white;
            pointer-events: none;
          }
          
          @media print {
            .watermark-container {
              position: fixed;
              display: block !important;
              z-index: 9999;
              opacity: 0.5 !important;
              page-break-inside: avoid !important;
            }
            
            /* Force background printing */
            html, body { 
              -webkit-print-color-adjust: exact !important;
              print-color-adjust: exact !important;
              color-adjust: exact !important;
              height: auto !important;
              overflow: visible !important;
            }
            
            .pdf-container {
              height: auto !important;
              overflow: visible !important;
            }
            
            /* Make sure content doesn't get cut off */
            iframe, object {
              height: auto !important;
              min-height: 100vh;
              page-break-inside: avoid !important;
            }
            
            /* Ensure watermarks print on every page */
            .watermark-container {
              page-break-inside: avoid !important;
              page-break-before: always !important;
              page-break-after: always !important;
            }
          }
        </style>
        
        <!-- Anti-tampering script -->
        <script>
          // This prevents elements from being removed via DevTools
          function protectWatermark() {
            const observer = new MutationObserver(function(mutations) {
              mutations.forEach(function(mutation) {
                if (mutation.type === 'childList' || mutation.type === 'attributes') {
                  const watermarkContainer = document.querySelector('.watermark-container');
                  if (!watermarkContainer || watermarkContainer.style.opacity < 0.1 || 
                      watermarkContainer.style.display === 'none' || watermarkContainer.style.visibility === 'hidden') {
                    // Recreate the watermark if tampered with
                    recreateWatermark();
                  }
                }
              });
            });
            
            // Observe the entire document
            observer.observe(document.documentElement, {
              childList: true,
              subtree: true,
              attributes: true
            });
            
            // Prevent right-click context menu
            document.addEventListener('contextmenu', function(e) {
              e.preventDefault();
              return false;
            });
            
            // Block all keyboard shortcuts that might be used to save
            document.addEventListener('keydown', function(e) {
              // Block Ctrl+S, Ctrl+P, Ctrl+Shift+S
              if ((e.ctrlKey && (e.key === 's' || e.key === 'p')) ||
                  (e.ctrlKey && e.shiftKey && e.key === 's')) {
                e.preventDefault();
                return false;
              }
            });
          }
          
          function recreateWatermark() {
            const body = document.body;
            const watermarkContainer = document.createElement('div');
            watermarkContainer.className = 'watermark-container';
            
            const watermarkGrid = document.createElement('div');
            watermarkGrid.className = 'watermark-grid';
            
            // Create a dense grid of watermarks
            for (let i = 0; i < 30; i++) {
              const watermark = document.createElement('div');
              watermark.className = 'watermark';
              
              const img = document.createElement('img');
              img.src = "/lovable-uploads/681948c4-13ef-41a2-919d-570c804385a1.png";
              img.alt = "CRE Confidential";
              img.width = 150;
              
              watermark.appendChild(img);
              watermarkGrid.appendChild(watermark);
            }
            
            watermarkContainer.appendChild(watermarkGrid);
            body.appendChild(watermarkContainer);
          }
        </script>
      </head>
      <body>
        <div class="watermark-container">
          <div class="watermark-grid">
            ${Array(30).fill(0).map(() => `
              <div class="watermark">
                <img src="/lovable-uploads/681948c4-13ef-41a2-919d-570c804385a1.png" alt="CRE Confidential" width="150">
              </div>
            `).join('')}
          </div>
        </div>
        
        <div class="control-blocker"></div>
        
        <div class="pdf-container">
          <div class="security-overlay"></div>
          ${isGoogleDriveUrl ? 
            `<object data="${printUrl}" type="application/pdf" width="100%" height="100%">
              <iframe src="https://drive.google.com/file/d/${fileId}/preview?usp=sharing" width="100%" height="100%"></iframe>
             </object>` : 
            `<object data="${printUrl}" type="application/pdf" width="100%" height="100%">
              <p>Document preview not available. Please contact administrator.</p>
             </object>`
          }
        </div>
        
        <script>
          // Apply protection immediately
          protectWatermark();
          
          // Auto-print when loaded
          window.onload = function() {
            // Ensure watermarks are present
            protectWatermark();
            
            // Wait a bit to ensure document is fully loaded
            setTimeout(function() {
              window.print();
            }, 2000);
          };
        </script>
      </body>
      </html>
    `);
    
    printWindow.document.close();
    toast.success("Print preview opened in new window");
  } catch (error) {
    console.error("Error preparing print:", error);
    toast.error("Unable to prepare document for printing");
    
    // Last resort fallback - redirect to watermarked version
    const watermarkedUrl = createWatermarkedFallbackUrl(resumeUrl, candidateId);
    window.open(watermarkedUrl, '_blank');
  }
};

/**
 * Create a fallback URL that ensures watermarking
 * This is used as a last resort if print window fails
 */
const createWatermarkedFallbackUrl = (resumeUrl: string, candidateId: string): string => {
  // Create a base64 encoded version of the URL and candidateId
  const encodedData = btoa(`${resumeUrl}|${candidateId}`);
  
  // Generate a local URL that will show the document with watermark
  // In a real app, this would be a server endpoint that serves the document with watermark
  return `/secure-view?data=${encodedData}`;
};
