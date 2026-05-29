"use client";
import React, { createContext, useContext, useRef, useCallback } from "react";

type SequencerContext = {
  register: (duration: number) => number;
};

const SequencerContext = createContext<SequencerContext | null>(null);

export function useSequencer() {
  return useContext(SequencerContext);
}

type Props = {
  children: React.ReactNode;
  gap?: number;
};

export default function Sequencer({ children, gap = 0.1 }: Props) {
  const nextTimeRef = useRef(0);

  const register = useCallback(
    (duration: number) => {
      const delay = nextTimeRef.current;
      nextTimeRef.current += duration + gap;
      return delay;
    },
    [gap]
  );

  return (
    <SequencerContext.Provider value={{ register }}>
      {children}
    </SequencerContext.Provider>
  );
}
