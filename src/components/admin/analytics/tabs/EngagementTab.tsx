
import { Users } from "lucide-react";
import { EmptyState } from "../components/EmptyState";
import type { AnalyticsProps } from "../types";

interface EngagementTabProps {
  analyticsData?: AnalyticsProps["analyticsData"];
  hasData?: boolean;
}

const EngagementTab = ({ analyticsData, hasData = false }: EngagementTabProps) => {
  return (
    <EmptyState 
      icon={<Users className="mx-auto h-12 w-12 text-grey-400 mb-3" />}
      title="No Engagement Data Yet"
      description="Engagement metrics will show interactions with your candidate profiles."
    />
  );
};

export default EngagementTab;
