
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useEffect, useState } from "react";
import { getAnalyticsData } from "@/utils/tracking";
import { initGoogleApi, isUserAuthorized, signInToGoogle } from "@/utils/googleAuth";
import { Button } from "@/components/ui/button";
import OverviewTab from "./tabs/OverviewTab";
import EngagementTab from "./tabs/EngagementTab";
import UsersTab from "./tabs/UsersTab";
import DownloadsTab from "./tabs/DownloadsTab";
import SourcesTab from "./tabs/SourcesTab";

const Analytics = () => {
  const [analyticsData, setAnalyticsData] = useState({
    totalViews: 0,
    uniqueViewers: 0,
    recentViews: [],
    topCandidates: [],
    userInteractions: []
  });
  
  const [googleAuthStatus, setGoogleAuthStatus] = useState({
    isInitialized: false,
    isAuthorized: false,
    isLoading: true
  });
  
  // Mock downloads data until we implement the full feature
  const downloadsCount = 0;

  useEffect(() => {
    // Get data from tracker
    const data = getAnalyticsData();
    setAnalyticsData(data);
    
    // Check Google API status
    const checkGoogleAuth = async () => {
      try {
        await initGoogleApi();
        const authorized = await isUserAuthorized();
        
        setGoogleAuthStatus({
          isInitialized: true,
          isAuthorized: authorized,
          isLoading: false
        });
      } catch (error) {
        console.error("Error checking Google auth:", error);
        setGoogleAuthStatus({
          isInitialized: false,
          isAuthorized: false,
          isLoading: false
        });
      }
    };
    
    checkGoogleAuth();
  }, []);
  
  const handleGoogleSignIn = async () => {
    setGoogleAuthStatus(prev => ({ ...prev, isLoading: true }));
    
    try {
      const success = await signInToGoogle();
      
      setGoogleAuthStatus({
        isInitialized: true,
        isAuthorized: success,
        isLoading: false
      });
    } catch (error) {
      console.error("Error signing in:", error);
      setGoogleAuthStatus(prev => ({ ...prev, isLoading: false }));
    }
  };
  
  // Check if we have any data to display
  const hasData = analyticsData.totalViews > 0;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl">View Analytics</CardTitle>
        <CardDescription>
          Track resume views and engagement statistics.
        </CardDescription>
      </CardHeader>
      <CardContent>
        {!googleAuthStatus.isAuthorized && !googleAuthStatus.isLoading && (
          <div className="mb-6 p-4 bg-amber-50 border border-amber-200 rounded-md">
            <h3 className="text-amber-800 text-sm font-medium mb-2">Google Integration Required</h3>
            <p className="text-amber-700 text-xs mb-3">
              Connect to Google to access detailed analytics and resume storage features.
            </p>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={handleGoogleSignIn}
              className="bg-white"
            >
              Connect Google Account
            </Button>
          </div>
        )}
        
        <Tabs defaultValue="overview" className="space-y-4">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="engagement">Engagement</TabsTrigger>
            <TabsTrigger value="users">User Activity</TabsTrigger>
            <TabsTrigger value="downloads">Downloads</TabsTrigger>
            <TabsTrigger value="sources">Traffic Sources</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview" className="mt-0">
            <OverviewTab 
              analyticsData={analyticsData} 
              hasData={hasData} 
              downloadsCount={downloadsCount} 
            />
          </TabsContent>
          
          <TabsContent value="engagement">
            <EngagementTab />
          </TabsContent>
          
          <TabsContent value="users">
            <UsersTab 
              analyticsData={analyticsData} 
              hasData={hasData} 
            />
          </TabsContent>
          
          <TabsContent value="downloads">
            <DownloadsTab 
              hasData={hasData} 
              downloadsCount={downloadsCount} 
            />
          </TabsContent>
          
          <TabsContent value="sources">
            <SourcesTab />
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default Analytics;
