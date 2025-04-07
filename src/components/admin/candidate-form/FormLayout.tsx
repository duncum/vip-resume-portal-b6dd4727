
import React from "react";

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
