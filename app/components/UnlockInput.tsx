"use client";

import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { Heart, Lock } from "lucide-react";
import { siteContent } from "@/app/data/content";
import { shake, glowPulse } from "@/app/lib/animations";

interface UnlockInputProps {
  onUnlock: (success: boolean) => void;
}

export default function UnlockInput({ onUnlock }: UnlockInputProps) {
  const { lockedSurprise } = siteContent;
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [isGlowing, setIsGlowing] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (
      password.toLowerCase().trim() === lockedSurprise.password.toLowerCase()
    ) {
      setIsGlowing(true);
      setError(false);
      onUnlock(true);
    } else {
      setError(true);
      setPassword("");
      inputRef.current?.focus();

      // Reset error after animation
      setTimeout(() => setError(false), 1000);
    }
  };

  return (
    <motion.form
      onSubmit={handleSubmit}
      variants={shake}
      animate={error ? "shake" : ""}
      className="w-full max-w-xs"
    >
      <div className="relative">
        {/* Input Field */}
        <motion.input
          ref={inputRef}
          type="text"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder={lockedSurprise.inputPlaceholder}
          variants={glowPulse}
          animate={isGlowing ? "animate" : ""}
          className={`w-full px-5 py-3 pr-12 rounded-full bg-white/90 backdrop-blur-sm text-charcoal placeholder:text-charcoal-light/60 text-center shadow-md focus:outline-none focus:ring-2 focus:ring-rose-gold transition-all ${
            error ? "ring-2 ring-red-400" : ""
          } ${isGlowing ? "ring-2 ring-rose-gold" : ""}`}
          autoComplete="off"
        />

        {/* Submit Button */}
        <motion.button
          type="submit"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="absolute right-2 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-gradient-to-r from-blush to-rose-gold flex items-center justify-center text-white shadow-md"
        >
          <Heart size={16} fill="currentColor" />
        </motion.button>
      </div>

      {/* Error Message */}
      {error && (
        <motion.p
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-white text-center text-sm mt-3"
        >
          {lockedSurprise.wrongPasswordMessage}
        </motion.p>
      )}
    </motion.form>
  );
}
