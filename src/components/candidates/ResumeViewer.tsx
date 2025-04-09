
import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { trackIpAddress } from "@/utils/ipTracker";
import { getEmbedUrl } from "@/utils/resume/urlUtils";
import { 
  ResumeLoading, 
  ResumeError, 
  ResumeWatermark, 
  ResumeIframe 
} from "@/components/candidates/resume";

interface ResumeViewerProps {
  fileUrl: string;
  candidateId: string;
}

const ResumeViewer = ({ fileUrl, candidateId }: ResumeViewerProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  
  // Convert URL to embed format if needed (especially for Google Drive)
  const embedUrl = getEmbedUrl(fileUrl);
  
  // Log both URLs for debugging
  console.log("Resume URLs:", { 
    original: fileUrl,
    formatted: embedUrl,
    candidateId
  });
  
  useEffect(() => {
    // Track IP address when resume is viewed
    trackIpAddress(candidateId);
    
    // Reset states when URL changes
    setIsLoading(true);
    setIsError(false);
    
    // Set up timer to handle initial loading state
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);
    
    return () => clearTimeout(timer);
  }, [candidateId, fileUrl]);

  const handleIframeError = () => {
    setIsError(true);
    setIsLoading(false);
    console.error("Failed to load document:", embedUrl, "Original URL:", fileUrl);
  };

  const handleIframeLoad = () => {
    // Keep the loading state for a moment to ensure document is fully rendered
    setTimeout(() => {
      setIsLoading(false);
    }, 500);
  };

  return (
    <Card className="w-full border border-grey-200 bg-white">
      <CardContent className="p-0 relative">
        {isLoading ? (
          <ResumeLoading />
        ) : isError ? (
          <ResumeError />
        ) : (
          <div className="relative resume-container" id="resume-for-print">
            <ResumeWatermark />
            <ResumeIframe 
              embedUrl={embedUrl}
              onError={handleIframeError}
              onLoad={handleIframeLoad}
            />
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ResumeViewer;
