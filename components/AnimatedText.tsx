"use client";
import React from "react";
import { motion } from "framer-motion";
import { useSequencer } from "./Sequencer";

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
  const Tag: any = (motion as any)[as] || motion.div;
  const text = typeof children === "string" ? children : null;

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
