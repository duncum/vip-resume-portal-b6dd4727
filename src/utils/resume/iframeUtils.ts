
/**
 * Utilities for working with resume iframe content
 */

/**
 * Disables download buttons in the iframe
 */
export const disableDownloadButtons = (iframe: HTMLIFrameElement | null): void => {
  if (!iframe || !iframe.contentWindow || !iframe.contentDocument) {
    return;
  }
  
  try {
    // For Google Drive embeds
    const downloadButtons = iframe.contentDocument.querySelectorAll('a[aria-label="Download"]');
    downloadButtons.forEach(button => {
      if (button instanceof HTMLElement) {
        button.style.display = 'none';
      }
    });
    
    // For PDF.js embeds
    const pdfToolbar = iframe.contentDocument.querySelector('#toolbarContainer');
    if (pdfToolbar && pdfToolbar instanceof HTMLElement) {
      pdfToolbar.style.display = 'none';
    }
  } catch (error) {
    // Silent catch - cross-origin restrictions may prevent access
  }
};

/**
 * Observes iframe load events
 */
export const observeIframeLoad = (
  iframe: HTMLIFrameElement, 
  onLoad: () => void, 
  onError: () => void
): void => {
  if (!iframe) return;
  
  // Create an observer to watch for changes to the iframe
  const observer = new MutationObserver(() => {
    if (iframe.contentDocument?.body) {
      // Check if content loaded properly
      if (iframe.contentDocument.body.textContent?.includes('error') ||
          iframe.contentDocument.body.textContent?.includes('not found')) {
        onError();
      } else {
        onLoad();
      }
      observer.disconnect();
    }
  });
  
  // Start observing
  observer.observe(iframe, {
    attributes: true,
    childList: true,
    subtree: true
  });
  
  // Fallback - if iframe loads but observer doesn't trigger
  iframe.addEventListener('load', () => {
    setTimeout(() => {
      if (iframe.contentDocument?.body) {
        onLoad();
      } else {
        onError();
      }
      observer.disconnect();
    }, 500);
  });
  
  // Handle errors
  iframe.addEventListener('error', () => {
    onError();
    observer.disconnect();
  });
};
