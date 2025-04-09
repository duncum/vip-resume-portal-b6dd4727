
import React from "react";
import { useFormContext } from "../context/FormContext";
import { ResumeUploader } from "../resume-uploader";
import HeadlineInput from "../HeadlineInput";
import SummaryInput from "../SummaryInput";
import LocationSection from "../LocationSection";
import TagsInput from "../TagsInput";
import NotableEmployersInput from "../NotableEmployersInput";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { CandidateIdInput } from "../resume-uploader/components";

interface BasicInfoFormSectionProps {
  disabled?: boolean;
}

const BasicInfoFormSection = ({ disabled = false }: BasicInfoFormSectionProps) => {
  const {
    candidateId,
    setCandidateId,
    resumeUrl,
    setResumeUrl,
    resumeText,
    setResumeText,
    headline,
    setHeadline,
    summary,
    setSummary,
    location,
    setLocation,
    tags,
    setTags,
    relocationPreference,
    setRelocationPreference,
    notableEmployers,
    setNotableEmployers
  } = useFormContext();

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl font-bold">Basic Information</CardTitle>
        <CardDescription>
          Enter the candidate's basic details and upload their resume
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Display the Candidate ID input first */}
        <div className="space-y-4">
          <div className="bg-blue-50 p-4 rounded-md mb-4 flex items-center gap-2">
            <span className="text-blue-600 font-medium text-sm">Step 1:</span>
            <span className="text-slate-700">Enter a Candidate ID below</span>
          </div>
          
          <CandidateIdInput 
            candidateId={candidateId}
            onCandidateIdChange={setCandidateId}
            disabled={disabled}
          />
        </div>
        
        {/* Then display the Resume Uploader */}
        <div>
          <div className="bg-blue-50 p-4 rounded-md mb-4 flex items-center gap-2">
            <span className="text-blue-600 font-medium text-sm">Step 2:</span>
            <span className="text-slate-700">Upload candidate's resume</span>
          </div>
          
          <ResumeUploader
            candidateId={candidateId}
            onCandidateIdChange={setCandidateId}
            onResumeUrlChange={setResumeUrl}
            onResumeTextChange={setResumeText}
            disabled={disabled}
          />
        </div>
        
        {/* Then the rest of the form fields */}
        <HeadlineInput
          headline={headline}
          onHeadlineChange={setHeadline}
          disabled={disabled}
        />
        
        <SummaryInput
          summary={summary}
          onSummaryChange={setSummary}
          disabled={disabled}
        />
        
        <LocationSection
          location={location}
          onLocationChange={setLocation}
          relocationPreference={relocationPreference}
          onRelocationPreferenceChange={setRelocationPreference}
          disabled={disabled}
        />
        
        <TagsInput
          tags={tags}
          onTagsChange={setTags}
          disabled={disabled}
        />
        
        <NotableEmployersInput
          notableEmployers={notableEmployers}
          onNotableEmployersChange={setNotableEmployers}
          disabled={disabled}
        />
      </CardContent>
    </Card>
  );
};

export default BasicInfoFormSection;
