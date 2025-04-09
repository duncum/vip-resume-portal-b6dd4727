import ResumeViewer from "@/components/candidates/ResumeViewer";
import ResumeHeader from "./resume/ResumeHeader";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { trackIpAddress } from "@/utils/tracking";

interface CandidateResumeProps {
  resumeUrl: string;
  candidateId: string;
}

const CandidateResume = ({ resumeUrl, candidateId }: CandidateResumeProps) => {
  const [validatedUrl, setValidatedUrl] = useState<string>("");
  const [isUrlValid, setIsUrlValid] = useState<boolean>(true);
  
  useEffect(() => {
    console.log(`Validating resume for candidate ${candidateId}`, { resumeUrl });
    
    setIsUrlValid(true);
    
    if (!resumeUrl) {
      setIsUrlValid(false);
      return;
    }
    
    try {
      const isGoogleDriveLink = resumeUrl.includes('drive.google.com');
      
      if (isGoogleDriveLink) {
        if (resumeUrl.includes('/d/') || resumeUrl.includes('id=')) {
          console.log("Valid Google Drive link detected");
          setValidatedUrl(resumeUrl);
          trackIpAddress(candidateId, 'resume-view');
        } else {
          console.error("Invalid Google Drive link format:", resumeUrl);
          setIsUrlValid(false);
          toast.error("Invalid Google Drive link format", { id: "drive-link-error" });
        }
      } else {
        new URL(resumeUrl);
        setValidatedUrl(resumeUrl);
        trackIpAddress(candidateId, 'resume-view');
      }
    } catch (error) {
      console.error("Invalid URL format:", error);
      setIsUrlValid(false);
      
      if (resumeUrl && !resumeUrl.startsWith('http')) {
        const fixedUrl = `https://${resumeUrl}`;
        try {
          new URL(fixedUrl);
          console.log("Fixed URL by adding https://", fixedUrl);
          setValidatedUrl(fixedUrl);
          setIsUrlValid(true);
          trackIpAddress(candidateId, 'resume-view-fixed');
        } catch {
        }
      }
    }
  }, [resumeUrl, candidateId]);
  
  if (!isUrlValid || !validatedUrl) {
    return (
      <div className="border-t border-grey-700 pt-4 md:pt-6">
        <div className="bg-grey-900/30 p-6 rounded-md text-center">
          <p className="text-grey-400">
            {!resumeUrl 
              ? "No resume available for this candidate." 
              : "The resume link appears to be invalid."}
          </p>
        </div>
      </div>
    );
  }
  
  return (
    <div className="border-t border-grey-700 pt-4 md:pt-6">
      <ResumeHeader resumeUrl={validatedUrl} candidateId={candidateId} />
      <ResumeViewer fileUrl={validatedUrl} candidateId={candidateId} />
    </div>
  );
};

export default CandidateResume;
