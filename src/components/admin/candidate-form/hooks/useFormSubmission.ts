
import { useState } from "react";
import { toast } from "sonner";
import { addCandidate } from "@/utils/sheets";

export type FormData = {
  id: string;
  headline: string;
  levels: string[];
  titleCategories: string[];
  titles: Record<string, string[]>;
  summary: string;
  location: string;
  relocationPreference: string;
  skills: string[];
  assetTypes: string[];
  sectors: string[];
  tags: string[];
  resumeUrl: string;
  resumeText?: string;
  notableEmployers: string;
};

export type UseFormSubmissionParams = {
  candidateId: string;
  resumeUrl: string;
  resumeText: string;
  headline: string;
  summary: string;
  location: string;
  tags: string;
  relocationPreference: string;
  notableEmployers: string;
  selectedLevels: string[];
  selectedTitleCategories: string[];
  selectedTitles: Record<string, string[]>;
  customTitles: Record<string, string[]>;
  selectedSkills: string[];
  customSkills: string[];
  selectedAssetTypes: string[];
  customAssetTypes: string[];
  selectedSectors: string[];
  customSectors: string[];
  onSuccess?: () => void;
};

export function useFormSubmission(params: UseFormSubmissionParams) {
  const [isUploading, setIsUploading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const {
      candidateId,
      resumeUrl,
      resumeText,
      headline,
      summary,
      location,
      tags,
      relocationPreference,
      notableEmployers,
      selectedLevels,
      selectedTitleCategories,
      selectedTitles,
      customTitles,
      selectedSkills,
      customSkills,
      selectedAssetTypes,
      customAssetTypes,
      selectedSectors,
      customSectors,
      onSuccess
    } = params;

    if (!candidateId.trim()) {
      toast.error("Please enter a Candidate ID");
      return false;
    }
    
    if (!resumeUrl) {
      toast.error("Please upload a resume first");
      return false;
    }
    
    setIsUploading(true);
    
    // Prepare form data
    const candidateData: FormData = {
      id: candidateId,
      headline,
      levels: selectedLevels,
      titleCategories: selectedTitleCategories,
      titles: selectedTitles,
      summary,
      location,
      relocationPreference,
      skills: [...selectedSkills, ...customSkills.filter(s => s.trim() !== '')],
      assetTypes: [...selectedAssetTypes, ...customAssetTypes.filter(a => a.trim() !== '')],
      sectors: [...selectedSectors, ...customSectors.filter(s => s.trim() !== '')],
      tags: tags.split(',').map(tag => tag.trim()).filter(tag => tag !== ''),
      resumeUrl,
      resumeText,
      notableEmployers
    };
    
    try {
      const saved = await addCandidate(candidateData);
      
      if (saved) {
        toast.success("Resume uploaded and data saved to Google Sheets");
        
        if (onSuccess) {
          onSuccess();
        }
        
        return true;
      }
      return false;
    } catch (error) {
      console.error("Error in form submission:", error);
      toast.error("There was an error saving your data");
      return false;
    } finally {
      setIsUploading(false);
    }
  };

  return {
    isUploading,
    handleSubmit
  };
}
