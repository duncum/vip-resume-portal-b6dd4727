
import React from 'react';

// Custom Google icon since lucide-react doesn't have one
const GoogleIcon = ({ className = "", size = 24, ...props }: React.SVGProps<SVGSVGElement>) => {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      width={size} 
      height={size} 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      className={className}
      {...props}
    >
      <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" />
      <path d="M17.4 12H12V14H15.1C14.8 15.3 13.5 16.2 12 16.2C10.1 16.2 8.6 14.7 8.6 12.8C8.6 11 10.1 9.4 12 9.4C12.8 9.4 13.6 9.7 14.2 10.2L15.7 8.6C14.6 7.6 13.3 7 12 7C8.7 7 6 9.7 6 13C6 16.3 8.7 19 12 19C15.3 19 17.6 16.8 17.6 13.2C17.6 12.8 17.5 12.4 17.4 12Z" />
    </svg>
  );
};

export default GoogleIcon;
