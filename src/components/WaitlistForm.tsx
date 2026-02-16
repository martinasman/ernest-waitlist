"use client";

import { useState, useEffect, useMemo } from "react";
import { cn } from "@/lib/utils";

const BUSINESS_IDEAS = [
  { idea: "mobile dog grooming van", tags: ["Payments", "Automation", "Data Forms"] },
  { idea: "vintage sneaker resale shop", tags: ["Payments", "Analytics", "Integrations"] },
  { idea: "ghost kitchen for birria tacos", tags: ["Payments", "Automation"] },
  { idea: "AI tutoring platform", tags: ["AI-Driven", "Payments", "Analytics"] },
  { idea: "cold brew coffee subscription", tags: ["Payments", "Automation"] },
  { idea: "custom phone case brand", tags: ["Payments", "Automation", "Integrations"] },
  { idea: "local flower delivery service", tags: ["Payments", "Automation", "Data Forms"] },
  { idea: "boutique hot sauce label", tags: ["Payments", "Analytics"] },
  { idea: "freelance drone photography studio", tags: ["Payments", "Data Forms"] },
  { idea: "online thrift store", tags: ["Payments", "Analytics", "Automation"] },
  { idea: "meal prep delivery kitchen", tags: ["Payments", "Automation", "Data Forms"] },
  { idea: "streetwear print-on-demand brand", tags: ["Payments", "Automation", "Integrations"] },
  { idea: "pet portrait painting studio", tags: ["Payments", "Data Forms"] },
  { idea: "micro-influencer talent agency", tags: ["Payments", "Analytics", "Data Forms"] },
  { idea: "mobile car detailing business", tags: ["Payments", "Automation", "Data Forms"] },
  { idea: "niche fragrance house", tags: ["Payments", "Analytics"] },
  { idea: "escape room franchise", tags: ["Payments", "Data Forms", "Analytics"] },
  { idea: "sustainable candle brand", tags: ["Payments", "Automation"] },
  { idea: "kids coding bootcamp", tags: ["Payments", "Data Forms", "Automation"] },
  { idea: "personal chef booking platform", tags: ["Payments", "Data Forms", "Integrations"] },
  { idea: "vintage furniture flipping shop", tags: ["Payments", "Analytics"] },
  { idea: "mushroom growing kit company", tags: ["Payments", "Automation"] },
  { idea: "podcast production agency", tags: ["Payments", "Data Forms", "Automation"] },
  { idea: "luxury picnic planning service", tags: ["Payments", "Data Forms"] },
  { idea: "kombucha taproom", tags: ["Payments", "Analytics"] },
  { idea: "AI resume writing service", tags: ["AI-Driven", "Payments", "Automation"] },
  { idea: "handmade jewelry brand", tags: ["Payments", "Analytics", "Automation"] },
  { idea: "co-working space for creatives", tags: ["Payments", "Data Forms", "Analytics"] },
  { idea: "mobile phone repair franchise", tags: ["Payments", "Data Forms", "Automation"] },
  { idea: "custom sneaker painting studio", tags: ["Payments", "Data Forms"] },
  { idea: "plant subscription box", tags: ["Payments", "Automation"] },
  { idea: "sports card trading platform", tags: ["Payments", "Analytics", "Integrations"] },
  { idea: "overnight oats brand", tags: ["Payments", "Automation"] },
  { idea: "virtual interior design studio", tags: ["Payments", "AI-Driven", "Data Forms"] },
  { idea: "local brewery taproom", tags: ["Payments", "Analytics", "Data Forms"] },
  { idea: "dropshipping sunglasses brand", tags: ["Payments", "Automation", "Analytics"] },
  { idea: "private yoga studio", tags: ["Payments", "Data Forms", "Automation"] },
  { idea: "AI chatbot agency", tags: ["AI-Driven", "Payments", "Integrations"] },
  { idea: "matcha bar cafe", tags: ["Payments", "Analytics"] },
  { idea: "wedding videography company", tags: ["Payments", "Data Forms"] },
  { idea: "electric bike rental fleet", tags: ["Payments", "Automation", "Analytics"] },
  { idea: "organic baby food brand", tags: ["Payments", "Automation", "Analytics"] },
  { idea: "tattoo booking platform", tags: ["Payments", "Data Forms", "Integrations"] },
  { idea: "sourdough bread delivery service", tags: ["Payments", "Automation", "Data Forms"] },
  { idea: "vending machine empire", tags: ["Payments", "Analytics", "Automation"] },
  { idea: "content writing agency", tags: ["Payments", "AI-Driven", "Automation"] },
  { idea: "custom neon sign shop", tags: ["Payments", "Data Forms"] },
  { idea: "mobile pressure washing company", tags: ["Payments", "Data Forms", "Automation"] },
  { idea: "affiliate marketing blog", tags: ["Analytics", "Automation", "Payments"] },
  { idea: "smoothie bowl food truck", tags: ["Payments", "Analytics"] },
  { idea: "AI-powered copywriting tool", tags: ["AI-Driven", "Payments", "Analytics"] },
  { idea: "vintage watch resale store", tags: ["Payments", "Analytics", "Integrations"] },
  { idea: "teeth whitening clinic", tags: ["Payments", "Data Forms", "Automation"] },
  { idea: "curated gift box company", tags: ["Payments", "Automation"] },
  { idea: "dog treat bakery", tags: ["Payments", "Automation", "Analytics"] },
  { idea: "Airbnb property management firm", tags: ["Payments", "Automation", "Analytics"] },
  { idea: "local cleaning service", tags: ["Payments", "Data Forms", "Automation"] },
  { idea: "whiskey tasting subscription", tags: ["Payments", "Automation"] },
  { idea: "digital marketing agency", tags: ["Payments", "Analytics", "AI-Driven"] },
  { idea: "pop-up ramen shop", tags: ["Payments", "Data Forms"] },
  { idea: "custom sticker brand", tags: ["Payments", "Automation", "Integrations"] },
  { idea: "online fitness coaching app", tags: ["Payments", "AI-Driven", "Data Forms"] },
  { idea: "mobile bartending service", tags: ["Payments", "Data Forms"] },
  { idea: "crypto tax prep firm", tags: ["Payments", "Analytics", "Automation"] },
  { idea: "print-on-demand poster shop", tags: ["Payments", "Automation", "Integrations"] },
  { idea: "smart home installation company", tags: ["Payments", "Data Forms", "Integrations"] },
  { idea: "hemp skincare brand", tags: ["Payments", "Analytics", "Automation"] },
  { idea: "private chef dinner party service", tags: ["Payments", "Data Forms"] },
  { idea: "TikTok ads agency", tags: ["Payments", "Analytics", "AI-Driven"] },
  { idea: "protein bar brand", tags: ["Payments", "Automation", "Analytics"] },
  { idea: "mobile sauna rental", tags: ["Payments", "Data Forms"] },
  { idea: "AI voice cloning studio", tags: ["AI-Driven", "Payments", "Integrations"] },
  { idea: "luxury car rental company", tags: ["Payments", "Data Forms", "Analytics"] },
  { idea: "minimalist wallet brand", tags: ["Payments", "Automation"] },
  { idea: "local jam and preserves company", tags: ["Payments", "Automation"] },
  { idea: "newsletter monetization platform", tags: ["Payments", "Analytics", "Automation"] },
  { idea: "custom embroidery shop", tags: ["Payments", "Data Forms"] },
  { idea: "outdoor adventure tour company", tags: ["Payments", "Data Forms", "Analytics"] },
  { idea: "white label supplement brand", tags: ["Payments", "Automation", "Integrations"] },
  { idea: "estate sale liquidation company", tags: ["Payments", "Analytics"] },
  { idea: "AI headshot photography studio", tags: ["AI-Driven", "Payments", "Automation"] },
  { idea: "mobile notary service", tags: ["Payments", "Data Forms", "Automation"] },
  { idea: "exotic houseplant nursery", tags: ["Payments", "Analytics"] },
  { idea: "meditation app startup", tags: ["Payments", "AI-Driven", "Analytics"] },
  { idea: "local cookie delivery shop", tags: ["Payments", "Automation", "Data Forms"] },
  { idea: "UGC content creator agency", tags: ["Payments", "Analytics", "Data Forms"] },
  { idea: "custom mechanical keyboard shop", tags: ["Payments", "Integrations"] },
  { idea: "backyard chicken coop builder", tags: ["Payments", "Data Forms"] },
  { idea: "cold plunge rental company", tags: ["Payments", "Data Forms", "Automation"] },
  { idea: "AI-powered logo design tool", tags: ["AI-Driven", "Payments", "Automation"] },
  { idea: "gourmet popcorn brand", tags: ["Payments", "Automation", "Analytics"] },
  { idea: "mobile IV therapy clinic", tags: ["Payments", "Data Forms", "Automation"] },
  { idea: "vintage clothing resale platform", tags: ["Payments", "Analytics", "Integrations"] },
  { idea: "tiny home construction company", tags: ["Payments", "Data Forms", "Analytics"] },
  { idea: "CBD pet treats brand", tags: ["Payments", "Automation"] },
  { idea: "professional organizing service", tags: ["Payments", "Data Forms", "Automation"] },
  { idea: "laser engraving gift shop", tags: ["Payments", "Data Forms", "Automation"] },
  { idea: "poke bowl franchise", tags: ["Payments", "Analytics"] },
  { idea: "SaaS affiliate network", tags: ["Payments", "Analytics", "Integrations"] },
  { idea: "boba tea shop chain", tags: ["Payments", "Analytics", "Automation"] },
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
  const ideaStrings = useMemo(() => BUSINESS_IDEAS.map((b) => b.idea), []);
  const { display: typed, fullWord } = useTypewriter(ideaStrings);
  const activeIdea = BUSINESS_IDEAS.find((b) => b.idea === fullWord);

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
        <div className="rounded-2xl bg-[#F5F0E8] border border-[#E5E0D5] px-6 py-8">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-[#10A37F]/15 mb-4">
            <svg className="w-7 h-7 text-[#10A37F]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <p className="text-lg font-medium text-[#191919]">{message}</p>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-xl mx-auto">
      <div className="flex flex-col gap-4">
        {/* Typewriter - floating text */}
        <p className="text-sm text-[#999999] text-center min-h-[1.25rem]">
          Build {/^[aeiou]/i.test(fullWord) ? "an" : "a"}{" "}
          <span className="text-[#191919]/70">{typed}</span>
          <span className="animate-pulse text-[#191919]/30">|</span>
          {" "}with Ernest
        </p>
        <div className="flex justify-center gap-1.5 min-h-[24px]">
          {activeIdea?.tags.map((tag) => (
            <span
              key={tag}
              className="px-2 py-0.5 rounded-full bg-[#333333] text-[#E5E5E5] text-[10px] font-medium"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Email input */}
        <div className="rounded-full bg-white border border-[#E5E0D5] px-5 py-3 flex items-center gap-3 shadow-sm">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="your@email.com"
            required
            className={cn(
              "flex-1 bg-transparent text-[#191919] text-sm placeholder:text-[#BBBBBB]",
              "focus:outline-none min-w-0"
            )}
          />
          <button
            type="submit"
            disabled={status === "loading" || !email}
            className={cn(
              "px-5 py-1.5 rounded-full text-xs font-medium transition-all shrink-0",
              email
                ? "bg-[#191919] text-white hover:bg-[#191919]/85"
                : "bg-[#E5E0D5] text-[#BBBBBB]",
              "disabled:opacity-50 disabled:cursor-not-allowed"
            )}
          >
            {status === "loading" ? "Joining..." : "Join"}
          </button>
        </div>
      </div>

      {status === "error" && (
        <p className="mt-3 text-sm text-red-500 text-center">{message}</p>
      )}
    </form>
  );
}
