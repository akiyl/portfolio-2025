"use client";
import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname, useRouter } from "next/navigation";

interface SwipeNavigatorProps {
  routes: string[];
  threshold?: number;
  enabled?: boolean;
}

const normalize = (p: string) => {
  if (p === "" || p === "/") return "/";
  const base = (p || "").split("?")[0];
  return base.endsWith("/") ? base.slice(0, -1) : base;
};

export default function SwipeNavigatorAnimated({
  routes,
  threshold = 60,
  enabled = true,
}: SwipeNavigatorProps) {
  const pathname = usePathname();
  const router = useRouter();
  const startX = useRef<number | null>(null);
  const startY = useRef<number | null>(null);
  const locked = useRef(false);
  const [showHint, setShowHint] = useState<boolean>(() => {
    try {
      // allow forced display via URL param for debugging: ?showSwipeHint=1
      if (typeof window !== "undefined") {
        const params = new URLSearchParams(window.location.search);
        if (params.get("showSwipeHint") === "1") return true;
      }

      const seen = localStorage.getItem("swipeHintShown");
      return !seen;
    } catch (err) {
      return true;
    }
  });

  const [isMobile, setIsMobile] = useState<boolean>(() => {
    try {
      const isTouchCapable =
        "ontouchstart" in window ||
        navigator.maxTouchPoints > 0 ||
        window.matchMedia("(pointer: coarse)").matches;
      const isSmallScreen = window.innerWidth <= 768;
      return !!(isTouchCapable && isSmallScreen);
    } catch (err) {
      return false;
    }
  });

  const [isAnimating, setIsAnimating] = useState(false);
  const [animDir, setAnimDir] = useState<"left" | "right" | null>(null);

  useEffect(() => {
    // Accept coarse pointer or touch capable devices OR small screens (mobile)
    const isTouchCapable =
      typeof window !== "undefined" &&
      ("ontouchstart" in window ||
        navigator.maxTouchPoints > 0 ||
        window.matchMedia("(pointer: coarse)").matches);
    const isSmallScreen =
      typeof window !== "undefined" && window.innerWidth <= 768;
    if (!enabled || !isTouchCapable || !isSmallScreen) return;

    setIsMobile(true);
    try {
      const seen = localStorage.getItem("swipeHintShown");
      if (!seen) setShowHint(true);
    } catch (err) {
      // ignore
    }

    const el = document.documentElement;
    // Fallback: prefer body if documentElement doesn't dispatch pointer events

    // handle raw touchstart
    const onTouchStart = (e: TouchEvent) => {
      if (!e.touches || e.touches.length === 0) return;
      startX.current = e.touches[0].clientX;
      startY.current = e.touches[0].clientY;
      // debug removed for production
    };

    // handle pointer events for browsers that implement pointer events (some
    // Android / desktop browsers don't emit TouchEvent but have pointer events)
    const onPointerDown = (e: PointerEvent) => {
      if (e.pointerType !== "touch") return;
      startX.current = e.clientX;
      startY.current = e.clientY;
    };

    // handle raw touch end & pointer up
    const onTouchEnd = (e: TouchEvent) => {
      if (locked.current) return;
      if (startX.current === null || startY.current === null) return;

      const touch = e.changedTouches && e.changedTouches[0];
      if (!touch) return;
      const dx = touch.clientX - startX.current;
      const dy = touch.clientY - startY.current;

      // debug removed for production

      if (Math.abs(dx) > threshold && Math.abs(dx) > Math.abs(dy) * 1.5) {
        const current = normalize(pathname || "/");
        const idx = routes.findIndex((r) => normalize(r) === current);
        if (idx === -1) return;

        if (dx < 0) {
          const next = routes[idx + 1];
          if (next) {
            locked.current = true;
            setIsAnimating(true);
            setAnimDir("left");
            setTimeout(() => {
              router.push(next);
              setTimeout(() => {
                locked.current = false;
                setIsAnimating(false);
                setAnimDir(null);
              }, 600);
            }, 240);
          }
        }

        if (dx > 0) {
          const prev = routes[idx - 1];
          if (prev) {
            locked.current = true;
            setIsAnimating(true);
            setAnimDir("right");
            setTimeout(() => {
              router.push(prev);
              setTimeout(() => {
                locked.current = false;
                setIsAnimating(false);
                setAnimDir(null);
              }, 600);
            }, 240);
          }
        }
      }

      startX.current = null;
      startY.current = null;
    };

    const onPointerUp = (e: PointerEvent) => {
      if (e.pointerType !== "touch") return;
      if (locked.current) return;
      if (startX.current === null || startY.current === null) return;
      const dx = e.clientX - startX.current;
      const dy = e.clientY - startY.current;

      // debug removed for production
      if (Math.abs(dx) > threshold && Math.abs(dx) > Math.abs(dy) * 1.5) {
        const current = normalize(pathname || "/");
        const idx = routes.findIndex((r) => normalize(r) === current);
        if (idx === -1) return;

        if (dx < 0) {
          const next = routes[idx + 1];
          if (next) {
            locked.current = true;
            setIsAnimating(true);
            setAnimDir("left");
            setTimeout(() => {
              router.push(next);
              setTimeout(() => {
                locked.current = false;
                setIsAnimating(false);
                setAnimDir(null);
              }, 600);
            }, 240);
          }
        }

        if (dx > 0) {
          const prev = routes[idx - 1];
          if (prev) {
            locked.current = true;
            setIsAnimating(true);
            setAnimDir("right");
            setTimeout(() => {
              router.push(prev);
              setTimeout(() => {
                locked.current = false;
                setIsAnimating(false);
                setAnimDir(null);
              }, 600);
            }, 240);
          }
        }
      }

      startX.current = null;
      startY.current = null;
    };

    el.addEventListener("touchstart", onTouchStart, { passive: true });
    el.addEventListener("touchend", onTouchEnd, { passive: true });
    // attach pointer event fallbacks
    el.addEventListener("pointerdown", onPointerDown, { passive: true });
    el.addEventListener("pointerup", onPointerUp, { passive: true });

    return () => {
      el.removeEventListener("touchstart", onTouchStart);
      el.removeEventListener("touchend", onTouchEnd);
      el.removeEventListener("pointerdown", onPointerDown);
      el.removeEventListener("pointerup", onPointerUp);
    };
  }, [pathname, routes, router, threshold]);

  const dismissHint = () => {
    try {
      localStorage.setItem("swipeHintShown", "1");
    } catch (err) {
      // ignore
    }
    setShowHint(false);
  };

  return (
    <>
      {/* Small persistent pill (mobile only) that stays until the user clicks "Got it" */}
      {showHint && isMobile && (
        <div className="fixed left-1/2 bottom-6 -translate-x-1/2 z-50 md:hidden">
          <div className="flex items-center gap-3 bg-slate-900/90 text-white text-sm px-3 py-2 rounded-full shadow-lg">
            <div className="text-sm">Swipe to navigate</div>
            <button
              onClick={dismissHint}
              className="ml-2 bg-white/6 hover:bg-white/10 rounded px-2 py-1 text-xs"
            >
              Got it
            </button>
          </div>
        </div>
      )}
      <AnimatePresence>
        {showHint && isMobile && (
          <motion.div
            key="swipe-hint"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 14 }}
            transition={{ duration: 0.36 }}
            className="fixed left-1/2 bottom-20 -translate-x-1/2 z-50 pointer-events-auto md:hidden"
          >
            <div className="flex items-center gap-3 bg-gradient-to-r from-slate-900 via-slate-800 to-black/80 text-white text-sm px-5 py-3 rounded-full shadow-xl">
              <div className="flex items-center gap-3">
                <div className="px-2 py-1 bg-white/6 rounded">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-4 h-4 text-white opacity-90"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M7 7l10 10M17 7l-10 10"
                    />
                  </svg>
                </div>
                <motion.div
                  initial={{ opacity: 0, x: 8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.36 }}
                  className="leading-tight"
                >
                  <div className="text-xs opacity-80">Tip</div>
                  <div className="text-sm font-medium">
                    Swipe to move between pages
                  </div>
                </motion.div>
              </div>
              <button
                onClick={dismissHint}
                className="ml-4 bg-white/8 hover:bg-white/14 rounded px-3 py-1 text-xs"
              >
                Got it
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isAnimating && animDir && (
          <motion.div
            key="swipe-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.22 }}
            className="fixed inset-0 z-[60] pointer-events-none flex items-center justify-center md:hidden"
          >
            <motion.div
              initial={{ x: animDir === "left" ? 80 : -80, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: animDir === "left" ? -80 : 80, opacity: 0 }}
              transition={{ duration: 0.22 }}
              className="bg-black/70 text-white rounded-md px-7 py-4 text-sm backdrop-blur-sm"
            >
              <div className="flex items-center gap-2">
                <div className="text-lg font-semibold">
                  {animDir === "left" ? "Next" : "Previous"}
                </div>
                <div className="opacity-80 text-xs">Swipe</div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
