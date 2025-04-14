
import { Link } from "react-router-dom";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-black border-t border-gray-800 py-6">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-amber-500 font-medium mb-3">TalentVault</h3>
            <p className="text-gray-400 text-sm">
              Your exclusive portal for top-tier talent discovery.
            </p>
          </div>
          
          <div>
            <h3 className="text-amber-500 font-medium mb-3">Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/" className="text-gray-400 hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/agreement" className="text-gray-400 hover:text-white transition-colors">
                  Agreement
                </Link>
              </li>
              <li>
                <Link to="/candidates" className="text-gray-400 hover:text-white transition-colors">
                  Candidates
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-amber-500 font-medium mb-3">Legal</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  Terms of Service
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  Confidentiality
                </a>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="mt-8 pt-6 border-t border-gray-800 text-center text-gray-500 text-sm">
          <p>© {currentYear} TalentVault. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
