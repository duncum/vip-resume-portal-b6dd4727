
import React from "react";

/**
 * Component to display an error message when the document fails to load
 */
const ResumeErrorState: React.FC = () => {
  return (
    <div className="h-[800px] flex items-center justify-center">
      <div className="flex flex-col items-center text-center px-4">
        <svg className="w-16 h-16 text-grey-500 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
        </svg>
        <h3 className="text-lg font-medium text-grey-700">Unable to display resume</h3>
        <p className="mt-2 text-grey-500">The resume might be unavailable or in an unsupported format.</p>
      </div>
    </div>
  );
};

export default ResumeErrorState;
