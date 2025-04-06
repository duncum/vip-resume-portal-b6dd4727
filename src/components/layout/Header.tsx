
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [hasAgreed, setHasAgreed] = useState(false);
  
  useEffect(() => {
    // Check if user has agreed to the contract
    const agreed = localStorage.getItem("contract-agreed") === "true";
    setHasAgreed(agreed);
    
    // Add scroll event listener to detect when header should change appearance
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    
    window.addEventListener("scroll", handleScroll);
    
    // Check scroll position immediately
    handleScroll();
    
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  
  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 py-4 px-6 ${
        scrolled ? "bg-black/90 backdrop-blur-md shadow-md" : "bg-transparent"
      }`}
    >
      <div className="container mx-auto">
        <div className="flex justify-between items-center">
          <Link to="/" className="flex items-center">
            <img 
              src="/lovable-uploads/2c5dda64-7e25-4ca1-93ab-0de9e1d5fb16.png" 
              alt="Executive Connect Logo" 
              className="h-10"
            />
          </Link>
          
          <nav className="hidden md:flex space-x-6 items-center">
            <Link to="/" className="text-grey-300 hover:text-gold transition-colors">
              Home
            </Link>
            {hasAgreed && (
              <>
                <Link to="/candidates" className="text-grey-300 hover:text-gold transition-colors">
                  Candidates
                </Link>
                <Link to="/admin" className="text-grey-300 hover:text-gold transition-colors">
                  Admin
                </Link>
              </>
            )}
            
            <Button 
              variant="outline" 
              className="border-gold text-gold hover:bg-gold/10 ml-4" 
              asChild
            >
              <Link to={hasAgreed ? "/candidates" : "/agreement"}>
                {hasAgreed ? "View Candidates" : "Get Access"}
              </Link>
            </Button>
          </nav>
          
          {/* Mobile menu button (only shown on smaller screens) */}
          <div className="md:hidden">
            <Button 
              variant="outline" 
              className="border-gold/70 text-gold hover:bg-gold/10" 
              asChild
            >
              <Link to={hasAgreed ? "/candidates" : "/agreement"}>
                {hasAgreed ? "View Candidates" : "Get Access"}
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
