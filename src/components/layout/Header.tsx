
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";

const Header = () => {
  return (
    <header className="w-full bg-white border-b border-grey-200 py-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="flex items-center gap-2">
          <span className="font-display text-3xl font-bold">
            <span className="text-black">Candidate</span>
            <span className="text-gold">Portal</span>
          </span>
        </Link>
        
        <div className="flex items-center gap-4">
          <Link to="/" className="text-grey-700 font-medium hover:text-gold">
            Candidates
          </Link>
          <Link to="/admin" className="text-grey-700 font-medium hover:text-gold">
            Admin
          </Link>
          <Button variant="ghost" className="flex items-center gap-1" asChild>
            <Link to="/">
              <Search size={18} />
            </Link>
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
