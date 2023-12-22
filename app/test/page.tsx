"use client";

import ChartComponent from "@/components/shared/chartComponenet";
import { useEffect, useState, useRef } from "react";
import { test } from "../../utils/helpers.js";
import { Button } from "@/components/ui/button.tsx";
import { Input } from "@/components/ui/input.tsx";
const Test = () => {
  const [answers, setAnswers] = useState([]);
  const [labeles, setLabeles] = useState<number[]>([]);

  const [minTemp, setMinTemp] = useState<number>(100);
  const handleMinTemp = (event): void => {
    setMinTemp(event.target.value);
  };

  const [maxTemp, setMaxTemp] = useState<number>(102);
  const handleMaxTemp = (event): void => {
    setMaxTemp(event.target.value);
  };

  const handleFuzzyBalanceChart = async (minTemp: number, maxTemp: number) => {
    const a: number[] = await test(minTemp, maxTemp);
    setAnswers(a);
    setLabeles(
      Array.from({ length: maxTemp - minTemp }, (_, index) => index + minTemp)
    );
  };
  useEffect(() => {
    handleFuzzyBalanceChart(minTemp, maxTemp);
  }, [minTemp, maxTemp]);
  return (
    <div className="w-full mx-auto flex flex-col bg-slate-50 px-10">
      <div className="flex gap-6 my-3">
        <Input
          type="range"
          placeholder="مینیمم محدوده دما را انتخاب کنید"
          min={"0"}
          max={"400"}
          onChange={handleMinTemp}
        />
        {minTemp}
        <Input
          type="range"
          placeholder="ماکسیمم محدوده دما را انتخاب کنید"
          min={"0"}
          max={"400"}
          onChange={handleMaxTemp}
        />
      </div>
      <div className="w-3/4 mx-auto">
        <ChartComponent
          type={"line"}
          data={answers}
          labels={labeles}
          YLabel={"فشار"}
          XLable={"دما"}
        />
      </div>
    </div>
  );
};

export default Test;
