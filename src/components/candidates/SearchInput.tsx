
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, X } from "lucide-react";

interface SearchInputProps {
  onSearch: (query: string) => void;
}

const SearchInput = ({ onSearch }: SearchInputProps) => {
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
    <form onSubmit={handleSearch} className="flex gap-2 items-center mb-6">
      <div className="relative flex-grow">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-grey-400" size={18} />
        <Input
          type="text"
          placeholder="Search by skills, position, or keywords..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10 bg-white/5 border-2 border-grey-800 focus:border-gold"
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
  );
};

export default SearchInput;
