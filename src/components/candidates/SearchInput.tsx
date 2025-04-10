
import { useState, useEffect, useRef } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, X } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

interface SearchInputProps {
  onSearch: (query: string) => void;
}

const SearchInput = ({ onSearch }: SearchInputProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const isMobile = useIsMobile();
  const debounceTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Clean up function to clear any existing timers
  const clearDebounceTimer = () => {
    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
      debounceTimerRef.current = null;
    }
  };

  // Trigger search on input change with debounce
  useEffect(() => {
    setIsTyping(true);
    clearDebounceTimer();
    
    // Set a new timer
    debounceTimerRef.current = setTimeout(() => {
      onSearch(searchQuery);
      setIsTyping(false);
    }, 300);
    
    // Clean up on unmount or when searchQuery changes
    return clearDebounceTimer;
  }, [searchQuery, onSearch]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    clearDebounceTimer();
    onSearch(searchQuery);
    setIsTyping(false);
  };

  const clearSearch = () => {
    setSearchQuery("");
    clearDebounceTimer();
    onSearch("");
    setIsTyping(false);
  };

  return (
    <form onSubmit={handleSearch} className="flex gap-2 items-center mb-4 md:mb-6">
      <div className="relative flex-grow">
        <Search 
          className="absolute left-2 md:left-3 top-1/2 transform -translate-y-1/2 text-grey-400" 
          size={isMobile ? 16 : 18} 
        />
        <Input
          type="text"
          placeholder={isMobile ? "Search..." : "Search by skills, resume content, or keywords..."}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-8 md:pl-10 bg-white/5 text-sm md:text-base border-2 border-grey-800 focus:border-gold h-9 md:h-10"
          aria-label="Search candidates"
        />
        {searchQuery && (
          <button
            type="button"
            onClick={clearSearch}
            className="absolute right-2 md:right-3 top-1/2 transform -translate-y-1/2 text-grey-400 hover:text-grey-700"
            aria-label="Clear search"
          >
            <X size={isMobile ? 14 : 16} />
          </button>
        )}
      </div>
      <Button 
        type="submit" 
        className="bg-gold hover:bg-gold/90 text-black text-sm md:text-base h-9 md:h-10 px-3 md:px-4"
        disabled={isTyping}
      >
        {isMobile ? <Search size={16} /> : isTyping ? "Searching..." : "Search"}
      </Button>
    </form>
  );
};

export default SearchInput;
