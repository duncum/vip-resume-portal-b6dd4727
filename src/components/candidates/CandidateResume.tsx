
import ResumeViewer from "@/components/candidates/ResumeViewer";
import ResumeHeader from "./resume/ResumeHeader";

interface CandidateResumeProps {
  resumeUrl: string;
  candidateId: string;
}

const CandidateResume = ({ resumeUrl, candidateId }: CandidateResumeProps) => {
  // Log the resume info for debugging
  console.log(`Rendering resume for candidate ${candidateId}`, { resumeUrl });
  
  // Check if the resumeUrl is a Google Drive link and format it if needed
  const isGoogleDriveLink = resumeUrl?.includes('drive.google.com');
  
  if (!resumeUrl) {
    return (
      <div className="border-t border-grey-700 pt-4 md:pt-6">
        <div className="bg-grey-900/30 p-6 rounded-md text-center">
          <p className="text-grey-400">No resume available for this candidate.</p>
        </div>
      </div>
    );
  }
  
  return (
    <div className="border-t border-grey-700 pt-4 md:pt-6">
      <ResumeHeader resumeUrl={resumeUrl} candidateId={candidateId} />
      <ResumeViewer fileUrl={resumeUrl} candidateId={candidateId} />
    </div>
  );
};

export default CandidateResume;
