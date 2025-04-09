
interface MetricCardProps {
  value: number | string;
  label: string;
  color?: string;
}

const MetricCard = ({ value, label, color = "text-gold" }: MetricCardProps) => {
  return (
    <div className="bg-grey-100 p-4 rounded-md text-center">
      <div className={`text-3xl font-bold mb-1 ${color}`}>{value}</div>
      <div className="text-sm text-grey-600">{label}</div>
    </div>
  );
};

export default MetricCard;
