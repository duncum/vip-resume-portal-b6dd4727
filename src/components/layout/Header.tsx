
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Search, Menu } from "lucide-react";
import { useState } from "react";

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  return (
    <header className="w-full bg-black/90 backdrop-blur-sm border-b border-gold/20 py-3">
      <div className="container mx-auto flex justify-between items-center px-4">
        <Link to="/" className="flex items-center gap-2">
          <img 
            src="/lovable-uploads/2c5dda64-7e25-4ca1-93ab-0de9e1d5fb16.png" 
            alt="VIP Employers Logo" 
            className="h-8 md:h-10"
          />
        </Link>
        
        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-6">
          <Link to="/candidates" className="text-grey-300 font-medium hover:text-gold transition-colors">
            Candidates
          </Link>
          <Link to="/admin" className="text-grey-300 font-medium hover:text-gold transition-colors">
            Admin
          </Link>
          <Button variant="ghost" className="flex items-center gap-1 text-grey-300 hover:text-gold" asChild>
            <Link to="/candidates">
              <Search size={18} />
              Search
            </Link>
          </Button>
        </div>
        
        {/* Mobile Menu Button */}
        <Button 
          variant="ghost" 
          size="icon" 
          className="md:hidden text-grey-300" 
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          <Menu />
        </Button>
      </div>
      
      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-black/95 border-b border-gold/10 animate-fade-in">
          <div className="container mx-auto px-4 py-4 flex flex-col space-y-3">
            <Link 
              to="/candidates" 
              className="text-grey-300 py-2 hover:text-gold transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Candidates
            </Link>
            <Link 
              to="/admin" 
              className="text-grey-300 py-2 hover:text-gold transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Admin
            </Link>
            <Link 
              to="/candidates" 
              className="text-grey-300 py-2 hover:text-gold transition-colors flex items-center gap-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              <Search size={18} />
              Search
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
