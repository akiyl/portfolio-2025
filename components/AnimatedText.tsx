"use client";
import React from "react";
import { motion } from "framer-motion";

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
  // dynamic motion element
  // @ts-ignore - dynamic access to motion components
  const Tag: any = (motion as any)[as] || motion.div;

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
