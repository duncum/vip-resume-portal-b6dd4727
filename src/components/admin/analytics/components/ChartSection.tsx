
import { ReactNode } from 'react';

interface ChartSectionProps {
  title: string;
  children: ReactNode;
}

const ChartSection = ({ title, children }: ChartSectionProps) => {
  return (
    <div className="mt-6">
      <h3 className="text-lg font-medium mb-3">{title}</h3>
      <div className="p-4 border border-gray-200 rounded-lg">
        {children}
      </div>
    </div>
  );
};

export default ChartSection;
