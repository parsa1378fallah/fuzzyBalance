"use client";
import { useEffect, useMemo, useState } from "react";
import { main } from "@/utils/helpers";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Spinner from "@/components/shared/spinner";
import { notify } from "@/utils/notify";
import Chartjs from "@/components/shared/chart";

const Test: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(false);

  const [answers, setAnswers] = useState<number[]>([]);
  const [labels, setLabels] = useState<number[]>([]);

  const [minTemp, setMinTemp] = useState<number>(285);
  const handleMinTemp = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setMinTemp(Number(event.target.value));
  };

  const [maxTemp, setMaxTemp] = useState<number>(292);
  const handleMaxTemp = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setMaxTemp(Number(event.target.value));
  };

  const handleFuzzyBalanceChart = useMemo(
    () => async (): Promise<void> => {
      setLoading(true);
      let answeres: number[] = [];
      let labeles: number[] = [];
      for (let T: number = minTemp; T <= maxTemp; T++) {
        let answer: number = await main(T);
        answeres = [...answeres, answer];
      }
      if (maxTemp != Math.abs(maxTemp)) {
        console.log("dfasfdsa");
        let answer = await main(maxTemp);
        answeres = [...answeres, answer];
      }
      labeles = Array.from(
        { length: maxTemp - minTemp },
        (_, index) => index + Number(minTemp)
      );

      labeles = [...labeles, maxTemp];
      setLoading(false);

      setAnswers(answeres);
      setLabels(labeles);
    },
    [maxTemp, minTemp]
  );

  useEffect(() => {
    handleFuzzyBalanceChart();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="w-full mx-auto flex flex-col lg:flex-row items-center px-10">
      <div className="flex flex-col gap-6 my-3">
        <div className="flex items-center gap-2">
          <p className="whitespace-nowrap">مینیمم دما : {minTemp}</p>
          <Input
            type="range"
            placeholder="مینیمم محدوده دما را انتخاب کنید"
            min={"0"}
            max={"400"}
            onChange={handleMinTemp}
            value={minTemp.toString()} // Ensure the value is a string
            className={"bg-primary"}
            step={"0.1"}
          />
        </div>
        <div className="flex items-center gap-2">
          <p className="whitespace-nowrap">ماکسیمم دما : {maxTemp}</p>
          <Input
            type="range"
            placeholder="ماکسیمم محدوده دما را انتخاب کنید"
            min={"0"}
            max={"400"}
            onChange={handleMaxTemp}
            value={maxTemp.toString()} // Ensure the value is a string
            step={"0.1"}
          />
        </div>
        <Button
          className={`w-1/2 text-xl ${
            Number(minTemp) < Number(maxTemp) ? "bg-green-500" : "bg-red-500"
          }`}
          onClick={() => {
            Number(minTemp) > Number(maxTemp)
              ? notify("error", "ماکسیمم دما باید از مینیمم دما بیشتر باشد")
              : handleFuzzyBalanceChart();
          }}
        >
          اعمال
        </Button>
      </div>
      <div className="w-3/4 mx-auto">
        {loading ? (
          <Spinner />
        ) : (
          <div className="flex flex-col">
            <Chartjs
              labels={labels}
              data={answers}
              showChartSelectoe={true}
              XLable={"دما"}
              YLabel={"فشار"}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Test;
