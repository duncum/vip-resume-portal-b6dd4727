
import React from "react";
import HeadlineInput from "../HeadlineInput";
import SummaryInput from "../SummaryInput";
import TagsInput from "../TagsInput";
import LocationSection from "../LocationSection";
import NotableEmployersInput from "../NotableEmployersInput";

interface BasicInfoFormSectionProps {
  headline: string;
  setHeadline: (headline: string) => void;
  summary: string;
  setSummary: (summary: string) => void;
  location: string;
  setLocation: (location: string) => void;
  tags: string;
  setTags: (tags: string) => void;
  relocationPreference: string;
  setRelocationPreference: (preference: string) => void;
  notableEmployers: string;
  setNotableEmployers: (employers: string) => void;
  disabled?: boolean;
}

const BasicInfoFormSection = ({
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
  setNotableEmployers,
  disabled = false
}: BasicInfoFormSectionProps) => {
  return (
    <>
      <HeadlineInput 
        headline={headline} 
        onHeadlineChange={setHeadline} 
        disabled={disabled} 
      />
      
      <NotableEmployersInput 
        notableEmployers={notableEmployers}
        onNotableEmployersChange={setNotableEmployers}
        disabled={disabled}
      />
      
      <SummaryInput 
        summary={summary} 
        onSummaryChange={setSummary} 
        disabled={disabled} 
      />
      
      <TagsInput 
        tags={tags} 
        onTagsChange={setTags} 
        disabled={disabled} 
      />
      
      <LocationSection
        location={location}
        onLocationChange={setLocation}
        relocationPreference={relocationPreference}
        onRelocationChange={setRelocationPreference}
        disabled={disabled}
      />
    </>
  );
};

export default BasicInfoFormSection;
