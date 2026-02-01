"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Heart, Sparkles, ChevronDown } from "lucide-react";
import { siteContent } from "@/app/data/content";
import { fadeInUp, fadeIn } from "@/app/lib/animations";

const FloatingHeart = ({
  delay,
  left,
  size,
}: {
  delay: number;
  left: string;
  size: number;
}) => (
  <motion.div
    className="absolute text-blush opacity-40"
    style={{ left, bottom: "-20px" }}
    animate={{
      y: [0, -1200],
      x: [0, (Math.random() - 0.5) * 50],
      rotate: [0, Math.random() * 360],
      opacity: [0, 0.6, 0.6, 0],
    }}
    transition={{
      duration: 8 + Math.random() * 4,
      delay,
      repeat: Infinity,
      ease: "easeOut",
    }}
  >
    <Heart size={size} fill="currentColor" />
  </motion.div>
);

const FloatingSparkle = ({
  delay,
  left,
  top,
}: {
  delay: number;
  left: string;
  top: string;
}) => (
  <motion.div
    className="absolute text-gold"
    style={{ left, top }}
    animate={{
      scale: [0, 1, 0],
      opacity: [0, 1, 0],
      rotate: [0, 180],
    }}
    transition={{
      duration: 2,
      delay,
      repeat: Infinity,
      repeatDelay: 3,
    }}
  >
    <Sparkles size={16} />
  </motion.div>
);

export default function Hero() {
  const { hero } = siteContent;
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const scrollToNext = () => {
    if (typeof window !== "undefined") {
      window.scrollTo({
        top: window.innerHeight,
        behavior: "smooth",
      });
    }
  };

  const heartSizes = [20, 24, 18, 28, 22, 26, 19, 25];
  const sparkleTops = ["20%", "45%", "70%", "25%", "50%", "35%"];

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden gradient-hero">
      {/* Floating Hearts Background */}
      {mounted && (
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {[...Array(8)].map((_, i) => (
            <FloatingHeart
              key={i}
              delay={i * 1.2}
              left={`${10 + i * 12}%`}
              size={heartSizes[i]}
            />
          ))}
        </div>
      )}

      {/* Sparkles */}
      {mounted && (
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(6)].map((_, i) => (
            <FloatingSparkle
              key={i}
              delay={i * 0.8}
              left={`${15 + i * 15}%`}
              top={sparkleTops[i]}
            />
          ))}
        </div>
      )}

      {/* Main Content */}
      <motion.div
        className="relative z-10 text-center px-6 max-w-lg mx-auto"
        initial="hidden"
        animate="visible"
        variants={{
          hidden: { opacity: 0 },
          visible: {
            opacity: 1,
            transition: { staggerChildren: 0.3, delayChildren: 0.5 },
          },
        }}
      >
        {/* Heart Icon */}
        <motion.div variants={fadeIn} className="mb-6">
          <motion.div
            animate={{ scale: [1, 1.15, 1] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          >
            <Heart className="w-12 h-12 mx-auto text-rose-gold fill-rose-gold" />
          </motion.div>
        </motion.div>

        {/* Headline */}
        <motion.h1
          variants={fadeInUp}
          className="font-romantic text-4xl sm:text-5xl md:text-6xl text-rose-gold mb-4 leading-tight"
          style={{ fontFamily: "'Great Vibes', cursive" }}
        >
          {hero.headline}
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          variants={fadeInUp}
          className="text-charcoal-light text-lg sm:text-xl leading-relaxed mb-12"
        >
          {hero.subtitle}
        </motion.p>

        {/* CTA Button */}
        <motion.button
          variants={fadeInUp}
          onClick={scrollToNext}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="group relative inline-flex items-center gap-2 px-8 py-4 bg-blush text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 text-lg font-medium"
        >
          <span>{hero.ctaText}</span>
          <motion.span
            animate={{ y: [0, 5, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            <ChevronDown size={20} />
          </motion.span>

          {/* Glow effect */}
          <div className="absolute inset-0 rounded-full bg-blush opacity-0 group-hover:opacity-50 blur-xl transition-opacity duration-300" />
        </motion.button>
      </motion.div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-cream to-transparent" />
    </section>
  );
}
