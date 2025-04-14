
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";

const Header = () => {
  const location = useLocation();
  const isAuthenticated = localStorage.getItem("agreement-accepted") === "true";
  
  return (
    <header className="bg-black border-b border-gray-800 py-4">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <Link to="/" className="text-2xl font-bold text-amber-500">
            TalentVault
          </Link>
        </div>
        
        <nav className="hidden md:flex items-center space-x-1">
          <Link to="/" className="px-3 py-2 text-gray-300 hover:text-white rounded-md">
            Home
          </Link>
          
          {isAuthenticated && (
            <Link 
              to="/candidates" 
              className={`px-3 py-2 rounded-md ${
                location.pathname.includes("/candidates") 
                  ? "text-amber-500 font-medium" 
                  : "text-gray-300 hover:text-white"
              }`}
            >
              Candidates
            </Link>
          )}
        </nav>
        
        <div className="flex items-center space-x-4">
          {isAuthenticated ? (
            <Button 
              variant="outline" 
              size="sm"
              className="border-amber-500/50 text-amber-500 hover:bg-amber-500/10"
              onClick={() => {
                localStorage.removeItem("agreement-accepted");
                window.location.href = "/";
              }}
            >
              Sign Out
            </Button>
          ) : (
            location.pathname !== "/agreement" && (
              <Button 
                variant="outline" 
                size="sm"
                className="border-amber-500/50 text-amber-500 hover:bg-amber-500/10"
                onClick={() => {
                  window.location.href = "/agreement";
                }}
              >
                Enter Portal
              </Button>
            )
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
