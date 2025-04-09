
import { useState, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import OverviewTab from "./tabs/OverviewTab";
import EngagementTab from "./tabs/EngagementTab";
import UsersTab from "./tabs/UsersTab";
import DownloadsTab from "./tabs/DownloadsTab";
import SourcesTab from "./tabs/SourcesTab";
import SyncControl from "@/components/admin/sync/SyncControl";
import { fetchAnalyticsData } from "./utils/analyticsData";
import type { AnalyticsProps } from "./types";

const Analytics = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [analyticsData, setAnalyticsData] = useState<AnalyticsProps["analyticsData"]>({
    totalViews: 0,
    uniqueViewers: 0,
    recentViews: [],
    topCandidates: [],
    userInteractions: []
  });
  const [isLoading, setIsLoading] = useState(true);
  const [hasData, setHasData] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const loadAnalyticsData = async () => {
      try {
        setIsLoading(true);
        const data = await fetchAnalyticsData();
        
        setAnalyticsData(data);
        setHasData(
          data.totalViews > 0 || 
          data.uniqueViewers > 0 || 
          data.recentViews.length > 0 || 
          data.topCandidates.length > 0
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

  // Calculate number of downloads (mock data for now)
  const downloadsCount = analyticsData.userInteractions.reduce(
    (total, user: any) => total + (user.downloads || 0), 
    0
  );

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
                    hasData={hasData}
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
