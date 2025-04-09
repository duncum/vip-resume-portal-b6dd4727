
import React from 'react';
import GoogleIntegrationStatus from './google/GoogleIntegrationStatus';
import SyncControl from './sync/SyncControl';

const AdminControls = () => {
  return (
    <div className="space-y-4">
      <GoogleIntegrationStatus />
      <SyncControl />
    </div>
  );
};

export default AdminControls;
