
import { Card } from "@/components/ui/card";
import ChartSection from "../components/ChartSection";
import MetricCard from "../components/MetricCard";
import { EmptyState } from "../components/EmptyState";
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { Database, Eye, Users } from "lucide-react";
import type { AnalyticsProps } from "../types";

interface OverviewTabProps {
  analyticsData: AnalyticsProps["analyticsData"];
  hasData: boolean;
  isLoading: boolean;
}

const OverviewTab = ({ analyticsData, hasData, isLoading }: OverviewTabProps) => {
  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-pulse flex flex-col items-center space-y-4">
          <div className="h-12 w-12 bg-gray-200 rounded-full"></div>
          <div className="h-4 w-32 bg-gray-200 rounded"></div>
        </div>
      </div>
    );
  }

  if (!hasData) {
    return (
      <EmptyState 
        icon={<Database className="mx-auto h-12 w-12 text-grey-400 mb-3" />}
        title="No Analytics Data Yet"
        description="Start adding candidates and tracking user interactions to see analytics data."
      />
    );
  }

  // Mock data for the charts
  const viewsData = [
    { name: "Mon", views: 15 },
    { name: "Tue", views: 20 },
    { name: "Wed", views: 18 },
    { name: "Thu", views: 25 },
    { name: "Fri", views: 30 },
    { name: "Sat", views: 12 },
    { name: "Sun", views: 10 },
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        <MetricCard 
          title="Total Views" 
          value={analyticsData.totalViews}
          icon={<Eye className="h-4 w-4" />}
          trend="+12% from last week"
          trendUp={true}
        />
        
        <MetricCard 
          title="Unique Viewers" 
          value={analyticsData.uniqueViewers}
          icon={<Users className="h-4 w-4" />}
          trend="+5% from last week"
          trendUp={true}
        />
        
        <MetricCard 
          title="Candidates" 
          value={analyticsData.topCandidates.length}
          icon={<Database className="h-4 w-4" />}
          trend="0% change"
          trendUp={false}
        />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <ChartSection title="Views Over Time">
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={viewsData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="views" stroke="#3b82f6" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </ChartSection>
        
        <ChartSection title="Top Candidates">
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={analyticsData.topCandidates}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="id" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="viewCount" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </ChartSection>
      </div>
      
      <ChartSection title="Recent Activity">
        <div className="space-y-2">
          {analyticsData.recentViews.map((view, index) => (
            <Card key={index} className="p-4">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-sm font-medium">{view.headline}</p>
                  <p className="text-xs text-muted-foreground">ID: {view.id}</p>
                </div>
                <div className="text-sm">
                  {new Date(view.viewedAt).toLocaleDateString()}
                </div>
              </div>
            </Card>
          ))}
        </div>
      </ChartSection>
    </div>
  );
};

export default OverviewTab;
