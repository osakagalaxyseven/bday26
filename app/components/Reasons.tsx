"use client";

import { useState, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { Heart, X } from "lucide-react";
import { siteContent } from "@/app/data/content";
import {
  fadeInUp,
  staggerContainer,
  staggerItem,
} from "@/app/lib/animations";

export default function Reasons() {
  const { reasons } = siteContent;
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  const handleCardClick = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <section ref={ref} className="py-16 px-4 bg-cream">
      <motion.div
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        variants={staggerContainer}
        className="max-w-lg mx-auto"
      >
        {/* Section Title */}
        <motion.h2
          variants={fadeInUp}
          className="font-romantic text-3xl sm:text-4xl text-rose-gold text-center mb-8"
          style={{ fontFamily: "'Great Vibes', cursive" }}
        >
          {reasons.title}
        </motion.h2>

        {/* Card Grid */}
        <div className="grid grid-cols-2 gap-3 sm:gap-4">
          {reasons.list.map((reason, index) => (
            <motion.div key={index} variants={staggerItem} className="relative">
              {/* Card Front */}
              <motion.button
                onClick={() => handleCardClick(index)}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className={`w-full aspect-square rounded-2xl shadow-md flex flex-col items-center justify-center p-4 transition-all duration-300 ${
                  expandedIndex === index
                    ? "bg-gradient-to-br from-rose-gold to-blush text-white"
                    : "bg-white hover:shadow-lg"
                }`}
              >
                <AnimatePresence mode="wait">
                  {expandedIndex === index ? (
                    <motion.div
                      key="revealed"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      className="text-center"
                    >
                      <p className="text-sm sm:text-base leading-relaxed">
                        {reason}
                      </p>
                      <X className="w-4 h-4 mx-auto mt-3 opacity-60" />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="hidden"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      className="text-center"
                    >
                      <motion.div
                        animate={{ scale: [1, 1.15, 1] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                      >
                        <Heart className="w-8 h-8 mx-auto text-blush fill-blush mb-2" />
                      </motion.div>
                      <p className="text-charcoal-light text-sm">Tap me 💕</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.button>

              {/* Card Number */}
              <div className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-rose-gold text-white text-xs flex items-center justify-center shadow-md">
                {index + 1}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Hint Text */}
        <motion.p
          variants={fadeInUp}
          className="text-center text-charcoal-light text-sm mt-6"
        >
          Tap each card to reveal a reason 💕
        </motion.p>
      </motion.div>
    </section>
  );
}
