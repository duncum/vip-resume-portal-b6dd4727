
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";

const Header = () => {
  return (
    <header className="w-full bg-black/90 backdrop-blur-sm border-b border-gold/20 py-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/candidates" className="flex items-center gap-2">
          <span className="font-display text-3xl font-bold">
            <span className="text-white">VIP</span>
            <span className="text-gold">Employer Portal</span>
          </span>
        </Link>
        
        <div className="flex items-center gap-4">
          <Link to="/candidates" className="text-grey-300 font-medium hover:text-gold">
            Candidates
          </Link>
          <Link to="/admin" className="text-grey-300 font-medium hover:text-gold">
            Admin
          </Link>
          <Button variant="ghost" className="flex items-center gap-1 text-grey-300 hover:text-gold" asChild>
            <Link to="/candidates">
              <Search size={18} />
            </Link>
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
