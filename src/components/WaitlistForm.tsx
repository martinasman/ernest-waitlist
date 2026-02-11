"use client";

import { useState, useEffect, useCallback } from "react";
import { cn } from "@/lib/utils";

const BUSINESS_IDEAS = [
  "professional cuddling service",
  "solar-powered taco truck",
  "baby DJ academy",
  "pigeon racing league",
  "silent disco rental company",
  "pet psychic hotline",
  "luxury treehouse Airbnb",
  "kombucha speakeasy",
  "drone light show agency",
  "flatpack furniture assembly empire",
  "celebrity lookalike booking agency",
  "edible flower farm",
  "nap pod rental startup",
  "vintage typewriter repair shop",
  "glow-in-the-dark mini golf course",
  "hot sauce subscription box",
  "alpaca therapy farm",
  "ice cream truck for dogs",
  "karaoke boat charter",
  "mushroom foraging tour company",
  "robot barista cafe",
  "sensory deprivation float spa",
  "tiny house construction company",
  "underground supper club",
  "VR haunted house",
  "worm composting delivery service",
  "bubble tea lab",
  "cheese aging cave experience",
  "DIY terrarium workshop",
  "electric go-kart track",
  "fermentation station",
  "ghost kitchen empire",
  "hammock cafe",
  "insect protein snack brand",
  "jellyfish aquarium lounge",
  "knife sharpening subscription",
  "llama hiking adventure company",
  "mobile sauna rental",
  "ninja warrior gym",
  "oxygen bar franchise",
  "puzzle room for couples therapy",
  "quilt-making co-op",
  "retro arcade bar",
  "sword fighting school",
  "truffle hunting experience",
  "upcycled fashion brand",
  "vintage van photo booth",
  "waffle truck empire",
  "axolotl breeding business",
  "beekeeper subscription service",
  "cloud watching tour guide",
  "dinosaur-themed daycare",
  "eel farm",
  "fire dancing school",
  "goat soap company",
  "hot dog water spa",
  "igloo hotel",
  "jigsaw puzzle cafe",
];

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function useTypewriter(items: string[]) {
  const [display, setDisplay] = useState("");
  const [fullWord, setFullWord] = useState(() => items[0] ?? "");
  const [shuffled] = useState(() => shuffle(items));
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const text = shuffled[index % shuffled.length];
    setFullWord(text);
    let charIndex = 0;
    let erasing = false;
    let cancelled = false;
    let timer: ReturnType<typeof setTimeout>;

    const tick = () => {
      if (cancelled) return;
      if (!erasing) {
        charIndex++;
        setDisplay(text.slice(0, charIndex));
        if (charIndex < text.length) {
          timer = setTimeout(tick, 50);
          return;
        }
        erasing = true;
        timer = setTimeout(tick, 2000);
        return;
      }
      charIndex--;
      setDisplay(text.slice(0, charIndex));
      if (charIndex > 0) {
        timer = setTimeout(tick, 30);
        return;
      }
      setIndex((i) => i + 1);
    };

    tick();
    return () => {
      cancelled = true;
      clearTimeout(timer);
    };
  }, [shuffled, index]);

  return { display, fullWord };
}

export function WaitlistForm() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");
  const { display: typed, fullWord } = useTypewriter(BUSINESS_IDEAS);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email) return;

    setStatus("loading");

    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Something went wrong");
      }

      setStatus("success");
      setMessage("You're on the list! We'll be in touch soon.");
      setEmail("");
    } catch (err) {
      setStatus("error");
      setMessage(err instanceof Error ? err.message : "Something went wrong");
    }
  };

  if (status === "success") {
    return (
      <div className="w-full max-w-xl mx-auto text-center">
        <div className="rounded-2xl bg-[#1A1A1A] border border-[#2A2A2A] px-6 py-8">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-[#10A37F]/15 mb-4">
            <svg className="w-7 h-7 text-[#10A37F]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <p className="text-lg font-medium text-white">{message}</p>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-xl mx-auto">
      <div className="flex flex-col gap-4">
        {/* Typewriter - floating text */}
        <p className="text-sm text-[#666666] text-center min-h-[1.25rem]">
          Build {/^[aeiou]/i.test(fullWord) ? "an" : "a"}{" "}
          <span className="text-white/70">{typed}</span>
          <span className="animate-pulse text-white/40">|</span>
          {" "}with Ernest
        </p>

        {/* Email input */}
        <div className="rounded-full bg-[#1A1A1A]/80 border border-[#2A2A2A] px-5 py-3 flex items-center gap-3 backdrop-blur-sm">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="your@email.com"
            required
            className={cn(
              "flex-1 bg-transparent text-white text-sm placeholder:text-[#555555]",
              "focus:outline-none min-w-0"
            )}
          />
          <button
            type="submit"
            disabled={status === "loading" || !email}
            className={cn(
              "px-5 py-1.5 rounded-full text-xs font-medium transition-all shrink-0",
              email
                ? "bg-white text-black hover:bg-white/90"
                : "bg-[#2A2A2A] text-[#555555]",
              "disabled:opacity-50 disabled:cursor-not-allowed"
            )}
          >
            {status === "loading" ? "Joining..." : "Join"}
          </button>
        </div>
      </div>

      {status === "error" && (
        <p className="mt-3 text-sm text-red-400 text-center">{message}</p>
      )}
    </form>
  );
}
