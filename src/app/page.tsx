import { WaitlistForm } from "@/components/WaitlistForm";
import { BusinessShowcase } from "@/components/BusinessShowcase";
import { NextBatch } from "@/components/NextBatch";
import { Socials } from "@/components/Socials";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col dot-grid">
      {/* Nav */}
      <nav className="w-full py-5 px-6 flex items-center justify-center">
        <span className="text-base font-medium text-[#191919] tracking-wide">
          Ernest
        </span>
      </nav>

      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center justify-center px-6">
        <h1 className="text-lg md:text-xl font-medium text-[#191919]/80 tracking-tight mb-8 text-center">
          The only list you should be on in 2026
        </h1>

        <WaitlistForm />
      </main>

      {/* Next Batch Countdown */}
      <NextBatch />

      {/* Business Showcase */}
      <BusinessShowcase />

      {/* Socials */}
      <Socials />
    </div>
  );
}
