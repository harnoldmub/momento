"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

type Testimonial = {
  id: string;
  name: string;
  detail: string | null;
  message: string;
  rating: number | null;
};

export function TestimonialCarousel({ testimonials }: { testimonials: Testimonial[] }) {
  const [current, setCurrent] = useState(0);

  const next = useCallback(() => {
    setCurrent((c) => (c + 1) % testimonials.length);
  }, [testimonials.length]);

  const prev = useCallback(() => {
    setCurrent((c) => (c - 1 + testimonials.length) % testimonials.length);
  }, [testimonials.length]);

  useEffect(() => {
    const timer = setInterval(next, 6000);
    return () => clearInterval(timer);
  }, [next]);

  if (!testimonials.length) return null;
  const t = testimonials[current];

  return (
    <section className="relative overflow-hidden">
      <div className="relative h-[70vh] md:h-[80vh]">
        <div
          className="absolute inset-0 bg-cover bg-center transition-opacity duration-700"
          style={{ backgroundImage: `url(/home/home-11.jpg)` }}

        />
        <div className="absolute inset-0 bg-black/60" />

        <div className="relative flex h-full items-center justify-center px-6">
          <div className="w-full max-w-2xl">
            <AnimatePresence mode="wait">
              <motion.div
                key={current}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.5 }}
                className="bg-ivory/10 backdrop-blur-md border border-ivory/15 p-8 md:p-12 text-center"
              >
                <div className="font-[var(--font-display)] text-lg md:text-xl tracking-[0.12em] uppercase text-white">
                  {t.name}
                </div>
                {t.detail && (
                  <div className="mt-1 text-[11px] tracking-[0.25em] uppercase text-white/45">
                    {t.detail}
                  </div>
                )}
                <p className="mt-6 text-sm md:text-base leading-relaxed text-white/70 italic">
                  {t.message}
                </p>
              </motion.div>
            </AnimatePresence>

            <div className="mt-6 flex items-center justify-center gap-6">
              <button
                onClick={prev}
                className="text-white/40 hover:text-white transition-colors text-2xl"
                aria-label="Pr\u00e9c\u00e9dent"
              >
                &lsaquo;
              </button>
              <div className="flex gap-2">
                {testimonials.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrent(i)}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${i === current ? "bg-white/80 w-4" : "bg-white/25"
                      }`}
                    aria-label={`T\u00e9moignage ${i + 1}`}
                  />
                ))}
              </div>
              <button
                onClick={next}
                className="text-white/40 hover:text-white transition-colors text-2xl"
                aria-label="Suivant"
              >
                &rsaquo;
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
