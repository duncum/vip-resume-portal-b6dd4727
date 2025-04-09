
import ResumeViewer from "@/components/candidates/ResumeViewer";
import ResumeHeader from "./resume/ResumeHeader";
import { useEffect, useState } from "react";
import { toast } from "sonner";

interface CandidateResumeProps {
  resumeUrl: string;
  candidateId: string;
}

const CandidateResume = ({ resumeUrl, candidateId }: CandidateResumeProps) => {
  const [validatedUrl, setValidatedUrl] = useState<string>("");
  const [isUrlValid, setIsUrlValid] = useState<boolean>(true);
  
  // Validate and process the URL when it changes
  useEffect(() => {
    // Log the resume info for debugging
    console.log(`Validating resume for candidate ${candidateId}`, { resumeUrl });
    
    // Clear previous state
    setIsUrlValid(true);
    
    if (!resumeUrl) {
      setIsUrlValid(false);
      return;
    }
    
    // Validate URL format
    try {
      // Check if it's a Google Drive link
      const isGoogleDriveLink = resumeUrl.includes('drive.google.com');
      
      // For Google Drive links, we need some extra validation
      if (isGoogleDriveLink) {
        // Make sure we can extract a file ID
        if (resumeUrl.includes('/d/') || resumeUrl.includes('id=')) {
          console.log("Valid Google Drive link detected");
          setValidatedUrl(resumeUrl);
        } else {
          console.error("Invalid Google Drive link format:", resumeUrl);
          setIsUrlValid(false);
          toast.error("Invalid Google Drive link format", { id: "drive-link-error" });
        }
      } else {
        // For other URLs, basic validation
        new URL(resumeUrl); // This will throw if the URL is invalid
        setValidatedUrl(resumeUrl);
      }
    } catch (error) {
      console.error("Invalid URL format:", error);
      setIsUrlValid(false);
      
      // If it looks like a partial URL, try to fix it
      if (resumeUrl && !resumeUrl.startsWith('http')) {
        const fixedUrl = `https://${resumeUrl}`;
        try {
          new URL(fixedUrl);
          console.log("Fixed URL by adding https://", fixedUrl);
          setValidatedUrl(fixedUrl);
          setIsUrlValid(true);
        } catch {
          // Still invalid
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
