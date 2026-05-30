"use client";
import React, { createContext, useContext } from "react";

const ScrollRevealContext = createContext(false);

export function useScrollReveal() {
  return useContext(ScrollRevealContext);
}

export default function ScrollReveal({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ScrollRevealContext.Provider value={true}>
      {children}
    </ScrollRevealContext.Provider>
  );
}
