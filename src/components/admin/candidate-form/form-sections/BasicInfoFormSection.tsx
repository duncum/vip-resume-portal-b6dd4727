
import React from "react";
import { useFormContext } from "../context/FormContext";
import HeadlineInput from "../HeadlineInput";
import SummaryInput from "../SummaryInput";
import TagsInput from "../TagsInput";
import LocationSection from "../LocationSection";
import NotableEmployersInput from "../NotableEmployersInput";

interface BasicInfoFormSectionProps {
  disabled?: boolean;
}

const BasicInfoFormSection = ({ disabled = false }: BasicInfoFormSectionProps) => {
  const {
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
  } = useFormContext();
  
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
