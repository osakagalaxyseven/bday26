import { Variants } from "framer-motion";

// ===== FADE ANIMATIONS =====
export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

export const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

export const fadeInDown: Variants = {
  hidden: { opacity: 0, y: -30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

export const fadeInLeft: Variants = {
  hidden: { opacity: 0, x: -30 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

export const fadeInRight: Variants = {
  hidden: { opacity: 0, x: 30 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

// ===== STAGGER CONTAINER =====
export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1,
    },
  },
};

export const staggerItem: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

// ===== SCALE ANIMATIONS =====
export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

export const popIn: Variants = {
  hidden: { opacity: 0, scale: 0 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 260,
      damping: 20,
    },
  },
};

// ===== CARD FLIP =====
export const cardFlip: Variants = {
  front: {
    rotateY: 0,
    transition: { duration: 0.6, ease: "easeInOut" },
  },
  back: {
    rotateY: 180,
    transition: { duration: 0.6, ease: "easeInOut" },
  },
};

// ===== UNLOCK REVEAL =====
export const unlockReveal: Variants = {
  locked: {
    filter: "blur(8px)",
    opacity: 0.5,
    scale: 0.98,
  },
  unlocked: {
    filter: "blur(0px)",
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.8,
      ease: "easeOut",
      delay: 0.2,
    },
  },
};

// ===== OVERLAY =====
export const overlayFade: Variants = {
  hidden: {
    opacity: 0,
    transition: { duration: 0.3 },
  },
  visible: {
    opacity: 1,
    transition: { duration: 0.5 },
  },
};

// ===== SHAKE ANIMATION =====
export const shake: Variants = {
  shake: {
    x: [0, -10, 10, -10, 10, 0],
    transition: { duration: 0.5 },
  },
};

// ===== HEART BEAT =====
export const heartBeat: Variants = {
  beat: {
    scale: [1, 1.2, 1, 1.15, 1],
    transition: {
      duration: 0.8,
      ease: "easeInOut",
      repeat: Infinity,
      repeatDelay: 1,
    },
  },
};

// ===== FLOATING ELEMENTS =====
export const floatAnimation: Variants = {
  animate: {
    y: [0, -15, 0],
    rotate: [0, 5, -5, 0],
    transition: {
      duration: 4,
      ease: "easeInOut",
      repeat: Infinity,
    },
  },
};

// ===== TYPEWRITER =====
export const typewriter = {
  hidden: { width: "0%" },
  visible: {
    width: "100%",
    transition: {
      duration: 2,
      ease: "linear",
    },
  },
};

// ===== CONFETTI BURST =====
export const confettiBurst: Variants = {
  hidden: {
    opacity: 0,
    scale: 0,
  },
  visible: (i: number) => ({
    opacity: [0, 1, 1, 0],
    scale: [0, 1, 1, 0.5],
    x: [0, (i % 2 === 0 ? 1 : -1) * Math.random() * 100],
    y: [0, -Math.random() * 150],
    rotate: [0, Math.random() * 360],
    transition: {
      duration: 1,
      ease: "easeOut",
    },
  }),
};

// ===== PROGRESS LINE =====
export const progressLine: Variants = {
  hidden: { height: "0%" },
  visible: {
    height: "100%",
    transition: {
      duration: 2,
      ease: "easeOut",
    },
  },
};

// ===== GLOW EFFECT =====
export const glowPulse: Variants = {
  animate: {
    boxShadow: [
      "0 0 5px rgba(248, 180, 196, 0.5), 0 0 10px rgba(248, 180, 196, 0.3)",
      "0 0 20px rgba(248, 180, 196, 0.8), 0 0 30px rgba(183, 110, 121, 0.5)",
      "0 0 5px rgba(248, 180, 196, 0.5), 0 0 10px rgba(248, 180, 196, 0.3)",
    ],
    transition: {
      duration: 2,
      ease: "easeInOut",
      repeat: Infinity,
    },
  },
};
