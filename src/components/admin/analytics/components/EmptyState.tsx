
import { ReactNode } from 'react';

interface EmptyStateProps {
  icon: ReactNode;
  title: string;
  description: string;
}

export const EmptyState = ({ icon, title, description }: EmptyStateProps) => {
  return (
    <div className="text-center py-6">
      {icon}
      <h3 className="text-lg font-medium mb-2">{title}</h3>
      <p className="text-grey-500">{description}</p>
    </div>
  );
};
