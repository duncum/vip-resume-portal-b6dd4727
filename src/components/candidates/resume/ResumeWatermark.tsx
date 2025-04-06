
import React from 'react';

const ResumeWatermark = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-10 print:block" id="resume-watermark">
      <div className="absolute inset-0 flex flex-col">
        {/* Generate multiple rows to ensure coverage for any document length */}
        {[...Array(20)].map((_, rowIndex) => (
          <div 
            key={`row-${rowIndex}`} 
            className={`flex justify-between px-12 py-24 ${rowIndex % 2 === 0 ? '' : 'ml-32'}`}
          >
            {[...Array(3)].map((_, colIndex) => (
              <div 
                key={`watermark-${rowIndex}-${colIndex}`} 
                className="transform -rotate-45 opacity-20 print:opacity-30"
              >
                <img 
                  src="/lovable-uploads/2b0b5215-0006-407b-97e0-707e78f84b1d.png" 
                  alt="CRE Confidential" 
                  className="w-52"
                />
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ResumeWatermark;
