
import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { trackIpAddress } from "@/utils/ipTracker";
import ResumeLoadingState from "./resume/LoadingState";
import ResumeErrorState from "./resume/ErrorState";
import DocumentViewer from "./resume/DocumentViewer";
import { getEmbedUrl } from "./resume/driveUtils";

interface ResumeViewerProps {
  fileUrl: string;
  candidateId: string;
}

const ResumeViewer = ({ fileUrl, candidateId }: ResumeViewerProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  
  const embedUrl = getEmbedUrl(fileUrl);

  useEffect(() => {
    // Track IP address when resume is viewed
    trackIpAddress(candidateId);
    
    // Simulate PDF loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);
    
    return () => clearTimeout(timer);
  }, [candidateId]);

  const handleIframeError = () => {
    setIsError(true);
    setIsLoading(false);
  };

  return (
    <Card className="w-full border border-grey-200 bg-white">
      <CardContent className="p-0 relative">
        {isLoading ? (
          <ResumeLoadingState />
        ) : isError ? (
          <ResumeErrorState />
        ) : (
          <DocumentViewer 
            embedUrl={embedUrl}
            onError={handleIframeError}
          />
        )}
      </CardContent>
    </Card>
  );
};

export default ResumeViewer;
