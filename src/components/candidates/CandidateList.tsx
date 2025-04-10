
import CandidateCard from "@/components/candidates/CandidateCard";
import PaginatedResults from "@/components/candidates/PaginatedResults";
import { Skeleton } from "@/components/ui/skeleton";
import { Candidate } from "@/utils/sheets/types";

interface CandidateListProps {
  candidates: Candidate[];
  isLoading: boolean;
  itemsPerPage?: number;
}

const CandidateList = ({ 
  candidates, 
  isLoading, 
  itemsPerPage = 6 
}: CandidateListProps) => {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 md:gap-8">
        {[...Array(6)].map((_, i) => (
          <Skeleton key={i} className="h-[400px] bg-grey-800/30 rounded-lg border border-grey-700/30" />
        ))}
      </div>
    );
  }

  if (candidates.length === 0) {
    return (
      <div className="text-center py-16 bg-grey-900/50 backdrop-blur-sm rounded-lg border border-grey-800/50">
        <p className="text-grey-400 text-lg">No candidates found matching your criteria.</p>
      </div>
    );
  }

  return (
    <PaginatedResults
      items={candidates}
      itemsPerPage={itemsPerPage}
      renderItems={(currentItems) => (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 md:gap-8">
          {currentItems.map((candidate) => (
            <CandidateCard
              key={candidate.id}
              id={candidate.id}
              headline={candidate.headline}
              sectors={candidate.sectors}
              tags={candidate.tags}
              category={candidate.category}
              title={candidate.title}
              summary={candidate.summary}
              location={candidate.location}
              relocationPreference={candidate.relocationPreference}
              resumeUrl={candidate.resumeUrl}
              notableEmployers={candidate.notableEmployers}
            />
          ))}
        </div>
      )}
    />
  );
};

export default CandidateList;
