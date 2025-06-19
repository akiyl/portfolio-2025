"use client";

import { useState, useEffect } from "react";

export default function LiveTime() {
  const [currentTime, setCurrentTime] = useState<Date | null>(null);

  useEffect(() => {
    setCurrentTime(new Date());
    const intervalId = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  if (!currentTime) return null;

  return (
    <div className="text-white text-[16px] font-mono">
      {currentTime.toLocaleTimeString()}
    </div>
  );
}
