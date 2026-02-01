"use client";

import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Lock, Heart, Unlock, Gift } from "lucide-react";
import { siteContent } from "@/app/data/content";
import { fadeInUp, staggerContainer, unlockReveal } from "@/app/lib/animations";
import UnlockInput from "./UnlockInput";

// Confetti heart component
const ConfettiHeart = ({ delay, index }: { delay: number; index: number }) => {
  const angle = (index / 12) * Math.PI * 2;
  const distance = 80 + Math.random() * 60;

  return (
    <motion.div
      className="absolute text-rose-gold"
      initial={{ opacity: 0, scale: 0, x: 0, y: 0 }}
      animate={{
        opacity: [0, 1, 1, 0],
        scale: [0, 1, 1, 0.5],
        x: Math.cos(angle) * distance,
        y: Math.sin(angle) * distance - 50,
        rotate: Math.random() * 360,
      }}
      transition={{
        duration: 1.2,
        delay,
        ease: "easeOut",
      }}
    >
      <Heart size={12} fill="currentColor" />
    </motion.div>
  );
};

interface LockedSurpriseProps {
  onUnlock?: () => void;
}

export default function LockedSurprise({ onUnlock }: LockedSurpriseProps) {
  const { lockedSurprise } = siteContent;
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [showInput, setShowInput] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [justUnlocked, setJustUnlocked] = useState(false);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  const handleUnlock = (success: boolean) => {
    if (success) {
      setShowConfetti(true);
      setJustUnlocked(true);

      setTimeout(() => {
        setIsUnlocked(true);
        onUnlock?.();
      }, 800);

      setTimeout(() => {
        setShowConfetti(false);
        setJustUnlocked(false);
      }, 2000);
    }
  };

  return (
    <section
      ref={ref}
      className="py-16 px-4 bg-gradient-to-b from-cream to-blush-light"
    >
      <motion.div
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        variants={staggerContainer}
        className="max-w-lg mx-auto"
      >
        {/* Section Title */}
        <motion.div variants={fadeInUp} className="text-center mb-8">
          <Gift className="w-8 h-8 mx-auto mb-4 text-rose-gold" />
          <h2
            className="font-romantic text-3xl sm:text-4xl text-rose-gold"
            style={{ fontFamily: "'Great Vibes', cursive" }}
          >
            {lockedSurprise.title}
          </h2>
        </motion.div>

        {/* Locked/Unlocked Content Container */}
        <motion.div
          variants={fadeInUp}
          className="relative rounded-2xl overflow-hidden"
        >
          {/* Content (blurred when locked) */}
          <motion.div
            variants={unlockReveal}
            initial="locked"
            animate={isUnlocked ? "unlocked" : "locked"}
            className={`bg-white rounded-2xl p-6 sm:p-8 shadow-lg ${
              !isUnlocked ? "pointer-events-none select-none" : ""
            }`}
          >
            <motion.h3
              initial={{ opacity: 0, y: 20 }}
              animate={isUnlocked ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.4 }}
              className="font-romantic text-2xl text-rose-gold text-center mb-6"
              style={{ fontFamily: "'Great Vibes', cursive" }}
            >
              {lockedSurprise.revealedTitle}
            </motion.h3>

            <div className="space-y-4 text-charcoal leading-relaxed">
              {lockedSurprise.revealedMessage.map((paragraph, index) => (
                <motion.p
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={isUnlocked ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.5 + index * 0.15 }}
                >
                  {paragraph}
                </motion.p>
              ))}
            </div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={isUnlocked ? { opacity: 1 } : {}}
              transition={{ delay: 1 }}
              className="mt-8 text-center font-romantic text-xl text-rose-gold"
              style={{ fontFamily: "'Great Vibes', cursive" }}
            >
              {lockedSurprise.signature}
            </motion.p>
          </motion.div>

          {/* Lock Overlay */}
          {!isUnlocked && !justUnlocked && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-charcoal/20 backdrop-blur-md rounded-2xl flex flex-col items-center justify-center p-6"
            >
              <motion.div
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="mb-4"
              >
                <div className="w-16 h-16 rounded-full bg-white/90 flex items-center justify-center shadow-lg">
                  <Lock className="w-8 h-8 text-rose-gold" />
                </div>
              </motion.div>

              <p className="text-white text-center mb-6 font-medium">
                {lockedSurprise.lockedText}
              </p>

              {!showInput ? (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setShowInput(true)}
                  className="px-6 py-3 bg-white text-rose-gold rounded-full shadow-lg hover:shadow-xl transition-shadow font-medium"
                >
                  {lockedSurprise.unlockButtonText}
                </motion.button>
              ) : (
                <UnlockInput onUnlock={handleUnlock} />
              )}
            </motion.div>
          )}

          {/* Confetti Effect */}
          {showConfetti && (
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="relative">
                {[...Array(12)].map((_, i) => (
                  <ConfettiHeart key={i} delay={i * 0.05} index={i} />
                ))}
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: [0, 1.5, 1] }}
                  transition={{ duration: 0.5 }}
                >
                  <Unlock className="w-12 h-12 text-rose-gold" />
                </motion.div>
              </div>
            </div>
          )}
        </motion.div>
      </motion.div>
    </section>
  );
}
