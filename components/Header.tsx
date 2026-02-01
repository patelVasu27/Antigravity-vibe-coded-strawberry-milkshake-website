"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Header() {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      // Hide header when user scrolls down (scrollY > 50)
      if (window.scrollY > 50) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.header
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.5 }}
          className="fixed-top d-flex justify-content-between align-items-center px-3 py-3 px-md-5 py-md-4 text-white z-40"
          style={{ mixBlendMode: "difference" }}
        >
          <div className="font-serif fw-bold fs-4" style={{ letterSpacing: "0.2em" }}>
            VELVET VINE
          </div>
          <nav>
            <button className="btn btn-link text-white text-decoration-none p-0 border-0" style={{ letterSpacing: "0.1em", fontSize: "0.875rem" }}>
              MENU
            </button>
          </nav>
        </motion.header>
      )}
    </AnimatePresence>
  );
}
