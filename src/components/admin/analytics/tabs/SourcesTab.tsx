
import { BarChart } from "lucide-react";
import { EmptyState } from "../components/EmptyState";

interface SourcesTabProps {
  hasData?: boolean;
}

const SourcesTab = ({ hasData = false }: SourcesTabProps) => {
  return (
    <EmptyState 
      icon={<BarChart className="mx-auto h-12 w-12 text-grey-400 mb-3" />}
      title="No Traffic Sources Data"
      description="Traffic source data will help you understand where your visitors are coming from."
    />
  );
};

export default SourcesTab;
