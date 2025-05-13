"use client";

import { motion } from "framer-motion";

interface AnimatedTitleProps {
  title: string;
}

export default function AnimatedTitle({ title }: AnimatedTitleProps) {
  const words = title.split(" ");

  const container = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: { staggerChildren: 0.12, delayChildren: 0.04 * i },
    }),
  };

  const child = {
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100,
      },
    },
    hidden: {
      opacity: 0,
      y: 20,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100,
      },
    },
  };

  return (
    <motion.div
      className="text-center"
      variants={container}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.8 }}
    >
      <div className="inline-block relative">
        {words.map((word, index) => (
          <motion.span
            key={index}
            className="inline-block mr-2 text-3xl md:text-4xl font-bold"
            variants={child}
          >
            {word}
          </motion.span>
        ))}
        <span className="absolute -bottom-2 left-0 right-0 h-1 bg-amber-500"></span>
      </div>
    </motion.div>
  );
}
