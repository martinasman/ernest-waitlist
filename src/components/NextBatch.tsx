"use client";

import { useState, useEffect } from "react";

const BATCH_OPEN_DATE = new Date("2026-02-23T00:00:00");

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
    <section className="w-full py-6 md:py-8">
      <div className="max-w-2xl mx-auto px-6">
        <div className="bg-[#F5F0E8] border border-[#E5E0D5] rounded-2xl px-6 py-5 md:px-8 md:py-6 text-center">
          {expired ? (
            <>
              <p className="text-xs md:text-sm text-[#999999] font-medium uppercase tracking-wider">
                Batch now open
              </p>
              <p className="text-4xl md:text-5xl font-bold text-[#191919] mt-3 mb-3">
                Limited spots remaining
              </p>
            </>
          ) : (
            <>
              <p className="text-xs md:text-sm text-[#999999] font-medium uppercase tracking-wider">
                Next batch opens in
              </p>
              <p className="text-5xl md:text-6xl font-bold text-[#191919] mt-3 mb-3 tabular-nums">
                {mounted
                  ? `${timeLeft.days}d ${timeLeft.hours}h ${timeLeft.minutes}m ${String(timeLeft.seconds).padStart(2, "0")}s`
                  : "\u00A0"}
              </p>
              <p className="text-sm md:text-base text-[#666666]">
                Limited to{" "}
                <span className="text-[#10A37F] font-medium">1,000</span> new
                spots
              </p>
            </>
          )}
        </div>
      </div>
    </section>
  );
}
