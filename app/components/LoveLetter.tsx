"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { siteContent } from "@/app/data/content";
import { fadeInUp, staggerContainer, staggerItem } from "@/app/lib/animations";

export default function LoveLetter() {
  const { loveLetter, yourName } = siteContent;
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [displayedText, setDisplayedText] = useState<string[]>([]);
  const [currentParagraph, setCurrentParagraph] = useState(0);
  const [currentChar, setCurrentChar] = useState(0);
  const [showSignature, setShowSignature] = useState(false);

  // Typewriter effect
  useEffect(() => {
    if (!isInView) return;

    if (currentParagraph < loveLetter.paragraphs.length) {
      const paragraph = loveLetter.paragraphs[currentParagraph];

      if (currentChar < paragraph.length) {
        const timeout = setTimeout(() => {
          setDisplayedText((prev) => {
            const newText = [...prev];
            newText[currentParagraph] =
              (newText[currentParagraph] || "") + paragraph[currentChar];
            return newText;
          });
          setCurrentChar((prev) => prev + 1);
        }, 20); 

        return () => clearTimeout(timeout);
      } else {
        // Move to next paragraph
        const timeout = setTimeout(() => {
          setCurrentParagraph((prev) => prev + 1);
          setCurrentChar(0);
        }, 500);

        return () => clearTimeout(timeout);
      }
    } else if (!showSignature) {
      // Show signature after all paragraphs
      const timeout = setTimeout(() => {
        setShowSignature(true);
      }, 300);

      return () => clearTimeout(timeout);
    }
  }, [
    isInView,
    currentParagraph,
    currentChar,
    loveLetter.paragraphs,
    showSignature,
  ]);

  return (
    <section className="py-16 px-4 sm:px-6 bg-cream">
      <motion.div
        ref={ref}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        variants={staggerContainer}
        className="max-w-2xl mx-auto"
      >
        {/* Paper Container */}
        <motion.div
          variants={fadeInUp}
          className="paper p-8 sm:p-12 rounded-lg"
        >
          {/* Greeting */}
          <motion.h2
            variants={staggerItem}
            className="font-romantic text-3xl sm:text-4xl text-rose-gold mb-8"
            style={{ fontFamily: "'Great Vibes', cursive" }}
          >
            {loveLetter.greeting}
          </motion.h2>

          {/* Letter Content */}
          <div className="space-y-6 text-charcoal leading-relaxed text-base sm:text-lg pl-12">
            {loveLetter.paragraphs.map((_, index) => (
              <motion.p
                key={index}
                variants={staggerItem}
                className="min-h-[1.5em]"
              >
                {displayedText[index] || ""}
                {currentParagraph === index &&
                  currentChar < loveLetter.paragraphs[index].length && (
                    <span className="inline-block w-0.5 h-5 bg-rose-gold ml-0.5 animate-pulse" />
                  )}
              </motion.p>
            ))}
          </div>

          {/* Closing & Signature */}
          {showSignature && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="mt-10 pl-12"
            >
              <p className="text-charcoal-light mb-4 italic">
                {loveLetter.closing}
              </p>
              <p
                className="font-romantic text-2xl sm:text-3xl text-rose-gold"
                style={{ fontFamily: "'Great Vibes', cursive" }}
              >
                {yourName}
              </p>
              <p className="text-blush mt-2 text-sm">{loveLetter.signature}</p>
            </motion.div>
          )}
        </motion.div>
      </motion.div>
    </section>
  );
}
