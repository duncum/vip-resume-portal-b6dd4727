
import React from 'react';

const ResumeLoading = () => {
  return (
    <div className="h-[800px] flex items-center justify-center">
      <div className="animate-pulse flex flex-col items-center">
        <div className="w-16 h-16 border-4 border-grey-300 border-t-gold rounded-full animate-spin"></div>
        <p className="mt-4 text-grey-500">Loading document...</p>
      </div>
    </div>
  );
};

export default ResumeLoading;
