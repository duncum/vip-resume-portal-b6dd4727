
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface PaginatedResultsProps<T> {
  items: T[];
  itemsPerPage: number;
  renderItems: (currentItems: T[]) => React.ReactNode;
}

const PaginatedResults = <T extends {id?: string | number}>({
  items,
  itemsPerPage,
  renderItems,
}: PaginatedResultsProps<T>) => {
  const [currentPage, setCurrentPage] = useState(1);
  
  // Reset to page 1 when items change
  useEffect(() => {
    setCurrentPage(1);
  }, [items]);

  // Calculate total pages
  const totalPages = Math.max(1, Math.ceil(items.length / itemsPerPage));
  
  // Ensure current page is within valid range
  const validPage = Math.min(Math.max(1, currentPage), totalPages);
  if (validPage !== currentPage) {
    setCurrentPage(validPage);
  }

  // Calculate pagination indexes
  const indexOfLastItem = validPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = items.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber: number) => {
    setCurrentPage(Math.min(Math.max(1, pageNumber), totalPages));
    // Scroll to top on page change for better UX
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div>
      {renderItems(currentItems)}
      
      {/* Only show pagination if we have multiple pages */}
      {totalPages > 1 && (
        <div className="flex justify-center mt-8 gap-1">
          <Button
            variant="outline"
            size="sm"
            onClick={() => paginate(currentPage - 1)}
            disabled={currentPage === 1}
            className="text-grey-400"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          
          {/* Generate unique keys using page number */}
          {Array.from({ length: totalPages }).map((_, index) => {
            const pageNumber = index + 1;
            return (
              <Button
                key={`page-${pageNumber}`}
                variant={pageNumber === currentPage ? "default" : "outline"}
                size="sm"
                onClick={() => paginate(pageNumber)}
                className={pageNumber === currentPage ? "bg-gold hover:bg-gold-dark" : ""}
              >
                {pageNumber}
              </Button>
            );
          })}
          
          <Button
            variant="outline"
            size="sm"
            onClick={() => paginate(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="text-grey-400"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      )}
    </div>
  );
};

export default PaginatedResults;
