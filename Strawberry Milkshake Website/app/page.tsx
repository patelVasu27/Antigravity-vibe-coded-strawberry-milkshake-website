"use client";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { LoadingScreen } from "@/components/LoadingScreen";
import MilkshakeCanvas from "@/components/MilkshakeCanvas";
import Features from "@/components/Features";
import Testimonials from "@/components/Testimonials";
import TwistCTA from "@/components/TwistCTA";

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <main className="min-h-screen bg-brand-black selection:bg-brand-pink selection:text-white">
      <AnimatePresence mode="wait">
        {isLoading && <LoadingScreen onComplete={() => setIsLoading(false)} />}
      </AnimatePresence>

      {!isLoading && (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
        >
            <div className="absolute top-10 left-0 w-full text-center z-50 pointer-events-none">
                <p className="text-white/50 text-sm uppercase tracking-widest">
                    Scroll up action to see animation
                </p>
            </div>
            {/* The Scrollytelling Hero */}
            <MilkshakeCanvas />
            
            {/* Content Sections */}
            <div className="relative z-10 bg-brand-black shadow-[0_-50px_100px_rgba(5,5,5,1)]">
                <Features />
                <Testimonials />
                <TwistCTA />
                
                <footer className="py-12 text-center text-white text-xs tracking-widest uppercase">
                    © 2026 Velvet Vine. All Rights Reserved.
                </footer>
            </div>
        </motion.div>
      )}
    </main>
  );
}
