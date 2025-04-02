
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, X } from "lucide-react";

interface CandidateSearchProps {
  onSearch: (query: string) => void;
}

const CandidateSearch = ({ onSearch }: CandidateSearchProps) => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchQuery);
  };

  const clearSearch = () => {
    setSearchQuery("");
    onSearch("");
  };

  return (
    <div className="w-full max-w-3xl mx-auto mb-8">
      <form onSubmit={handleSearch} className="flex gap-2 items-center">
        <div className="relative flex-grow">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-grey-400" size={18} />
          <Input
            type="text"
            placeholder="Search by skills, sectors, or keywords..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 bg-white border-2 border-grey-200 focus:border-gold"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={clearSearch}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-grey-400 hover:text-grey-700"
            >
              <X size={16} />
            </button>
          )}
        </div>
        <Button type="submit" className="bg-gold hover:bg-gold-dark text-white">
          Search
        </Button>
      </form>
    </div>
  );
};

export default CandidateSearch;
