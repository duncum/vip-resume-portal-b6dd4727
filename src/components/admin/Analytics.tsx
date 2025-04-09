
import { BarChart, Download, Eye, FileText, Users } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useEffect, useState } from "react";
import { getAnalyticsData, getCandidateInteractions } from "@/utils/tracking";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";
import { ChartContainer } from "../ui/chart";
import { Bar, BarChart as RechartsBarChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { initGoogleApi, isUserAuthorized, signInToGoogle } from "@/utils/googleAuth";
import { Button } from "../ui/button";

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
          
          <TabsContent value="overview" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div className="bg-grey-100 p-4 rounded-md text-center">
                <div className="text-3xl font-bold mb-1 text-gold">{analyticsData.totalViews}</div>
                <div className="text-sm text-grey-600">Total Views</div>
              </div>
              <div className="bg-grey-100 p-4 rounded-md text-center">
                <div className="text-3xl font-bold mb-1 text-gold">{analyticsData.uniqueViewers}</div>
                <div className="text-sm text-grey-600">Unique Visitors</div>
              </div>
              <div className="bg-grey-100 p-4 rounded-md text-center">
                <div className="text-3xl font-bold mb-1 text-gold">{downloadsCount}</div>
                <div className="text-sm text-grey-600">Downloads</div>
              </div>
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
                
                <div className="mt-8">
                  <h3 className="text-lg font-medium mb-3">Views Over Time</h3>
                  <div className="h-64 bg-grey-50 rounded-lg">
                    <ChartContainer
                      config={{
                        views: { color: "hsl(48, 95%, 53%)" }
                      }}
                      className="p-2"
                    >
                      <RechartsBarChart data={viewsChartData}>
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Bar dataKey="views" fill="var(--color-views)" />
                      </RechartsBarChart>
                    </ChartContainer>
                  </div>
                </div>
              </>
            ) : (
              <div className="text-center py-6">
                <Eye className="mx-auto h-12 w-12 text-grey-400 mb-3" />
                <h3 className="text-lg font-medium mb-2">No View Data Available</h3>
                <p className="text-grey-500">Analytics will appear once resumes are viewed.</p>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="engagement" className="space-y-4">
            <div className="text-center py-6">
              <Users className="mx-auto h-12 w-12 text-grey-400 mb-3" />
              <h3 className="text-lg font-medium mb-2">No Engagement Data Yet</h3>
              <p className="text-grey-500">Engagement metrics will show interactions with your candidate profiles.</p>
            </div>
          </TabsContent>
          
          <TabsContent value="users" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div className="bg-grey-100 p-4 rounded-md text-center">
                <div className="text-3xl font-bold mb-1 text-indigo-600">
                  {analyticsData.userInteractions?.length || 0}
                </div>
                <div className="text-sm text-grey-600">Unique Users</div>
              </div>
              <div className="bg-grey-100 p-4 rounded-md text-center">
                <div className="text-3xl font-bold mb-1 text-indigo-600">
                  {analyticsData.totalViews || 0}
                </div>
                <div className="text-sm text-grey-600">Total Interactions</div>
              </div>
              <div className="bg-grey-100 p-4 rounded-md text-center">
                <div className="text-3xl font-bold mb-1 text-indigo-600">
                  {Math.round((analyticsData.totalViews || 0) / Math.max(1, analyticsData.userInteractions?.length || 1))}
                </div>
                <div className="text-sm text-grey-600">Avg. Interactions/User</div>
              </div>
            </div>
            
            {hasData && analyticsData.userInteractions?.length > 0 ? (
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
              <div className="text-center py-6">
                <Users className="mx-auto h-12 w-12 text-grey-400 mb-3" />
                <h3 className="text-lg font-medium mb-2">No User Activity Data Yet</h3>
                <p className="text-grey-500">User activity will appear once candidates are viewed.</p>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="downloads" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div className="bg-grey-100 p-4 rounded-md text-center">
                <div className="text-3xl font-bold mb-1 text-gold">{downloadsCount}</div>
                <div className="text-sm text-grey-600">Total Downloads</div>
              </div>
              <div className="bg-grey-100 p-4 rounded-md text-center">
                <div className="text-3xl font-bold mb-1 text-gold">0</div>
                <div className="text-sm text-grey-600">Unique Downloaders</div>
              </div>
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
                
                <div className="mt-8">
                  <h3 className="text-lg font-medium mb-3">Downloads Over Time</h3>
                  <div className="h-64 bg-grey-50 rounded-lg">
                    <ChartContainer
                      config={{
                        downloads: { color: "hsl(210, 75%, 60%)" }
                      }}
                      className="p-2"
                    >
                      <RechartsBarChart data={downloadsChartData}>
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Bar dataKey="downloads" fill="var(--color-downloads)" />
                      </RechartsBarChart>
                    </ChartContainer>
                  </div>
                </div>
              </>
            ) : (
              <div className="text-center py-6">
                <Download className="mx-auto h-12 w-12 text-grey-400 mb-3" />
                <h3 className="text-lg font-medium mb-2">No Downloads Yet</h3>
                <p className="text-grey-500">Download analytics will appear once resumes are downloaded.</p>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="sources" className="space-y-4">
            <div className="text-center py-6">
              <BarChart className="mx-auto h-12 w-12 text-grey-400 mb-3" />
              <h3 className="text-lg font-medium mb-2">No Traffic Sources Data</h3>
              <p className="text-grey-500">Traffic source data will help you understand where your visitors are coming from.</p>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default Analytics;
