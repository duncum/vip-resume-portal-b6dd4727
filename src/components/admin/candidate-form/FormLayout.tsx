
import React from "react";
import { useFormContext } from "./context/FormContext";
import FormHeader from "./FormHeader";
import { ResumeUploader } from "./resume-uploader";
import FormContent from "./FormContent";
import SubmitButton from "./SubmitButton";

interface FormLayoutProps {
  children: React.ReactNode;
}

const FormLayout = ({ children }: FormLayoutProps) => {
  return (
    <div className="max-w-4xl mx-auto">
      {children}
    </div>
  );
};

export default FormLayout;
