"use client";

import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ChevronLeft, ChevronRight, Heart } from "lucide-react";
import { siteContent } from "@/app/data/content";
import { fadeInUp } from "@/app/lib/animations";

export default function PhotoCarousel() {
  const { photos } = siteContent;
  const [activeIndex, setActiveIndex] = useState(0);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  const minSwipeDistance = 50;

  const handlePrev = () => {
    setActiveIndex((prev) => (prev === 0 ? photos.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev === photos.length - 1 ? 0 : prev + 1));
  };

  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe) handleNext();
    if (isRightSwipe) handlePrev();
  };

  return (
    <section
      ref={ref}
      className="py-16 px-4 bg-gradient-to-b from-cream to-lavender-light overflow-hidden"
    >
      <motion.div
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        variants={fadeInUp}
        className="max-w-4xl mx-auto"
      >
        {/* Section Title */}
        <motion.h2
          variants={fadeInUp}
          className="font-romantic text-3xl sm:text-4xl text-rose-gold text-center mb-8"
          style={{ fontFamily: "'Great Vibes', cursive" }}
        >
          Our Memories <Heart className="inline-block w-6 h-6 fill-rose-gold" />
        </motion.h2>

        {/* Carousel Container */}
        <div
          className="relative"
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
        >
          {/* Main Image Display */}
          <div className="relative aspect-[4/3] max-w-lg mx-auto mb-6">
            {photos.map((photo, index) => (
              <motion.div
                key={index}
                initial={false}
                animate={{
                  opacity: index === activeIndex ? 1 : 0,
                  scale: index === activeIndex ? 1 : 0.9,
                  zIndex: index === activeIndex ? 10 : 0,
                }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="absolute inset-0 rounded-2xl overflow-hidden shadow-xl"
              >
                <div className="relative w-full h-full bg-blush-light">
                  {/* Placeholder for actual images */}
                  <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-blush-light to-lavender-light">
                    <div className="text-center">
                      <Heart className="w-12 h-12 mx-auto mb-2 text-rose-gold fill-rose-gold opacity-50" />
                      <p className="text-charcoal-light text-sm">
                        Add your photo to
                      </p>
                      <p className="text-charcoal text-xs font-mono mt-1">
                        public{photo.src}
                      </p>
                    </div>
                  </div>
                  {/*
                  <Image
                    src={photo.src}
                    alt={photo.caption}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 512px"
                  />
                  */}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Caption */}
          <motion.p
            key={activeIndex}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center text-charcoal-light italic mb-6"
          >
            &ldquo;{photos[activeIndex].caption}&rdquo;
          </motion.p>

          {/* Navigation Arrows */}
          <div className="absolute inset-y-0 left-0 right-0 flex items-center justify-between pointer-events-none px-2 sm:px-4">
            <motion.button
              onClick={handlePrev}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="pointer-events-auto p-2 rounded-full bg-white/80 backdrop-blur-sm shadow-lg text-charcoal hover:bg-white transition-colors"
            >
              <ChevronLeft size={24} />
            </motion.button>
            <motion.button
              onClick={handleNext}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="pointer-events-auto p-2 rounded-full bg-white/80 backdrop-blur-sm shadow-lg text-charcoal hover:bg-white transition-colors"
            >
              <ChevronRight size={24} />
            </motion.button>
          </div>

          {/* Dots Indicator */}
          <div className="flex justify-center gap-2 mt-4">
            {photos.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveIndex(index)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index === activeIndex
                    ? "w-6 bg-rose-gold"
                    : "bg-blush hover:bg-rose-gold/50"
                }`}
              />
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
}
