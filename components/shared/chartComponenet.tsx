"use client";
import { useRef, useEffect } from "react";
import { Chart, registerables } from "chart.js";

interface ChartProps {
  width?: number;
  height?: number;
  type: string;
  YLabel: string;
  XLable: string;
  labels?: string[] | number[];
  data: number[];
  classes: string;
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
}: ChartProps) => {
  const chartRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const ctx = chartRef.current?.getContext("2d");
    if (!ctx) return;

    const myChart = new Chart(ctx, {
      type: type,
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
      },
    });

    return () => {
      myChart.destroy();
    };
  }, [width, height, labels, data, type, XLable, YLabel]);

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
