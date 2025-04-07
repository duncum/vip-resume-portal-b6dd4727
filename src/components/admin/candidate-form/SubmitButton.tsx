
import React from "react";
import { Button } from "@/components/ui/button";

interface SubmitButtonProps {
  isUploading: boolean;
  disabled?: boolean;
}

const SubmitButton = ({ isUploading, disabled }: SubmitButtonProps) => {
  return (
    <Button 
      type="submit" 
      className="w-full bg-gold hover:bg-gold-dark text-white"
      disabled={isUploading || disabled}
    >
      {isUploading ? (
        <>
          <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
          Uploading...
        </>
      ) : (
        "Upload Resume"
      )}
    </Button>
  );
};

export default SubmitButton;
