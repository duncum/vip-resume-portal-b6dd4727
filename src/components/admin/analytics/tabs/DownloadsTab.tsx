
import { Download } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Bar, BarChart, Tooltip, XAxis, YAxis } from "recharts";
import MetricCard from "../components/MetricCard";
import { EmptyState } from "../components/EmptyState";
import ChartSection from "../components/ChartSection";

export interface DownloadsTabProps {
  hasData: boolean;
  downloadsCount: number;
}

const DownloadsTab = ({ hasData = false, downloadsCount = 0 }: DownloadsTabProps) => {
  // Sample chart data for demonstration
  const downloadsChartData = [
    { name: 'Mon', downloads: 1 },
    { name: 'Tue', downloads: 2 },
    { name: 'Wed', downloads: 0 },
    { name: 'Thu', downloads: 3 },
    { name: 'Fri', downloads: 1 },
    { name: 'Sat', downloads: 0 },
    { name: 'Sun', downloads: 2 },
  ];

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <MetricCard 
          title="Total Downloads" 
          value={downloadsCount}
        />
        <MetricCard 
          title="Unique Downloaders" 
          value={0} 
        />
      </div>
      
      {hasData ? (
        <>
          <h3 className="text-lg font-medium mb-3">Most Downloaded Resumes</h3>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Candidate ID</TableHead>
                <TableHead className="text-right">Downloads</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell colSpan={2} className="text-center py-4 text-grey-500">
                  No download data yet
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
          
          <ChartSection title="Downloads Over Time">
            <BarChart width={500} height={300} data={downloadsChartData}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="downloads" fill="#8884d8" />
            </BarChart>
          </ChartSection>
        </>
      ) : (
        <EmptyState 
          icon={<Download className="mx-auto h-12 w-12 text-grey-400 mb-3" />}
          title="No Downloads Yet"
          description="Download analytics will appear once resumes are downloaded."
        />
      )}
    </>
  );
};

export default DownloadsTab;
