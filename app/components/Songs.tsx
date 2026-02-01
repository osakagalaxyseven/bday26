"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Play, Music, ExternalLink } from "lucide-react";
import { siteContent } from "@/app/data/content";
import { fadeInUp, staggerContainer, staggerItem } from "@/app/lib/animations";

// Floating music note
const FloatingNote = ({ delay, left }: { delay: number; left: string }) => (
  <motion.div
    className="absolute text-blush opacity-30 pointer-events-none"
    style={{ left }}
    animate={{
      y: [0, -40, 0],
      x: [0, 10, -10, 0],
      rotate: [0, 15, -15, 0],
      opacity: [0.3, 0.5, 0.3],
    }}
    transition={{
      duration: 4,
      delay,
      repeat: Infinity,
      ease: "easeInOut",
    }}
  >
    <Music size={20} />
  </motion.div>
);

export default function Songs() {
  const { songs } = siteContent;
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <section
      ref={ref}
      className="py-16 px-4 bg-gradient-to-b from-lavender-light to-cream relative overflow-hidden"
    >
      {/* Floating Notes Background */}
      <div className="absolute inset-0">
        {[...Array(5)].map((_, i) => (
          <FloatingNote key={i} delay={i * 0.8} left={`${15 + i * 18}%`} />
        ))}
      </div>

      <motion.div
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        variants={staggerContainer}
        className="max-w-lg mx-auto relative z-10"
      >
        {/* Section Title */}
        <motion.div variants={fadeInUp} className="text-center mb-8">
          <h2
            className="font-romantic text-3xl sm:text-4xl text-rose-gold mb-2"
            style={{ fontFamily: "'Great Vibes', cursive" }}
          >
            {songs.title}
          </h2>
          <p className="text-charcoal-light text-sm">{songs.subtitle}</p>
        </motion.div>

        {/* Playlist Cards */}
        <div className="space-y-3">
          {songs.playlist.map((song, index) => (
            <motion.a
              key={index}
              href={song.link}
              target="_blank"
              rel="noopener noreferrer"
              variants={staggerItem}
              whileHover={{ scale: 1.02, x: 5 }}
              whileTap={{ scale: 0.98 }}
              className="group flex items-center gap-4 bg-white/80 backdrop-blur-sm rounded-xl p-4 shadow-sm hover:shadow-md transition-all duration-300"
            >
              {/* Play Icon */}
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blush to-rose-gold flex items-center justify-center text-white shadow-md group-hover:shadow-lg transition-shadow">
                <Play size={20} className="ml-0.5" fill="currentColor" />
              </div>

              {/* Song Info */}
              <div className="flex-1 min-w-0">
                <h3 className="font-medium text-charcoal truncate group-hover:text-rose-gold transition-colors">
                  {song.title}
                </h3>
                <p className="text-sm text-charcoal-light truncate">
                  {song.artist}
                </p>
              </div>

              {/* External Link Icon */}
              <ExternalLink
                size={16}
                className="text-charcoal-light opacity-0 group-hover:opacity-100 transition-opacity"
              />
            </motion.a>
          ))}
        </div>

        {/* Decorative Music Note */}
        <motion.div variants={fadeInUp} className="mt-8 text-center">
          <motion.div
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            <Music className="w-8 h-8 mx-auto text-blush" />
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}
