
import { Eye } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ChartContainer } from "@/components/ui/chart";
import { Bar, BarChart, Tooltip, XAxis, YAxis } from "recharts";
import { AnalyticsProps } from "../types";
import MetricCard from "../components/MetricCard";
import ChartSection from "../components/ChartSection";

interface OverviewTabProps extends AnalyticsProps {
  downloadsCount: number;
}

const OverviewTab = ({ analyticsData, hasData, downloadsCount }: OverviewTabProps) => {
  // Sample chart data for demonstration
  const viewsChartData = [
    { name: 'Mon', views: 3 },
    { name: 'Tue', views: 5 },
    { name: 'Wed', views: 2 },
    { name: 'Thu', views: 8 },
    { name: 'Fri', views: 4 },
    { name: 'Sat', views: 1 },
    { name: 'Sun', views: 6 },
  ];

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <MetricCard 
          value={analyticsData.totalViews} 
          label="Total Views" 
          color="text-gold"
        />
        <MetricCard 
          value={analyticsData.uniqueViewers} 
          label="Unique Visitors" 
          color="text-gold"
        />
        <MetricCard 
          value={downloadsCount} 
          label="Downloads" 
          color="text-gold"
        />
      </div>
      
      {hasData ? (
        <>
          <h3 className="text-lg font-medium mb-3">Top Viewed Candidates</h3>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Candidate ID</TableHead>
                <TableHead className="text-right">Views</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {analyticsData.topCandidates.length > 0 ? (
                analyticsData.topCandidates.map((candidate: any) => (
                  <TableRow key={candidate.id}>
                    <TableCell className="font-mono">{candidate.id}</TableCell>
                    <TableCell className="text-right">{candidate.views}</TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={2} className="text-center py-4 text-grey-500">
                    No candidate view data yet
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
          
          <ChartSection 
            title="Views Over Time"
            chartData={viewsChartData}
            dataKey="views"
            color="views"
            colorValue="hsl(48, 95%, 53%)"
          />
        </>
      ) : (
        <div className="text-center py-6">
          <Eye className="mx-auto h-12 w-12 text-grey-400 mb-3" />
          <h3 className="text-lg font-medium mb-2">No View Data Available</h3>
          <p className="text-grey-500">Analytics will appear once resumes are viewed.</p>
        </div>
      )}
    </>
  );
};

export default OverviewTab;
