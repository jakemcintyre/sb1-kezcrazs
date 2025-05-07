import React from 'react';
import MetricCard from '../common/MetricCard';
import { mockDashboardMetrics } from '../../data/mockData';
import RecentMessages from './RecentMessages';
import UpcomingAppointments from './UpcomingAppointments';
import PendingReminders from './PendingReminders';

const DashboardView: React.FC = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Dashboard</h1>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {mockDashboardMetrics.map((metric, index) => (
          <MetricCard key={index} metric={metric} />
        ))}
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <RecentMessages />
        <div className="space-y-6">
          <UpcomingAppointments />
          <PendingReminders />
        </div>
      </div>
    </div>
  );
};

export default DashboardView;