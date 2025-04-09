
import SearchInput from "@/components/candidates/SearchInput";

interface CandidateSearchProps {
  onSearch: (query: string) => void;
}

const CandidateSearch = ({ onSearch }: CandidateSearchProps) => {
  return (
    <div className="w-full mb-6 md:mb-8">
      <SearchInput onSearch={onSearch} />
    </div>
  );
};

export default CandidateSearch;
