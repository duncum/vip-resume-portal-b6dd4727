
/**
 * Utility functions for handling iframe security
 */

/**
 * Applies security measures to disable download buttons and other interactive elements
 * in the iframe to prevent unauthorized downloads
 */
export const disableDownloadButtons = (iframe: HTMLIFrameElement | null): void => {
  if (!iframe) return;
  
  try {
    // Try to access the iframe content
    const iframeDocument = iframe.contentDocument || 
                         (iframe.contentWindow?.document);
    
    if (iframeDocument) {
      // For Google Drive embeds - hide download buttons and toolbars
      const elementsToHide = [
        '[role="button"]',          // Generic buttons
        'button',                   // HTML buttons
        '.ndfHFb-c4YZDc-Wrql6b',    // Google Drive toolbar
        '.ndfHFb-c4YZDc-to915-LgbsSe', // Download buttons
        '.goog-inline-block',       // Google Drive UI elements
        '[aria-label*="Download"]', // Elements with aria labels for download
        '[aria-label*="Print"]',    // Elements with aria labels for print
        '[title*="Download"]',      // Elements with title containing Download
        '[title*="Print"]'          // Elements with title containing Print
      ];
      
      // Apply the selectors
      elementsToHide.forEach(selector => {
        const elements = iframeDocument.querySelectorAll(selector);
        elements.forEach(element => {
          if (element instanceof HTMLElement) {
            element.style.display = 'none';
            element.style.opacity = '0';
            element.style.visibility = 'hidden';
            // Also remove click listeners when possible
            element.onclick = (e) => e.preventDefault();
            element.style.pointerEvents = 'none';
          }
        });
      });
      
      // Disable all links
      const links = iframeDocument.querySelectorAll('a');
      links.forEach(link => {
        if (link instanceof HTMLElement) {
          link.style.pointerEvents = 'none';
          link.onclick = (e) => e.preventDefault();
        }
      });
      
      // Style scrollbars if needed
      const scrollElements = iframeDocument.querySelectorAll('.goog-inline-block');
      scrollElements.forEach((element) => {
        if (element instanceof HTMLElement) {
          element.style.scrollbarWidth = 'thin';
          element.style.scrollbarColor = '#888 #f1f1f1';
        }
      });
    }
  } catch (e) {
    // Silent catch - security restrictions prevent modifying cross-origin iframes
    console.log("Note: Unable to modify iframe content due to security restrictions");
  }
};
