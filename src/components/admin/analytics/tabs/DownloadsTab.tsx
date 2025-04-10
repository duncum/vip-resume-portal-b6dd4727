
import { Download } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Bar, BarChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import MetricCard from "../components/MetricCard";
import { EmptyState } from "../components/EmptyState";
import ChartSection from "../components/ChartSection";
import { useEffect, useState } from "react";
import { DownloadRecord } from "@/utils/tracking/types";
import { getDownloadAnalytics } from "@/utils/tracking/analytics";
import { format } from "date-fns";

export interface DownloadsTabProps {
  hasData: boolean;
  downloadsCount: number;
}

const DownloadsTab = ({ hasData = false, downloadsCount = 0 }: DownloadsTabProps) => {
  const [downloads, setDownloads] = useState<DownloadRecord[]>([]);
  
  useEffect(() => {
    // Get download data from tracking system
    const downloadData = getDownloadAnalytics();
    setDownloads(downloadData);
  }, []);

  // Generate chart data from real downloads
  const generateChartData = () => {
    if (downloads.length === 0) return [];
    
    // Create a map of dates to download counts
    const downloadsByDate = new Map<string, number>();
    
    // Get last 7 days
    const dates = [];
    const today = new Date();
    for (let i = 6; i >= 0; i--) {
      const date = new Date();
      date.setDate(today.getDate() - i);
      const dateStr = format(date, 'EEE');
      dates.push({ date, dateStr });
      downloadsByDate.set(dateStr, 0);
    }
    
    // Count downloads by date
    downloads.forEach(download => {
      const downloadDate = new Date(download.downloadTime);
      // Only include downloads from the last 7 days
      if (downloadDate >= dates[0].date && downloadDate <= today) {
        const dateStr = format(downloadDate, 'EEE');
        downloadsByDate.set(dateStr, (downloadsByDate.get(dateStr) || 0) + 1);
      }
    });
    
    // Convert to chart data format
    return dates.map(({ dateStr }) => ({
      name: dateStr,
      downloads: downloadsByDate.get(dateStr) || 0
    }));
  };

  const chartData = generateChartData();
  
  // Get the real download count
  const realDownloadsCount = downloads.length;
  
  // Calculate unique downloaders
  const uniqueDownloaders = new Set(downloads.map(d => d.userId)).size;
  
  // Get top downloaded candidates
  const topDownloadedCandidates = () => {
    if (downloads.length === 0) return [];
    
    const downloadsByCandidate = new Map<string, { id: string, headline: string, count: number }>();
    
    downloads.forEach(download => {
      const candidateId = download.candidateId;
      const current = downloadsByCandidate.get(candidateId) || { 
        id: candidateId, 
        headline: download.candidateHeadline || 'Unknown candidate', 
        count: 0 
      };
      current.count += 1;
      downloadsByCandidate.set(candidateId, current);
    });
    
    return Array.from(downloadsByCandidate.values())
      .sort((a, b) => b.count - a.count)
      .slice(0, 5);
  };
  
  const topCandidates = topDownloadedCandidates();

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <MetricCard 
          title="Total Downloads" 
          value={realDownloadsCount}
        />
        <MetricCard 
          title="Unique Downloaders" 
          value={uniqueDownloaders} 
        />
      </div>
      
      {hasData || downloads.length > 0 ? (
        <>
          <h3 className="text-lg font-medium mb-3">Most Downloaded Resumes</h3>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Candidate</TableHead>
                <TableHead className="text-right">Downloads</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {topCandidates.length > 0 ? (
                topCandidates.map((candidate) => (
                  <TableRow key={candidate.id}>
                    <TableCell>{candidate.headline}</TableCell>
                    <TableCell className="text-right">{candidate.count}</TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={2} className="text-center py-4 text-grey-500">
                    No download data yet
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
          
          <ChartSection title="Downloads Over Time">
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={chartData}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="downloads" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </ChartSection>
          
          <h3 className="text-lg font-medium mb-3 mt-6">Recent Downloads</h3>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date & Time</TableHead>
                <TableHead>Candidate</TableHead>
                <TableHead>Downloaded By</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {downloads.length > 0 ? (
                downloads.slice(0, 10).map((download) => (
                  <TableRow key={download.id}>
                    <TableCell>{format(new Date(download.downloadTime), 'MMM d, yyyy h:mm a')}</TableCell>
                    <TableCell>{download.candidateHeadline || download.candidateId}</TableCell>
                    <TableCell>{download.userName}</TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={3} className="text-center py-4 text-grey-500">
                    No download history yet
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
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
