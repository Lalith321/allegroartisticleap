export const pageTransition = { duration: 0.8, ease: [0.22, 1, 0.36, 1] };

export const pageVariants = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: pageTransition },
  exit: { opacity: 0, y: -20, transition: pageTransition },
};

export const fadeInUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.72, ease: "easeInOut" } },
};

export const listStagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08, delayChildren: 0.16 } },
};

export const itemReveal = {
  hidden: { opacity: 0, y: 22, scale: 0.98 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.68, ease: "easeInOut" } },
};

export const hoverScale = {
  whileHover: { y: -2, scale: 1.02 },
  transition: { duration: 0.2, ease: "easeInOut" },
};
