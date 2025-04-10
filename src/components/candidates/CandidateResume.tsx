
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import ResumeHeader from "./resume/ResumeHeader";
import ResumeIframe from "./resume/ResumeIframe";
import ResumeLoading from "./resume/ResumeLoading";
import ResumeError from "./resume/ResumeError";

interface CandidateResumeProps {
  resumeUrl?: string;
  candidateId: string;
}

const CandidateResume = ({ resumeUrl, candidateId }: CandidateResumeProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState(false);
  
  // Normalize resumeUrl - handle missing or empty values
  const normalizedResumeUrl = (resumeUrl && resumeUrl !== "Missing" && resumeUrl !== "") 
    ? resumeUrl 
    : "";
  
  // Clean up Google Drive URL if present
  let embedUrl = normalizedResumeUrl;
  
  // If we have a Google Drive URL, convert it to an embed URL
  if (embedUrl && embedUrl.includes("drive.google.com")) {
    if (embedUrl.includes("file/d/")) {
      const fileId = embedUrl.split("file/d/")[1].split("/")[0];
      embedUrl = `https://drive.google.com/file/d/${fileId}/preview`;
    } else if (embedUrl.includes("open?id=")) {
      const fileId = embedUrl.split("open?id=")[1].split("&")[0];
      embedUrl = `https://drive.google.com/file/d/${fileId}/preview`;
    }
  }
  
  // Handle loading state changes
  const handleLoad = () => {
    setIsLoading(false);
    setLoadError(false);
  };
  
  const handleError = () => {
    setIsLoading(false);
    setLoadError(true);
  };
  
  return (
    <Card className="mt-6 bg-gradient-to-b from-grey-900/50 to-grey-900/30 border border-grey-800/50 overflow-hidden">
      <CardContent className="p-4 md:p-6">
        <ResumeHeader resumeUrl={normalizedResumeUrl} candidateId={candidateId} />
        
        {!embedUrl ? (
          <div className="h-[400px] flex items-center justify-center">
            <div className="text-center px-4">
              <h3 className="text-lg font-medium text-grey-300">No Resume Available</h3>
              <p className="mt-2 text-grey-400">This candidate does not have a resume uploaded yet.</p>
            </div>
          </div>
        ) : (
          <>
            {isLoading && <ResumeLoading />}
            {loadError ? (
              <ResumeError />
            ) : (
              <ResumeIframe 
                embedUrl={embedUrl} 
                onLoad={handleLoad} 
                onError={handleError} 
              />
            )}
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default CandidateResume;
