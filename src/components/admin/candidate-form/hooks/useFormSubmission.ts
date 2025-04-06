
import { useState } from "react";
import { toast } from "sonner";
import { ensureAuthorization } from "@/utils/sheets/auth-helper";
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
  notableEmployers: string;
};

type UseFormSubmissionParams = {
  onSuccess?: () => void;
  resetForm: () => void;
};

export function useFormSubmission({ onSuccess, resetForm }: UseFormSubmissionParams) {
  const [isUploading, setIsUploading] = useState(false);

  const submitForm = async (candidateData: FormData): Promise<boolean> => {
    if (!candidateData.id.trim()) {
      toast.error("Please enter a Candidate ID");
      return false;
    }
    
    if (!candidateData.resumeUrl) {
      toast.error("Please upload a resume first");
      return false;
    }
    
    setIsUploading(true);
    
    console.log("Candidate data:", candidateData);
    
    try {
      const saved = await addCandidate(candidateData);
      
      if (saved) {
        toast.success("Resume uploaded and data saved to Google Sheets");
        
        if (onSuccess) {
          onSuccess();
        }
        
        resetForm();
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
    submitForm
  };
}
