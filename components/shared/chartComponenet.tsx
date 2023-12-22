"use client";
import { useRef, useEffect } from "react";
import { Chart, registerables } from "chart.js";

interface chartProps {
  width?: number;
  height?: number;
  type: string;
  YLabel: string;
  XLable: string;
  labels?: string[] | number[];
  data: number[];
}

Chart.register(...registerables);

const ChartComponent = ({
  width,
  height,
  labels,
  data,
  type,
  XLable,
  YLabel,
}: chartProps) => {
  const chartRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const ctx = chartRef.current?.getContext("2d");
    let myChart = new Chart(ctx, {
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
  }, [width, height, labels, data, type]);

  return <canvas ref={chartRef} width={width} height={height}></canvas>;
};
export default ChartComponent;
