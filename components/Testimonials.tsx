"use client";
import { motion } from "framer-motion";

const REVIEWS = [
  "The only thing more photogenic than the bottle is the taste.",
  "Literally melted my brain. Best. Shake. Ever.",
  "Velvet Vine is the Erewhon of milkshakes.",
  "The viscosity is unlike anything on the market.",
  "Worth every penny. Pure artistry."
];

export default function Testimonials() {
  return (
    <section className="bg-brand-black py-5 overflow-hidden border-top border-secondary position-relative z-10">
      <div className="d-flex text-nowrap">
        <Marquee />
        <Marquee />
      </div>
    </section>
  );
}

const Marquee = () => (
    <motion.div 
        className="d-flex gap-5 pe-5"
        animate={{ x: "-100%" }}
        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
    >
        {REVIEWS.map((r, i) => (
            <div key={i} className="d-flex align-items-center gap-4">
                <span className="font-serif fs-2 fs-md-1 text-white-50 fst-italic">&ldquo;{r}&rdquo;</span>
                <span className="bg-danger opacity-50 rounded-circle" style={{ width: "0.5rem", height: "0.5rem" }} />
            </div>
        ))}
    </motion.div>
);
