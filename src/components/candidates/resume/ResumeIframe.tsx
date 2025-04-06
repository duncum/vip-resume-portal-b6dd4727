
import React, { useRef, useEffect } from 'react';
import { disableDownloadButtons } from '@/utils/resume/iframeUtils';

interface ResumeIframeProps {
  embedUrl: string;
  onError: () => void;
  onLoad: () => void;
}

const ResumeIframe = ({ embedUrl, onError, onLoad }: ResumeIframeProps) => {
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    // Apply security measures periodically
    const securityInterval = setInterval(() => {
      disableDownloadButtons(iframeRef.current);
    }, 1000); // Check every second
    
    return () => clearInterval(securityInterval);
  }, []);

  const handleLoad = () => {
    // Apply security measures immediately when iframe loads
    disableDownloadButtons(iframeRef.current);
    onLoad();
  };

  return (
    <iframe
      ref={iframeRef}
      src={embedUrl}
      className="w-full h-[800px] border-0 print:h-auto print:min-h-screen"
      title="Resume PDF"
      onError={onError}
      onLoad={handleLoad}
      frameBorder="0"
      allowFullScreen
      id="resume-iframe"
      sandbox="allow-same-origin allow-scripts allow-forms"
    />
  );
};

export default ResumeIframe;
