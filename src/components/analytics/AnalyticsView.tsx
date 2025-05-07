import React from 'react';
import { BarChart3, TrendingUp, MessageSquare, Users, Calendar, ChevronUp, ChevronDown } from 'lucide-react';

const AnalyticsView: React.FC = () => {
  const conversionMetrics = [
    { label: 'New Leads', current: 24, previous: 20, isPositive: true },
    { label: 'Qualified Leads', current: 18, previous: 15, isPositive: true },
    { label: 'Negotiations', current: 12, previous: 14, isPositive: false },
    { label: 'Closed Deals', current: 8, previous: 6, isPositive: true },
  ];
  
  const platformMetrics = [
    { platform: 'Facebook', count: 42, percentage: 35, color: 'bg-blue-500' },
    { platform: 'Instagram', count: 38, percentage: 31, color: 'bg-pink-500' },
    { platform: 'LinkedIn', count: 24, percentage: 20, color: 'bg-blue-700' },
    { platform: 'Google', count: 16, percentage: 14, color: 'bg-red-500' },
  ];
  
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Analytics</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-md">
              <MessageSquare size={20} className="text-blue-600 dark:text-blue-400" />
            </div>
            <span className="text-green-500 flex items-center text-sm font-medium">
              <ChevronUp size={16} />
              12%
            </span>
          </div>
          <p className="mt-4 text-2xl font-semibold text-gray-900 dark:text-white">1,248</p>
          <p className="text-gray-500 dark:text-gray-400 text-sm">Total Messages</p>
        </div>
        
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-md">
              <Users size={20} className="text-green-600 dark:text-green-400" />
            </div>
            <span className="text-green-500 flex items-center text-sm font-medium">
              <ChevronUp size={16} />
              8%
            </span>
          </div>
          <p className="mt-4 text-2xl font-semibold text-gray-900 dark:text-white">64</p>
          <p className="text-gray-500 dark:text-gray-400 text-sm">Active Leads</p>
        </div>
        
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div className="p-2 bg-purple-100 dark:bg-purple-900/30 rounded-md">
              <Calendar size={20} className="text-purple-600 dark:text-purple-400" />
            </div>
            <span className="text-red-500 flex items-center text-sm font-medium">
              <ChevronDown size={16} />
              3%
            </span>
          </div>
          <p className="mt-4 text-2xl font-semibold text-gray-900 dark:text-white">32</p>
          <p className="text-gray-500 dark:text-gray-400 text-sm">Appointments</p>
        </div>
        
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div className="p-2 bg-amber-100 dark:bg-amber-900/30 rounded-md">
              <TrendingUp size={20} className="text-amber-600 dark:text-amber-400" />
            </div>
            <span className="text-green-500 flex items-center text-sm font-medium">
              <ChevronUp size={16} />
              5%
            </span>
          </div>
          <p className="mt-4 text-2xl font-semibold text-gray-900 dark:text-white">28%</p>
          <p className="text-gray-500 dark:text-gray-400 text-sm">Conversion Rate</p>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
          <h2 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">Sales Funnel</h2>
          
          <div className="space-y-4">
            {conversionMetrics.map((metric, index) => (
              <div key={index}>
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{metric.label}</span>
                  <div className="flex items-center">
                    <span className="text-sm font-medium text-gray-900 dark:text-white mr-2">{metric.current}</span>
                    <span className={`flex items-center text-xs ${
                      metric.isPositive ? 'text-green-500' : 'text-red-500'
                    }`}>
                      {metric.isPositive ? <ChevronUp size={12} /> : <ChevronDown size={12} />}
                      {Math.abs(Math.round((metric.current - metric.previous) / metric.previous * 100))}%
                    </span>
                  </div>
                </div>
                
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                  <div 
                    className="bg-blue-600 h-2 rounded-full"
                    style={{ width: `${(metric.current / conversionMetrics[0].current) * 100}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
          <h2 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">Message Sources</h2>
          
          <div className="space-y-4">
            {platformMetrics.map((metric, index) => (
              <div key={index}>
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{metric.platform}</span>
                  <div className="flex items-center">
                    <span className="text-sm font-medium text-gray-900 dark:text-white mr-2">{metric.count}</span>
                    <span className="text-xs text-gray-500 dark:text-gray-400">{metric.percentage}%</span>
                  </div>
                </div>
                
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                  <div 
                    className={`${metric.color} h-2 rounded-full`}
                    style={{ width: `${metric.percentage}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
        <h2 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">Monthly Performance</h2>
        
        <div className="flex justify-center items-center h-64">
          <BarChart3 size={48} className="text-gray-300 dark:text-gray-600" />
          <p className="text-gray-500 dark:text-gray-400 ml-4">
            Detailed charts would be displayed here, showing monthly performance metrics
          </p>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsView;