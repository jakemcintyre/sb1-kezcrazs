import React from 'react';
import { ArrowDownRight, ArrowUpRight } from 'lucide-react';
import { DashboardMetric } from '../../types';

interface MetricCardProps {
  metric: DashboardMetric;
}

const MetricCard: React.FC<MetricCardProps> = ({ metric }) => {
  const { title, value, change, isPositive } = metric;
  
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4 transition-all duration-200 hover:shadow-md">
      <div className="flex justify-between items-start">
        <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">{title}</h3>
        <div className={`flex items-center space-x-1 text-xs font-medium ${isPositive ? 'text-green-500' : 'text-red-500'}`}>
          {isPositive ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
          <span>{change}%</span>
        </div>
      </div>
      <p className="text-2xl font-semibold mt-2 text-gray-800 dark:text-white">{value}</p>
    </div>
  );
};

export default MetricCard;