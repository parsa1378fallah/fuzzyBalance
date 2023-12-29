"use client";
import Chart from "../ui/chart";
import { ChartOptions, ChartData } from "chart.js/auto";
import Selector from "@/components/shared/select";
import { chartTypes } from "@/data/data";
import { useState } from "react";
interface ChartProps {
  width?: number;
  height?: number;
  YLabel: string;
  XLable: string;
  labels?: ChartData["labels"];
  data: number[];
  classes?: string;
  options?: ChartOptions;
  showChartSelectoe: boolean;
}
const Chartjs = (props: ChartProps) => {
  const [chartType, setChartType] = useState<string>("line");
  return (
    <div className="flex flex-col">
      <Selector
        placeholder={chartTypes.placeholder}
        items={chartTypes.items}
        defaultChart={chartTypes.default}
        handleChangeValue={(value) => setChartType(value)}
        classes={"w-[180px]"}
      />
      <Chart {...props} type={chartType} />
    </div>
  );
};
export default Chartjs;
