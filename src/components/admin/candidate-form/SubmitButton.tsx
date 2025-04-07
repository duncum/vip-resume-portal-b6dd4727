
import React from "react";
import { Button } from "@/components/ui/button";
import { useFormContext } from "./context/FormContext";

interface SubmitButtonProps {
  disabled?: boolean;
}

const SubmitButton = ({ disabled: propDisabled }: SubmitButtonProps) => {
  const { isUploading, handleSubmit } = useFormContext();
  
  return (
    <Button 
      type="submit" 
      className="w-full bg-gold hover:bg-gold-dark text-white"
      disabled={isUploading || propDisabled}
      onClick={(e) => {
        e.preventDefault();
        handleSubmit(e);
      }}
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
