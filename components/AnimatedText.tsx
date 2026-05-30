"use client";
import React from "react";
import { motion } from "framer-motion";
import { useSequencer } from "./Sequencer";
import { useScrollReveal } from "./ScrollReveal";

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.04 } },
};

const wordVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

type Props = {
  as?: string;
  children: React.ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
};

export default function AnimatedText({
  as = "div",
  children,
  className = "",
  delay = 0,
  duration = 0.42,
}: Props) {
  const sequencer = useSequencer();
  const isScrollReveal = useScrollReveal();
  const Tag: any = (motion as any)[as] || motion.div;
  const text = typeof children === "string" ? children : null;

  if (isScrollReveal) {
    if (text === null) {
      return (
        <Tag
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-30px" }}
          transition={{ duration, ease: "easeOut" }}
          className={className}
        >
          {children}
        </Tag>
      );
    }

    const words = text.split(" ");
    return (
      <Tag
        className={className}
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-30px" }}
      >
        {words.map((word, i) => (
          <motion.span
            key={i}
            variants={wordVariants}
            transition={{ duration: 0.04, ease: "easeOut" }}
          >
            {word}{" "}
          </motion.span>
        ))}
      </Tag>
    );
  }

  if (text === null) {
    if (sequencer) sequencer.register(duration);
    return (
      <Tag
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -6 }}
        transition={{ duration, delay, ease: "easeOut" }}
        className={className}
      >
        {children}
      </Tag>
    );
  }

  const words = text.split(" ");
  const computedDelay = sequencer
    ? sequencer.register(duration)
    : delay;

  return (
    <Tag className={className}>
      {words.map((word, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{
            duration: 0.04,
            delay: computedDelay + i * (duration / Math.max(words.length, 1)),
            ease: "easeOut",
          }}
        >
          {word}{" "}
        </motion.span>
      ))}
    </Tag>
  );
}
