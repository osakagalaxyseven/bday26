"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Heart, Star, X } from "lucide-react";
import { siteContent } from "@/app/data/content";
import {
  overlayFade,
  fadeInUp,
  staggerContainer,
  staggerItem,
} from "@/app/lib/animations";

interface SecretOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

// Floating element
const FloatingElement = ({
  delay,
  left,
  top,
  type,
}: {
  delay: number;
  left: string;
  top: string;
  type: "heart" | "star";
}) => (
  <motion.div
    className={`absolute ${type === "heart" ? "text-rose-gold" : "text-gold"} opacity-40`}
    style={{ left, top }}
    animate={{
      y: [0, -20, 0],
      x: [0, 10, -10, 0],
      opacity: [0.3, 0.6, 0.3],
      scale: [1, 1.2, 1],
    }}
    transition={{
      duration: 4 + Math.random() * 2,
      delay,
      repeat: Infinity,
      ease: "easeInOut",
    }}
  >
    {type === "heart" ? (
      <Heart size={12 + Math.random() * 12} fill="currentColor" />
    ) : (
      <Star size={8 + Math.random() * 10} fill="currentColor" />
    )}
  </motion.div>
);

export default function SecretOverlay({ isOpen, onClose }: SecretOverlayProps) {
  const { secretMessage } = siteContent;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          variants={overlayFade}
          initial="hidden"
          animate="visible"
          exit="hidden"
          onClick={onClose}
          className="fixed inset-0 z-50 flex items-center justify-center p-6 cursor-pointer"
        >
          {/* Dark Dreamy Background */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 gradient-dreamy"
          />

          {/* Floating Stars and Hearts */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {[...Array(12)].map((_, i) => (
              <FloatingElement
                key={`star-${i}`}
                delay={i * 0.3}
                left={`${Math.random() * 100}%`}
                top={`${Math.random() * 100}%`}
                type="star"
              />
            ))}
            {[...Array(8)].map((_, i) => (
              <FloatingElement
                key={`heart-${i}`}
                delay={i * 0.4}
                left={`${Math.random() * 100}%`}
                top={`${Math.random() * 100}%`}
                type="heart"
              />
            ))}
          </div>

          {/* Content */}
          <motion.div
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={staggerContainer}
            className="relative z-10 max-w-md text-center"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Heart Icon */}
            <motion.div variants={staggerItem} className="mb-6">
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                <Heart className="w-12 h-12 mx-auto text-rose-gold fill-rose-gold" />
              </motion.div>
            </motion.div>

            {/* Title */}
            <motion.h3
              variants={staggerItem}
              className="font-romantic text-3xl sm:text-4xl text-white mb-8"
              style={{ fontFamily: "'Great Vibes', cursive" }}
            >
              {secretMessage.title}
            </motion.h3>

            {/* Message */}
            <div className="space-y-4">
              {secretMessage.message.map((line, index) => (
                <motion.p
                  key={index}
                  variants={staggerItem}
                  className="text-white/90 text-lg leading-relaxed"
                >
                  {line}
                </motion.p>
              ))}
            </div>

            {/* Close hint */}
            <motion.p
              variants={staggerItem}
              className="mt-10 text-white/50 text-sm"
            >
              Tap anywhere to close
            </motion.p>
          </motion.div>

          {/* Close button (optional) */}
          <motion.button
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
            transition={{ delay: 0.5 }}
            onClick={onClose}
            className="absolute top-6 right-6 w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center text-white/70 hover:text-white hover:bg-white/20 transition-colors"
          >
            <X size={20} />
          </motion.button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
