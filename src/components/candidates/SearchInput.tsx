
import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, X } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

interface SearchInputProps {
  onSearch: (query: string) => void;
}

const SearchInput = ({ onSearch }: SearchInputProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const isMobile = useIsMobile();

  // Trigger search on input change with small debounce
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      onSearch(searchQuery);
    }, 300);
    
    return () => clearTimeout(timeoutId);
  }, [searchQuery, onSearch]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchQuery);
  };

  const clearSearch = () => {
    setSearchQuery("");
    onSearch("");
  };

  return (
    <form onSubmit={handleSearch} className="flex gap-2 items-center mb-4 md:mb-6">
      <div className="relative flex-grow">
        <Search className="absolute left-2 md:left-3 top-1/2 transform -translate-y-1/2 text-grey-400" size={isMobile ? 16 : 18} />
        <Input
          type="text"
          placeholder={isMobile ? "Search..." : "Search by skills, position, or keywords..."}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-8 md:pl-10 bg-white/5 text-sm md:text-base border-2 border-grey-800 focus:border-gold h-9 md:h-10"
        />
        {searchQuery && (
          <button
            type="button"
            onClick={clearSearch}
            className="absolute right-2 md:right-3 top-1/2 transform -translate-y-1/2 text-grey-400 hover:text-grey-700"
          >
            <X size={isMobile ? 14 : 16} />
          </button>
        )}
      </div>
      <Button 
        type="submit" 
        className="bg-gold hover:bg-gold-dark text-white text-sm md:text-base h-9 md:h-10 px-3 md:px-4"
      >
        {isMobile ? <Search size={16} /> : "Search"}
      </Button>
    </form>
  );
};

export default SearchInput;
