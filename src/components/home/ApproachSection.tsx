"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export function ApproachSection() {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"],
    });

    const y = useTransform(scrollYProgress, [0, 1], ["-30%", "30%"]);

    return (
        <section ref={containerRef} className="relative h-[60vh] md:h-[80vh] overflow-hidden flex items-center justify-center">
            {/* Parallax Background Image */}
            <motion.div
                style={{ y }}
                className="absolute inset-0 z-0"
            >
                <img
                    src="/contact/contact-h.jpg"
                    alt="Cinematic approach"
                    className="w-full h-[140%] object-cover"
                />
                <div className="absolute inset-0 bg-black/40" />
            </motion.div>

            {/* Overlay Text 
            <div className="relative z-10 text-center px-6">
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
                    className="text-white text-3xl md:text-5xl lg:text-6xl tracking-[0.2em] font-light uppercase"
                    style={{ fontFamily: "var(--font-worksans), 'Work Sans', sans-serif" }}
                >
                    Approche Cinématographique & Éditoriale
                </motion.h2>
            </div>
            */}
        </section>
    );
}
