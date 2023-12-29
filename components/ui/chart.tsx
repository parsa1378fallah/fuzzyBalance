import { ChartTypeRegistry, ChartOptions, ChartData } from "chart.js/auto";
import { useRef, useEffect } from "react";
import { Chart, registerables } from "chart.js";

interface ChartProps {
  width?: number;
  height?: number;
  type: string;
  YLabel: string;
  XLable: string;
  labels?: ChartData["labels"];
  data: number[];
  classes?: string;
  options?: ChartOptions;
}

Chart.register(...registerables);

const ChartComponent: React.FC<ChartProps> = ({
  width,
  height,
  labels,
  data,
  type,
  XLable,
  YLabel,
  classes,
  options = {},
}: ChartProps) => {
  const chartRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const ctx = chartRef.current?.getContext("2d");
    if (!ctx) return;

    const myChart = new Chart(ctx, {
      type: type as keyof ChartTypeRegistry,
      data: {
        labels: labels,
        datasets: [
          {
            label: "",
            data: data,
          },
        ],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
            title: {
              display: true,
              text: YLabel,
            },
          },
          x: {
            title: {
              display: true,
              text: XLable,
            },
          },
        },
        ...options,
      },
    });

    return () => {
      myChart.destroy();
    };
  }, [width, height, labels, data, type, XLable, YLabel, options]);

  return (
    <canvas
      className={classes}
      ref={chartRef}
      width={width}
      height={height}
    ></canvas>
  );
};

export default ChartComponent;
