"use client";

import ChartComponent from "@/components/shared/chartComponenet";
import { useEffect, useState } from "react";
import { test } from "../../utils/helpers.ts";
import { Button } from "@/components/ui/button.tsx";
import { Input } from "@/components/ui/input.tsx";

const Test: React.FC = () => {
  const [answers, setAnswers] = useState<number[]>([]);
  const [labels, setLabels] = useState<number[]>([]);

  const [minTemp, setMinTemp] = useState<number>(100);
  const handleMinTemp = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setMinTemp(Number(event.target.value));
  };

  const [maxTemp, setMaxTemp] = useState<number>(105);
  const handleMaxTemp = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setMaxTemp(Number(event.target.value));
  };

  const handleFuzzyBalanceChart = async (
    minTemp: number,
    maxTemp: number
  ): Promise<void> => {
    const a: number[] = await test(minTemp, maxTemp);
    setAnswers(a);
    setLabels(
      Array.from({ length: a.length }, (_, index) => index + Number(minTemp))
    );
  };

  useEffect(() => {
    handleFuzzyBalanceChart(Number(minTemp), Number(maxTemp));
  }, []);

  return (
    <div className="w-full mx-auto flex flex-col bg-slate-50 px-10">
      <div className="flex flex-col gap-6 my-3">
        <div className="flex flex-col items-center gap-2 w-1/2">
          <Input
            type="range"
            placeholder="مینیمم محدوده دما را انتخاب کنید"
            min={"0"}
            max={"400"}
            onChange={handleMinTemp}
            value={minTemp.toString()} // Ensure the value is a string
            className={"bg-primary"}
          />
          {minTemp}
        </div>
        <div className="flex flex-col items-center gap-2 w-1/2">
          <Input
            type="range"
            placeholder="ماکسیمم محدوده دما را انتخاب کنید"
            min={"0"}
            max={"400"}
            onChange={handleMaxTemp}
            value={maxTemp.toString()} // Ensure the value is a string
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
          labels={labels}
          YLabel={"فشار"}
          XLable={"دما"}
          classes={"py-4"}
        />
      </div>
    </div>
  );
};

export default Test;
