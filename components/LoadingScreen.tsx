"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export const LoadingScreen = ({ onComplete }: { onComplete: () => void }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const totalFrames = 192;
    let loaded = 0;

    const loadImages = async () => {
      const promises = [];
      for (let i = 0; i < totalFrames; i++) {
        const src = `/sequence/${i.toString().padStart(3, "0")}.jpg`;
        const img = new Image();
        img.src = src;
        promises.push(
          img.decode().then(() => {
            loaded++;
            setProgress(Math.round((loaded / totalFrames) * 100));
          }).catch(() => {
             console.warn("Failed to load frame", i, src);
             loaded++; 
             setProgress(Math.round((loaded / totalFrames) * 100));
          })
        );
      }
      await Promise.all(promises);
      setTimeout(onComplete, 800); // Slight delay for polish
    };

    loadImages();
  }, [onComplete]);

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center bg-brand-black text-white"
      exit={{ opacity: 0, transition: { duration: 1.5, ease: "easeInOut" } }}
    >
        <div className="flex flex-col items-center gap-6">
            <h1 className="font-serif text-5xl tracking-[0.2em] text-brand-pink">VELVET VINE</h1>
            <div className="w-64 h-px bg-gray-800 rounded-full overflow-hidden relative">
                <motion.div 
                    className="absolute top-0 left-0 h-full bg-brand-pink"
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                />
            </div>
            <div className="font-mono text-xs text-gray-500 tracking-widest">
                PREPARING EXPERIENCE {progress}%
            </div>
        </div>
    </motion.div>
  );
};
