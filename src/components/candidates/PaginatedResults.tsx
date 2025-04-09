
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface PaginatedResultsProps<T> {
  items: T[];
  itemsPerPage: number;
  renderItems: (items: T[]) => React.ReactNode;
}

const PaginatedResults = <T,>({ 
  items, 
  itemsPerPage, 
  renderItems 
}: PaginatedResultsProps<T>) => {
  const [currentPage, setCurrentPage] = useState(1);
  
  const totalPages = Math.ceil(items.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = items.slice(indexOfFirstItem, indexOfLastItem);
  
  const handlePrevPage = () => {
    setCurrentPage(prevPage => Math.max(prevPage - 1, 1));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  
  const handleNextPage = () => {
    setCurrentPage(prevPage => Math.min(prevPage + 1, totalPages));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  
  // If there's only 1 page, don't show pagination controls
  if (totalPages <= 1) {
    return <>{renderItems(currentItems)}</>;
  }
  
  return (
    <div className="space-y-8">
      {renderItems(currentItems)}
      
      <div className="flex justify-center items-center gap-6 pt-4">
        <Button
          variant="outline"
          size="icon"
          onClick={handlePrevPage}
          disabled={currentPage === 1}
          className="h-9 w-9 border-grey-700"
        >
          <ChevronLeft className="h-5 w-5" />
        </Button>
        
        <div className="text-sm text-grey-300">
          {currentPage} / {totalPages}
        </div>
        
        <Button
          variant="outline"
          size="icon"
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
          className="h-9 w-9 border-grey-700"
        >
          <ChevronRight className="h-5 w-5" />
        </Button>
      </div>
    </div>
  );
};

export default PaginatedResults;
