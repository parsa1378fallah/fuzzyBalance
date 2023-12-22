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

  const [maxTemp, setMaxTemp] = useState<number>(105);
  const handleMaxTemp = (event): void => {
    setMaxTemp(event.target.value);
  };

  const handleFuzzyBalanceChart = async (minTemp: number, maxTemp: number) => {
    const a: number[] = await test(minTemp, maxTemp);
    setAnswers(a);
    setLabeles(
      Array.from({ length: a.length }, (_, index) => index + Number(minTemp))
    );
    console.log(labeles);
  };
  useEffect(() => {
    handleFuzzyBalanceChart(Number(minTemp), Number(maxTemp));
  });
  return (
    <div className="w-full mx-auto flex flex-col bg-slate-50 px-10">
      <div className="flex flex-col gap-6 my-3">
        <div className="flex felx-col items-center gap-2 w-1/2">
          <Input
            type="range"
            placeholder="مینیمم محدوده دما را انتخاب کنید"
            min={"0"}
            max={"400"}
            onChange={handleMinTemp}
            value={minTemp}
            className={"bg-primary"}
          />
          {minTemp}
        </div>
        <div className="flex felx-col  items-center gap-2 w-1/2">
          <Input
            type="range"
            placeholder="ماکسیمم محدوده دما را انتخاب کنید"
            min={"0"}
            max={"400"}
            onChange={handleMaxTemp}
            value={maxTemp}
          />
          {maxTemp}
        </div>
        <Button
          variant={"outline"}
          className={"w-1/2 text-xl"}
          onClick={() => {
            handleFuzzyBalanceChart(Number(minTemp), Number(maxTemp));
          }}
        >
          اعمال
        </Button>
      </div>
      <div className="w-3/4 mx-auto">
        <ChartComponent
          type={"line"}
          data={answers}
          labels={labeles}
          YLabel={"فشار"}
          XLable={"دما"}
          classes={"py-4"}
        />
      </div>
    </div>
  );
};

export default Test;
