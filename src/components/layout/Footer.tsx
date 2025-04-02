
import { Link } from "react-router-dom";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="w-full bg-black border-t border-gold/10 py-10 mt-auto">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-6 md:mb-0">
            <Link to="/" className="block">
              <img 
                src="/lovable-uploads/2c5dda64-7e25-4ca1-93ab-0de9e1d5fb16.png" 
                alt="VIP Employers Logo" 
                className="h-12"
              />
            </Link>
          </div>
          
          <div className="mb-6 md:mb-0 md:order-3">
            <p className="text-grey-400 text-sm">
              &copy; {currentYear} Executive Network. All rights reserved.
            </p>
            <p className="text-grey-500 text-xs mt-1">
              All candidate information is strictly confidential.
            </p>
          </div>
          
          <div className="flex space-x-8 md:order-2">
            <Link to="/" className="text-grey-300 hover:text-gold transition-colors text-sm">
              Privacy
            </Link>
            <Link to="/" className="text-grey-300 hover:text-gold transition-colors text-sm">
              Terms
            </Link>
            <Link to="/" className="text-grey-300 hover:text-gold transition-colors text-sm">
              Contact
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
