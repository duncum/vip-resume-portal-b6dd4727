
import React from 'react';
import GoogleIntegrationStatus from './google/GoogleIntegrationStatus';
import SyncControl from './sync/SyncControl';
import Analytics from './analytics';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const AdminControls = () => {
  return (
    <div className="space-y-4">
      <Tabs defaultValue="google" className="w-full">
        <TabsList className="grid grid-cols-3 mb-4">
          <TabsTrigger value="google">Google Integration</TabsTrigger>
          <TabsTrigger value="sync">Data Sync</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>
        
        <TabsContent value="google">
          <GoogleIntegrationStatus />
        </TabsContent>
        
        <TabsContent value="sync">
          <SyncControl />
        </TabsContent>
        
        <TabsContent value="analytics">
          <Analytics />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminControls;
