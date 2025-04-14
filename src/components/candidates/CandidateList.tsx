
import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Candidate } from "@/types/candidate";
import CandidateCard from "./CandidateCard";

interface CandidateListProps {
  candidates: Candidate[];
  isLoading: boolean;
  searchQuery?: string;
  itemsPerPage?: number;
}

const CandidateList = ({
  candidates,
  isLoading,
  searchQuery = "",
  itemsPerPage = 6
}: CandidateListProps) => {
  const [currentPage, setCurrentPage] = useState(1);
  
  // Calculate pagination
  const totalPages = Math.ceil(candidates.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = candidates.slice(startIndex, endIndex);
  
  // Handle page changes
  const goToPage = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 md:gap-8">
        {[...Array(6)].map((_, i) => (
          <Skeleton key={i} className="h-[400px] bg-gray-800/30 rounded-lg border border-gray-700/30" />
        ))}
      </div>
    );
  }

  if (candidates.length === 0) {
    return (
      <div className="text-center py-16 bg-gray-900/50 backdrop-blur-sm rounded-lg border border-gray-800/50">
        <p className="text-gray-400 text-lg">No candidates found matching your criteria.</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 md:gap-8">
        {currentItems.map((candidate) => (
          <CandidateCard
            key={candidate.id}
            candidate={candidate}
            searchQuery={searchQuery}
          />
        ))}
      </div>
      
      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center space-x-2 pt-4">
          <Button
            variant="outline"
            size="sm"
            onClick={() => goToPage(currentPage - 1)}
            disabled={currentPage === 1}
            className="border-gray-700"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          
          <div className="flex items-center space-x-1">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <Button
                key={page}
                variant={currentPage === page ? "default" : "outline"}
                size="sm"
                onClick={() => goToPage(page)}
                className={
                  currentPage === page
                    ? "bg-amber-500 text-black hover:bg-amber-600"
                    : "border-gray-700"
                }
              >
                {page}
              </Button>
            ))}
          </div>
          
          <Button
            variant="outline"
            size="sm"
            onClick={() => goToPage(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="border-gray-700"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      )}
    </div>
  );
};

export default CandidateList;
