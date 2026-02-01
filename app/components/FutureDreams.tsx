"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  Star,
  Sparkles,
  MapPin,
  Home,
  Heart,
  Users,
  Plane,
  Smile,
} from "lucide-react";
import { siteContent } from "@/app/data/content";
import { fadeInUp, staggerContainer, staggerItem } from "@/app/lib/animations";

// Floating star component
const FloatingStar = ({
  delay,
  left,
  top,
  size,
}: {
  delay: number;
  left: string;
  top: string;
  size: number;
}) => (
  <motion.div
    className="absolute text-gold pointer-events-none"
    style={{ left, top }}
    animate={{
      opacity: [0.2, 0.8, 0.2],
      scale: [1, 1.2, 1],
    }}
    transition={{
      duration: 3,
      delay,
      repeat: Infinity,
      ease: "easeInOut",
    }}
  >
    <Star size={size} fill="currentColor" />
  </motion.div>
);

const dreamIcons = [
  <Plane key="plane" className="w-5 h-5" />,
  <Home key="home" className="w-5 h-5" />,
  <Users key="users" className="w-5 h-5" />,
  <Smile key="smile" className="w-5 h-5" />,
  <Heart key="heart" className="w-5 h-5" />,
  <Sparkles key="sparkles" className="w-5 h-5" />,
];

export default function FutureDreams() {
  const { futureDreams } = siteContent;
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <section
      ref={ref}
      className="py-16 px-4 gradient-dreamy relative overflow-hidden min-h-[500px]"
    >
      {/* Starry Background */}
      <div className="absolute inset-0">
        {[...Array(15)].map((_, i) => (
          <FloatingStar
            key={i}
            delay={i * 0.3}
            left={`${Math.random() * 100}%`}
            top={`${Math.random() * 100}%`}
            size={8 + Math.random() * 8}
          />
        ))}
      </div>

      <motion.div
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        variants={staggerContainer}
        className="max-w-lg mx-auto relative z-10"
      >
        {/* Section Title */}
        <motion.div variants={fadeInUp} className="text-center mb-10">
          <motion.div
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 4, repeat: Infinity }}
          >
            <Sparkles className="w-8 h-8 mx-auto mb-4 text-gold" />
          </motion.div>
          <h2
            className="font-romantic text-3xl sm:text-4xl text-white mb-2"
            style={{ fontFamily: "'Great Vibes', cursive" }}
          >
            {futureDreams.title}
          </h2>
          <p className="text-white/70 text-sm">{futureDreams.subtitle}</p>
        </motion.div>

        {/* Dreams List */}
        <div className="space-y-4">
          {futureDreams.dreams.map((dream, index) => (
            <motion.div
              key={index}
              variants={staggerItem}
              whileHover={{ scale: 1.02, x: 5 }}
              className="flex items-center gap-4 bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20"
            >
              {/* Icon */}
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-gold/80 to-rose-gold/80 flex items-center justify-center text-white shadow-lg">
                {dreamIcons[index % dreamIcons.length]}
              </div>

              {/* Dream Text */}
              <p className="flex-1 text-white/90 text-sm sm:text-base">
                {dream}
              </p>

              {/* Star Accent */}
              <motion.div
                animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: index * 0.2,
                }}
              >
                <Star className="w-4 h-4 text-gold fill-gold" />
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* Bottom Heart */}
        <motion.div variants={fadeInUp} className="mt-10 text-center">
          <motion.div
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            <Heart className="w-8 h-8 mx-auto text-rose-gold fill-rose-gold" />
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}
