"use client";
import { mainFunction, test } from "../../utils/helpers.js";
import { useState, useEffect } from "react";
export default function Home() {
  const [answers, setAnswers] = useState([]);
  useEffect(() => {
    const a: number[] = test();
    setAnswers(a);
  }, []);

  return (
    <main className="flex  flex-col items-center justify-between p-4">
      {answers.map((answer) => (
        <div
          key={answer.tello}
          className="border bg-gray-100 w-full flex justify-center gap-3 text-xs "
        >
          <span>{answer.tello}</span>
          <span>{answer.P}</span>
          <span>{answer.T}</span>
        </div>
      ))}
    </main>
  );
}
