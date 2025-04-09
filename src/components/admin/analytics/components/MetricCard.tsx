
import { ReactNode } from 'react';

interface MetricCardProps {
  title: string;
  value: number | string;
  icon?: ReactNode;
  trend?: string;
  trendUp?: boolean;
}

const MetricCard = ({ title, value, icon, trend, trendUp }: MetricCardProps) => {
  return (
    <div className="bg-white p-4 rounded-md border border-gray-200 shadow-sm">
      <div className="flex justify-between items-start mb-2">
        <h3 className="text-sm font-medium text-gray-500">{title}</h3>
        {icon && <span className="text-gray-400">{icon}</span>}
      </div>
      <div className="text-2xl font-bold mb-1">{value}</div>
      {trend && (
        <div className={`text-xs ${trendUp ? 'text-green-500' : 'text-gray-500'}`}>
          {trend}
        </div>
      )}
    </div>
  );
};

export default MetricCard;
