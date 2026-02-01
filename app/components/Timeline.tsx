"use client";

import { useRef } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { Heart, Star, Sparkles, Gift, Calendar } from "lucide-react";
import { siteContent } from "@/app/data/content";
import { fadeInUp, staggerContainer, staggerItem } from "@/app/lib/animations";

const iconMap: Record<string, React.ReactNode> = {
  heart: <Heart className="w-5 h-5" />,
  star: <Star className="w-5 h-5" />,
  sparkles: <Sparkles className="w-5 h-5" />,
  gift: <Gift className="w-5 h-5" />,
  calendar: <Calendar className="w-5 h-5" />,
};

export default function Timeline() {
  const { timeline } = siteContent;
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const lineHeight = useTransform(scrollYProgress, [0, 0.8], ["0%", "100%"]);

  return (
    <section ref={ref} className="py-16 px-4 bg-cream">
      <motion.div
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        variants={staggerContainer}
        className="max-w-xl mx-auto"
      >
        {/* Section Title */}
        <motion.h2
          variants={fadeInUp}
          className="font-romantic text-3xl sm:text-4xl text-rose-gold text-center mb-12"
          style={{ fontFamily: "'Great Vibes', cursive" }}
        >
          {timeline.title}
        </motion.h2>

        {/* Timeline Container */}
        <div className="relative">
          {/* Animated Progress Line */}
          <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-blush-light">
            <motion.div
              className="w-full bg-gradient-to-b from-blush to-rose-gold origin-top"
              style={{ height: lineHeight }}
            />
          </div>

          {/* Milestones */}
          <div className="space-y-8">
            {timeline.milestones.map((milestone, index) => (
              <motion.div
                key={index}
                variants={staggerItem}
                className="relative pl-16"
              >
                {/* Icon Circle */}
                <motion.div
                  initial={{ scale: 0 }}
                  animate={isInView ? { scale: 1 } : { scale: 0 }}
                  transition={{ delay: index * 0.2 + 0.3, type: "spring" }}
                  className="absolute left-0 w-12 h-12 rounded-full bg-gradient-to-br from-blush to-rose-gold flex items-center justify-center text-white shadow-lg"
                >
                  {iconMap[milestone.icon] || <Heart className="w-5 h-5" />}
                </motion.div>

                {/* Content Card */}
                <motion.div
                  whileHover={{ scale: 1.02, x: 5 }}
                  className="bg-white rounded-xl p-5 shadow-md hover:shadow-lg transition-all duration-300"
                >
                  {/* Date */}
                  <p className="text-sm text-rose-gold font-medium mb-1">
                    {milestone.date}
                  </p>

                  {/* Title */}
                  <h3 className="text-lg font-semibold text-charcoal mb-2">
                    {milestone.title}
                  </h3>

                  {/* Description */}
                  <p className="text-charcoal-light text-sm leading-relaxed">
                    {milestone.description}
                  </p>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
}
