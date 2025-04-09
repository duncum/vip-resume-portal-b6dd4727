
import { Users } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { AnalyticsProps } from "../types";
import MetricCard from "../components/MetricCard";
import { EmptyState } from "../components/EmptyState";

interface UsersTabProps {
  analyticsData?: AnalyticsProps["analyticsData"];
  hasData?: boolean;
}

const UsersTab = ({ analyticsData, hasData = false }: UsersTabProps) => {
  // Calculate average interactions per user
  const avgInteractions = analyticsData 
    ? Math.round((analyticsData.totalViews || 0) / Math.max(1, analyticsData.userInteractions?.length || 1))
    : 0;

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <MetricCard 
          title="Unique Users" 
          value={analyticsData?.userInteractions?.length || 0} 
        />
        <MetricCard 
          title="Total Interactions" 
          value={analyticsData?.totalViews || 0} 
        />
        <MetricCard 
          title="Avg. Interactions/User" 
          value={avgInteractions} 
        />
      </div>
      
      {hasData && analyticsData?.userInteractions?.length ? (
        <>
          <h3 className="text-lg font-medium mb-3">User Activity</h3>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>User ID</TableHead>
                <TableHead>Candidates Viewed</TableHead>
                <TableHead>Views</TableHead>
                <TableHead>Downloads</TableHead>
                <TableHead>Last Activity</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {analyticsData.userInteractions.map((user: any) => (
                <TableRow key={user.userId}>
                  <TableCell className="font-mono">{user.userId}</TableCell>
                  <TableCell>{user.candidateCount}</TableCell>
                  <TableCell>{user.views}</TableCell>
                  <TableCell>{user.downloads}</TableCell>
                  <TableCell>{new Date(user.lastActivity).toLocaleString()}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </>
      ) : (
        <EmptyState 
          icon={<Users className="mx-auto h-12 w-12 text-grey-400 mb-3" />}
          title="No User Activity Data Yet"
          description="User activity will appear once candidates are viewed."
        />
      )}
    </>
  );
};

export default UsersTab;
