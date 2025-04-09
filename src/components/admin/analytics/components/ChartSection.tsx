
import { ChartContainer } from "@/components/ui/chart";
import { Bar, BarChart, Tooltip, XAxis, YAxis } from "recharts";

interface ChartSectionProps {
  title: string;
  chartData: any[];
  dataKey: string;
  color: string;
  colorValue: string;
}

const ChartSection = ({ title, chartData, dataKey, color, colorValue }: ChartSectionProps) => {
  return (
    <div className="mt-8">
      <h3 className="text-lg font-medium mb-3">{title}</h3>
      <div className="h-64 bg-grey-50 rounded-lg">
        <ChartContainer
          config={{
            [color]: { color: colorValue }
          }}
          className="p-2"
        >
          <BarChart data={chartData}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey={dataKey} fill={`var(--color-${color})`} />
          </BarChart>
        </ChartContainer>
      </div>
    </div>
  );
};

export default ChartSection;
