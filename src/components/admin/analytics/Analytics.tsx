
import { useState, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/utils/supabase/config";
import OverviewTab from "./tabs/OverviewTab";
import EngagementTab from "./tabs/EngagementTab";
import UsersTab from "./tabs/UsersTab";
import DownloadsTab from "./tabs/DownloadsTab";
import SourcesTab from "./tabs/SourcesTab";
import SyncControl from "@/components/admin/sync/SyncControl";
import { fetchAnalyticsData } from "./utils/analyticsData";
import { getDownloadAnalytics } from "@/utils/tracking/analytics";
import type { AnalyticsProps } from "./types";

const Analytics = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [analyticsData, setAnalyticsData] = useState<AnalyticsProps["analyticsData"]>({
    totalViews: 0,
    uniqueViewers: 0,
    recentViews: [],
    topCandidates: [],
    userInteractions: [],
    downloads: []
  });
  const [isLoading, setIsLoading] = useState(true);
  const [hasData, setHasData] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const loadAnalyticsData = async () => {
      try {
        setIsLoading(true);
        
        // Fetch data from API and local storage
        const apiData = await fetchAnalyticsData();
        const downloadData = getDownloadAnalytics();
        
        // Combine the data
        const combinedData = {
          ...apiData,
          downloads: downloadData,
          // Calculate downloads count from stored analytics
          // rather than just using apiData.userInteractions
          downloadsCount: downloadData.length
        };
        
        setAnalyticsData(combinedData);
        setHasData(
          combinedData.totalViews > 0 || 
          combinedData.uniqueViewers > 0 || 
          combinedData.recentViews.length > 0 || 
          combinedData.topCandidates.length > 0 ||
          combinedData.downloads.length > 0
        );
      } catch (error) {
        console.error("Error loading analytics data:", error);
        toast({
          title: "Error loading analytics",
          description: "Could not load analytics data. Please try again later.",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };

    loadAnalyticsData();
  }, [toast]);

  // Calculate number of downloads (from real data)
  const downloadsCount = analyticsData.downloads?.length || 0;

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="col-span-3">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid grid-cols-5 w-full">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="engagement">Engagement</TabsTrigger>
              <TabsTrigger value="users">Users</TabsTrigger>
              <TabsTrigger value="downloads">Downloads</TabsTrigger>
              <TabsTrigger value="sources">Sources</TabsTrigger>
            </TabsList>

            <Card className="mt-6">
              <CardContent className="pt-6">
                <TabsContent value="overview" className="m-0">
                  <OverviewTab 
                    analyticsData={analyticsData} 
                    hasData={hasData} 
                    isLoading={isLoading} 
                  />
                </TabsContent>
                
                <TabsContent value="engagement" className="m-0">
                  <EngagementTab 
                    analyticsData={analyticsData}
                    hasData={hasData}
                  />
                </TabsContent>
                
                <TabsContent value="users" className="m-0">
                  <UsersTab 
                    analyticsData={analyticsData}
                    hasData={hasData}
                  />
                </TabsContent>
                
                <TabsContent value="downloads" className="m-0">
                  <DownloadsTab 
                    hasData={hasData || downloadsCount > 0}
                    downloadsCount={downloadsCount}
                  />
                </TabsContent>
                
                <TabsContent value="sources" className="m-0">
                  <SourcesTab hasData={hasData} />
                </TabsContent>
              </CardContent>
            </Card>
          </Tabs>
        </div>
        
        <div className="col-span-1">
          <SyncControl />
        </div>
      </div>
    </div>
  );
};

export default Analytics;
