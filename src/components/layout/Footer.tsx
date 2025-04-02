
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="w-full bg-black/80 border-t border-gold/10 py-4 mt-auto">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center px-4">
        <Link to="/" className="mb-2 md:mb-0">
          <img 
            src="/lovable-uploads/2c5dda64-7e25-4ca1-93ab-0de9e1d5fb16.png" 
            alt="VIP Employers Logo" 
            className="h-10"
          />
        </Link>
        
        <div className="text-center md:text-right">
          <p className="text-grey-400 text-sm">
            &copy; {new Date().getFullYear()} VIP Employer Portal. All rights reserved.
          </p>
          <p className="text-grey-500 text-xs mt-1">
            All candidate information is confidential.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
