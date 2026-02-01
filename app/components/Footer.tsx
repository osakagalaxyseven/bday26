"use client";

import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Heart } from "lucide-react";
import { siteContent } from "@/app/data/content";
import { fadeInUp } from "@/app/lib/animations";

interface FooterProps {
  onSecretTrigger: () => void;
  isUnlocked: boolean;
}

export default function Footer({ onSecretTrigger, isUnlocked }: FooterProps) {
  const { footer, yourName, partnerName } = siteContent;
  const [tapCount, setTapCount] = useState(0);
  const [longPressTimer, setLongPressTimer] = useState<NodeJS.Timeout | null>(
    null,
  );
  const tapTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Triple tap detection
  const handleTap = () => {
    if (!isUnlocked) return;

    setTapCount((prev) => prev + 1);

    if (tapTimeoutRef.current) {
      clearTimeout(tapTimeoutRef.current);
    }

    tapTimeoutRef.current = setTimeout(() => {
      setTapCount(0);
    }, 500);
  };

  useEffect(() => {
    if (tapCount >= 3 && isUnlocked) {
      onSecretTrigger();
      setTapCount(0);
    }
  }, [tapCount, isUnlocked, onSecretTrigger]);

  // Long press detection on heart
  const handleTouchStart = () => {
    if (!isUnlocked) return;

    const timer = setTimeout(() => {
      onSecretTrigger();
    }, 2500); // 2.5 seconds

    setLongPressTimer(timer);
  };

  const handleTouchEnd = () => {
    if (longPressTimer) {
      clearTimeout(longPressTimer);
      setLongPressTimer(null);
    }
  };

  return (
    <footer className="py-12 px-4 bg-gradient-to-b from-blush-light to-cream">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeInUp}
        className="max-w-lg mx-auto text-center"
      >
        {/* Heart Icon - Long press trigger */}
        <motion.div
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          onMouseDown={handleTouchStart}
          onMouseUp={handleTouchEnd}
          onMouseLeave={handleTouchEnd}
          className={`inline-block mb-4 ${isUnlocked ? "cursor-pointer" : ""}`}
          whileHover={isUnlocked ? { scale: 1.1 } : {}}
          whileTap={isUnlocked ? { scale: 0.95 } : {}}
        >
          <motion.div
            animate={{ scale: [1, 1.15, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            <Heart className="w-8 h-8 text-rose-gold fill-rose-gold" />
          </motion.div>
        </motion.div>

        {/* Message */}
        <p className="text-charcoal-light mb-2">{footer.message}</p>

        {/* Signature - Triple tap trigger */}
        <motion.p
          onClick={handleTap}
          className={`font-romantic text-xl text-rose-gold ${isUnlocked ? "cursor-pointer" : ""}`}
          style={{ fontFamily: "'Great Vibes', cursive" }}
          whileHover={isUnlocked ? { scale: 1.05 } : {}}
        >
          For {partnerName}, with love 💕
        </motion.p>

        {/* Year */}
        <p className="text-charcoal-light/60 text-sm mt-4">© {footer.year}</p>

        {isUnlocked && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.3 }}
            transition={{ delay: 3 }}
            className="text-charcoal-light/30 text-xs mt-6"
          >
            Some secrets are hidden for those who look a little longer...
          </motion.p>
        )}
      </motion.div>
    </footer>
  );
}
