"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

type ServiceBusiness = {
  type: string;
  name: string;
  tags: string[];
};

const SERVICE_BUSINESSES: ServiceBusiness[] = [
  // Food & Beverage
  { type: "restaurant", name: "The Blue Door Bistro", tags: ["Online Ordering", "Table Management", "Payments"] },
  { type: "restaurant", name: "Bella Vita Italian Kitchen", tags: ["Online Ordering", "Payments", "Reviews"] },
  { type: "restaurant", name: "Jade Palace", tags: ["Online Ordering", "Table Management", "Staff Management"] },
  { type: "restaurant", name: "Golden Grill", tags: ["Payments", "Online Ordering", "Inventory"] },
  { type: "restaurant", name: "Sakura Sushi Bar", tags: ["Table Management", "Online Ordering", "Payments"] },
  { type: "restaurant", name: "El Pueblo Cantina", tags: ["Online Ordering", "Payments", "Staff Management"] },
  { type: "restaurant", name: "The Olive Branch", tags: ["Table Management", "Reviews", "Payments"] },
  { type: "café", name: "Morning Ritual Coffee", tags: ["Online Ordering", "Payments", "Inventory"] },
  { type: "café", name: "The Grind House", tags: ["Payments", "Staff Management", "Inventory"] },
  { type: "bakery", name: "Rise & Shine Bakery", tags: ["Online Ordering", "Inventory", "Payments"] },
  { type: "bakery", name: "Sweet Crumb Co.", tags: ["Payments", "Online Ordering", "Reviews"] },
  { type: "pizzeria", name: "Brick & Fire Pizza", tags: ["Online Ordering", "Payments", "Route Planning"] },
  { type: "pizzeria", name: "Napoli's Slice House", tags: ["Online Ordering", "Staff Management", "Payments"] },
  { type: "food truck", name: "Street Feast Kitchen", tags: ["Payments", "Route Planning", "Inventory"] },
  { type: "food truck", name: "Taco Nomad", tags: ["Payments", "Online Ordering", "Route Planning"] },
  { type: "catering company", name: "Grand Table Catering", tags: ["Quote/Estimates", "Staff Management", "Payments"] },
  { type: "catering company", name: "Savor Events", tags: ["Scheduling", "Payments", "Customer Management"] },
  { type: "juice bar", name: "Pressed & Fresh", tags: ["Online Ordering", "Inventory", "Payments"] },
  { type: "ice cream shop", name: "Scoops & Smiles", tags: ["Payments", "Inventory", "Staff Management"] },
  { type: "BBQ joint", name: "Smokestack BBQ", tags: ["Online Ordering", "Payments", "Reviews"] },

  // Home Services — Plumbing
  { type: "plumbing service", name: "QuickFix Plumbing", tags: ["Scheduling", "Route Planning", "Payments"] },
  { type: "plumbing service", name: "24/7 Pipe Masters", tags: ["Scheduling", "Quote/Estimates", "Customer Management"] },
  { type: "plumbing service", name: "ClearFlow Plumbing", tags: ["Route Planning", "Payments", "Reviews"] },

  // HVAC
  { type: "HVAC company", name: "Precision Climate Control", tags: ["Scheduling", "Payments", "Inventory"] },
  { type: "HVAC company", name: "CoolBreeze HVAC", tags: ["Route Planning", "Quote/Estimates", "Customer Management"] },
  { type: "HVAC company", name: "Arctic Air Systems", tags: ["Scheduling", "Inventory", "Payments"] },

  // Electrical
  { type: "electrical service", name: "Bright Spark Electric", tags: ["Scheduling", "Payments", "Quote/Estimates"] },
  { type: "electrical service", name: "Johnson & Sons Electric", tags: ["Route Planning", "Customer Management", "Payments"] },
  { type: "electrical service", name: "PowerLine Electricians", tags: ["Scheduling", "Quote/Estimates", "Reviews"] },

  // Roofing
  { type: "roofing company", name: "Summit Roofing Co.", tags: ["Quote/Estimates", "Scheduling", "Payments"] },
  { type: "roofing company", name: "Heritage Roofing", tags: ["Quote/Estimates", "Customer Management", "Payments"] },

  // Painting
  { type: "painting company", name: "TrueColor Painters", tags: ["Quote/Estimates", "Scheduling", "Payments"] },
  { type: "painting company", name: "Fresh Coat Painting", tags: ["Customer Management", "Quote/Estimates", "Reviews"] },

  // Landscaping
  { type: "landscaping company", name: "Green Horizon Landscapes", tags: ["Scheduling", "Quote/Estimates", "Payments"] },
  { type: "landscaping company", name: "Elite Lawn Care", tags: ["Route Planning", "Scheduling", "Customer Management"] },
  { type: "landscaping company", name: "Nature's Edge Landscaping", tags: ["Quote/Estimates", "Payments", "Staff Management"] },

  // Pest Control
  { type: "pest control service", name: "Guardian Pest Solutions", tags: ["Scheduling", "Route Planning", "Customer Management"] },
  { type: "pest control service", name: "BugShield Exterminators", tags: ["Scheduling", "Payments", "Reviews"] },

  // Pool Service
  { type: "pool service", name: "Crystal Clear Pools", tags: ["Route Planning", "Scheduling", "Payments"] },
  { type: "pool service", name: "AquaPro Pool Care", tags: ["Scheduling", "Customer Management", "Inventory"] },

  // Cleaning
  { type: "cleaning service", name: "Spotless Pro Cleaners", tags: ["Scheduling", "Route Planning", "Payments"] },
  { type: "cleaning service", name: "Fresh Start Cleaning", tags: ["Scheduling", "Customer Management", "Payments"] },
  { type: "cleaning service", name: "Sparkle & Shine Maids", tags: ["Staff Management", "Scheduling", "Reviews"] },

  // Handyman
  { type: "handyman service", name: "FixIt Right Handyman", tags: ["Scheduling", "Quote/Estimates", "Payments"] },
  { type: "handyman service", name: "AllPro Home Repairs", tags: ["Customer Management", "Scheduling", "Reviews"] },

  // Pressure Washing
  { type: "pressure washing company", name: "PowerWash Pros", tags: ["Scheduling", "Route Planning", "Payments"] },

  // Garage Door
  { type: "garage door company", name: "LiftMaster Doors", tags: ["Scheduling", "Inventory", "Payments"] },

  // Personal Care — Hair
  { type: "hair salon", name: "Luxe Hair Studio", tags: ["Scheduling", "Payments", "Reviews"] },
  { type: "hair salon", name: "The Cut Above", tags: ["Scheduling", "Customer Management", "Payments"] },
  { type: "hair salon", name: "Bliss Hair & Beauty", tags: ["Scheduling", "Reviews", "Staff Management"] },

  // Barbershops
  { type: "barbershop", name: "Classic Cuts Barber", tags: ["Scheduling", "Payments", "Reviews"] },
  { type: "barbershop", name: "The Gentlemen's Quarter", tags: ["Scheduling", "Customer Management", "Payments"] },

  // Nail Salons
  { type: "nail salon", name: "Polished Nail Bar", tags: ["Scheduling", "Payments", "Reviews"] },
  { type: "nail salon", name: "Luxe Nails & Spa", tags: ["Scheduling", "Staff Management", "Payments"] },

  // Spas & Wellness
  { type: "spa", name: "Tranquil Waters Day Spa", tags: ["Scheduling", "Payments", "Customer Management"] },
  { type: "massage studio", name: "Deep Relief Massage", tags: ["Scheduling", "Payments", "Reviews"] },

  // Fitness
  { type: "gym", name: "IronWorks Fitness", tags: ["Scheduling", "Payments", "Staff Management"] },
  { type: "yoga studio", name: "Flow State Yoga", tags: ["Scheduling", "Payments", "Customer Management"] },
  { type: "personal training studio", name: "Peak Performance Training", tags: ["Scheduling", "Payments", "Customer Management"] },
  { type: "martial arts school", name: "Black Belt Academy", tags: ["Scheduling", "Payments", "Staff Management"] },
  { type: "dance studio", name: "Rhythm & Steps Dance", tags: ["Scheduling", "Payments", "Reviews"] },

  // Automotive
  { type: "auto repair shop", name: "FastLane Auto Repair", tags: ["Scheduling", "Inventory", "Payments"] },
  { type: "auto repair shop", name: "Precision Motors", tags: ["Quote/Estimates", "Inventory", "Customer Management"] },
  { type: "auto detailing shop", name: "Mirror Finish Detailing", tags: ["Scheduling", "Payments", "Reviews"] },
  { type: "auto detailing shop", name: "Showroom Shine Auto Spa", tags: ["Scheduling", "Customer Management", "Payments"] },
  { type: "tire shop", name: "RoadGrip Tire Center", tags: ["Inventory", "Scheduling", "Payments"] },
  { type: "body shop", name: "Dent Pro Collision", tags: ["Quote/Estimates", "Inventory", "Payments"] },
  { type: "oil change shop", name: "QuickLube Express", tags: ["Scheduling", "Inventory", "Payments"] },
  { type: "towing company", name: "Rapid Response Towing", tags: ["Route Planning", "Scheduling", "Payments"] },
  { type: "car wash", name: "Diamond Wash Auto Spa", tags: ["Payments", "Staff Management", "Reviews"] },
  { type: "transmission shop", name: "ShiftRight Transmissions", tags: ["Quote/Estimates", "Inventory", "Payments"] },

  // Professional Services
  { type: "accounting firm", name: "Ledger & Associates", tags: ["Customer Management", "Scheduling", "Payments"] },
  { type: "accounting firm", name: "TrueBooks Accounting", tags: ["Customer Management", "Payments", "Reviews"] },
  { type: "law firm", name: "Sterling & Hart Law", tags: ["Customer Management", "Scheduling", "Payments"] },
  { type: "law firm", name: "Chambers Legal Group", tags: ["Scheduling", "Customer Management", "Reviews"] },
  { type: "real estate agency", name: "Keystone Realty", tags: ["Customer Management", "Scheduling", "Reviews"] },
  { type: "real estate agency", name: "Horizon Properties", tags: ["Customer Management", "Reviews", "Payments"] },
  { type: "insurance agency", name: "SafeGuard Insurance", tags: ["Customer Management", "Quote/Estimates", "Payments"] },
  { type: "photography studio", name: "Golden Hour Photography", tags: ["Scheduling", "Payments", "Customer Management"] },
  { type: "photography studio", name: "Captured Moments Studio", tags: ["Scheduling", "Reviews", "Payments"] },
  { type: "event planning company", name: "Premier Events Co.", tags: ["Scheduling", "Customer Management", "Payments"] },
  { type: "event planning company", name: "Celebrate & Co.", tags: ["Quote/Estimates", "Scheduling", "Payments"] },
  { type: "marketing agency", name: "Amplify Digital", tags: ["Customer Management", "Payments", "Reviews"] },
  { type: "tax preparation firm", name: "EasyFile Tax Services", tags: ["Scheduling", "Customer Management", "Payments"] },
  { type: "consulting firm", name: "Pinnacle Consulting Group", tags: ["Scheduling", "Customer Management", "Payments"] },
  { type: "architecture firm", name: "Skyline Design Studio", tags: ["Quote/Estimates", "Customer Management", "Payments"] },

  // Specialty Services
  { type: "moving company", name: "RedLine Movers", tags: ["Scheduling", "Payments", "Route Planning"] },
  { type: "moving company", name: "Swift Relocations", tags: ["Route Planning", "Quote/Estimates", "Payments"] },
  { type: "moving company", name: "Hometown Movers", tags: ["Scheduling", "Customer Management", "Payments"] },
  { type: "veterinary clinic", name: "Paws & Claws Vet", tags: ["Scheduling", "Payments", "Customer Management"] },
  { type: "veterinary clinic", name: "Happy Tails Animal Hospital", tags: ["Scheduling", "Inventory", "Payments"] },
  { type: "dog grooming salon", name: "Pampered Paws Grooming", tags: ["Scheduling", "Payments", "Reviews"] },
  { type: "daycare center", name: "Little Stars Daycare", tags: ["Scheduling", "Payments", "Customer Management"] },
  { type: "tutoring service", name: "BrightPath Tutors", tags: ["Scheduling", "Payments", "Customer Management"] },
  { type: "IT support company", name: "TechResolve IT", tags: ["Scheduling", "Customer Management", "Payments"] },
  { type: "security company", name: "SentinelGuard Security", tags: ["Scheduling", "Staff Management", "Customer Management"] },
  { type: "locksmith service", name: "KeyMaster Locksmith", tags: ["Route Planning", "Scheduling", "Payments"] },
  { type: "flooring company", name: "Foundation Floors", tags: ["Quote/Estimates", "Inventory", "Payments"] },
  { type: "fencing company", name: "Iron Gate Fencing", tags: ["Quote/Estimates", "Scheduling", "Payments"] },
  { type: "tree service", name: "Timberline Tree Care", tags: ["Quote/Estimates", "Scheduling", "Route Planning"] },
  { type: "window cleaning company", name: "ClearView Window Pros", tags: ["Scheduling", "Route Planning", "Payments"] },
  { type: "appliance repair service", name: "FixQuick Appliance Repair", tags: ["Scheduling", "Inventory", "Route Planning"] },
];

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

type Phase = "typing" | "pausing" | "deleting";

function useTypewriter() {
  const [shuffled, setShuffled] = useState(SERVICE_BUSINESSES);
  const [businessIndex, setBusinessIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [phase, setPhase] = useState<Phase>("typing");

  useEffect(() => {
    setShuffled(shuffle(SERVICE_BUSINESSES));
  }, []);

  const current = shuffled[businessIndex];
  const fullText = `${current.type} called ${current.name}`;

  useEffect(() => {
    let delay: number;

    if (phase === "typing") {
      if (charIndex < fullText.length) {
        delay = 50;
      } else {
        // Done typing — pause
        const timeout = setTimeout(() => setPhase("deleting"), 2000);
        return () => clearTimeout(timeout);
      }
    } else if (phase === "deleting") {
      if (charIndex > 0) {
        delay = 30;
      } else {
        // Done deleting — move to next
        setBusinessIndex((i) => (i + 1) % shuffled.length);
        setPhase("typing");
        return;
      }
    } else {
      return;
    }

    const timeout = setTimeout(() => {
      setCharIndex((c) => (phase === "typing" ? c + 1 : c - 1));
    }, delay);

    return () => clearTimeout(timeout);
  }, [charIndex, phase, fullText.length, shuffled.length]);

  const displayText = fullText.slice(0, charIndex);
  const doneTyping = phase === "pausing" || (phase === "typing" && charIndex === fullText.length);

  return { current, displayText, doneTyping };
}

export function WaitlistForm() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");
  const { current: currentBusiness, displayText, doneTyping } = useTypewriter();

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
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
      setMessage("Welcome to the future");
      setEmail("");
    } catch (err) {
      setStatus("error");
      setMessage(err instanceof Error ? err.message : "Something went wrong");
    }
  }, [email]);

  if (status === "success") {
    return (
      <div className="w-full max-w-xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="inline-flex items-center justify-center px-6 py-3 rounded-full bg-[#10A37F]/10 border border-[#10A37F]/20"
        >
          <p className="text-base font-medium text-[#10A37F]">{message}</p>
        </motion.div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-xl mx-auto">
      <div className="flex flex-col gap-4">
        {/* Typewriter business text */}
        <div className="text-sm text-[#999999] text-center min-h-[1.25rem]">
          Build {/^[aeiou]/i.test(currentBusiness.type) ? "an" : "a"}{" "}
          <span className="text-[#E5E5E5]/70">
            {displayText}
          </span>
          <span className="text-[#E5E5E5] animate-blink">|</span>
          {" "}with Ernest
        </div>

        {/* Tags — appear when typing is done */}
        <div className="flex justify-center gap-1.5 min-h-[24px]">
          <AnimatePresence mode="wait">
            {doneTyping && (
              <motion.div
                key={currentBusiness.name}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="flex gap-1.5"
              >
                {currentBusiness.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2 py-0.5 rounded-full bg-[#333333] text-[#E5E5E5] text-[10px] font-medium"
                  >
                    {tag}
                  </span>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Email input */}
        <div className="rounded-full bg-[#161616] border border-[#2A2A2A] px-5 py-3 flex items-center gap-3 shadow-sm">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="your@email.com"
            required
            className={cn(
              "flex-1 bg-transparent text-[#E5E5E5] text-sm placeholder:text-[#666666]",
              "focus:outline-none min-w-0"
            )}
          />
          <button
            type="submit"
            disabled={status === "loading" || !email}
            className={cn(
              "px-5 py-1.5 rounded-full text-xs font-medium transition-all shrink-0",
              email
                ? "bg-[#E5E5E5] text-[#0A0A0A] hover:bg-[#E5E5E5]/85"
                : "bg-[#2A2A2A] text-[#666666]",
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
