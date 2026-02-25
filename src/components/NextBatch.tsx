"use client";

import { useState, useEffect } from "react";

const BATCH_OPEN_DATE = new Date("2026-03-08T00:00:00");

function calculateTimeLeft() {
  const diff = BATCH_OPEN_DATE.getTime() - Date.now();

  if (diff <= 0) {
    return null;
  }

  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
    minutes: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
    seconds: Math.floor((diff % (1000 * 60)) / 1000),
  };
}

const UNITS = ["days", "hours", "minutes", "seconds"] as const;
const LABELS = { days: "d", hours: "h", minutes: "m", seconds: "s" };

export function NextBatch() {
  const [mounted, setMounted] = useState(false);
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft);

  useEffect(() => {
    setMounted(true);
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1_000);

    return () => clearInterval(timer);
  }, []);

  const expired = timeLeft === null;

  return (
    <div className="w-full max-w-xl mx-auto text-center">
      {expired ? (
        <p className="text-sm text-[#10A37F] font-medium">
          Batch now open &mdash; limited spots remaining
        </p>
      ) : (
        <>
          <p className="text-xs text-[#999999] font-medium uppercase tracking-wider mb-3">
            Next batch opens in
          </p>
          <div className="flex items-baseline justify-center">
            {mounted ? (
              UNITS.map((unit) => (
                <div key={unit} className="flex items-baseline">
                  <span className="text-3xl md:text-4xl font-semibold text-[#E5E5E5] tabular-nums leading-none">
                    {String(timeLeft[unit]).padStart(unit === "days" ? 1 : 2, "0")}
                  </span>
                  <span className="text-xs md:text-sm text-[#999999] ml-0.5 mr-2.5">
                    {LABELS[unit]}
                  </span>
                  {unit === "seconds" && (
                    <span className="w-1.5 h-1.5 bg-[#ef4444] rounded-full animate-pulse-dot ml-0.5" />
                  )}
                </div>
              ))
            ) : (
              <span>&nbsp;</span>
            )}
          </div>
          <p className="text-xs text-[#666666] mt-3">
            Limited to{" "}
            <span className="text-[#10A37F] font-medium">1,000</span> new
            spots
          </p>
        </>
      )}
    </div>
  );
}
