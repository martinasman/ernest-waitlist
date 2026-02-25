"use client";

import { motion } from "framer-motion";
import { WaitlistForm } from "@/components/WaitlistForm";

import { NextBatch } from "@/components/NextBatch";
import { Socials } from "@/components/Socials";

const ease = [0.22, 1, 0.36, 1] as const;

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col dot-grid">
      {/* Nav */}
      <motion.nav
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease }}
        className="w-full py-5 px-6 flex items-center"
      >
        <span className="text-base font-medium text-[#E5E5E5] tracking-wide">
          Ernest
        </span>
      </motion.nav>

      {/* Unified content flow */}
      <div className="flex-1 flex flex-col items-center justify-center px-6">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1, ease }}
          className="w-full flex flex-col items-center"
        >
          <h1 className="text-lg md:text-xl font-medium text-[#E5E5E5]/80 tracking-tight mb-6 text-center">
            The only list you should be on in 2026
          </h1>

          <WaitlistForm />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.25, ease }}
          className="mt-10 w-full"
        >
          <NextBatch />
        </motion.div>
      </div>

      {/* Socials */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.5 }}
      >
        <Socials />
      </motion.div>
    </div>
  );
}
