"use client";
import { useState, useEffect } from "react";
import Link from "next/link";

const EMOJIS = ["🐶", "🐱", "🐸", "🦊", "🐻", "🐼", "🐨", "🦁"];

function shuffle<T>(a: T[]): T[] {
  const b = [...a];
  for (let i = b.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [b[i], b[j]] = [b[j], b[i]];
  }
  return b;
}

export default function Memory() {
  const [cards, setCards] = useState(() =>
    shuffle([...EMOJIS, ...EMOJIS]).map((emoji, i) => ({ id: i, emoji, flipped: false, matched: false }))
  );
  const [flipped, setFlipped] = useState<number[]>([]);
  const [locked, setLocked] = useState(false);
  const [moves, setMoves] = useState(0);

  useEffect(() => {
    if (flipped.length !== 2) return;
    setLocked(true);
    const [a, b] = flipped;
    if (cards[a].emoji === cards[b].emoji) {
      setCards((prev) => prev.map((c) => (c.id === a || c.id === b ? { ...c, matched: true } : c)));
      setFlipped([]);
      setLocked(false);
    } else {
      const t = setTimeout(() => {
        setCards((prev) => prev.map((c) => (c.id === a || c.id === b ? { ...c, flipped: false } : c)));
        setFlipped([]);
        setLocked(false);
      }, 800);
      return () => clearTimeout(t);
    }
  }, [flipped, cards]);

  const handleFlip = (id: number) => {
    if (locked || flipped.includes(id) || cards[id].flipped || cards[id].matched) return;
    setCards((prev) => prev.map((c) => (c.id === id ? { ...c, flipped: true } : c)));
    setFlipped((prev) => [...prev, id]);
    setMoves((m) => m + 1);
  };

  const reset = () => {
    setCards(shuffle([...EMOJIS, ...EMOJIS]).map((emoji, i) => ({ id: i, emoji, flipped: false, matched: false })));
    setFlipped([]);
    setLocked(false);
    setMoves(0);
  };

  const done = cards.every((c) => c.matched);

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] pb-20 md:pb-0 px-4">
      <h1 className="text-2xl font-bold text-white mb-2">Memory</h1>
      <div className="text-sm text-gray-400 mb-4">Moves: {moves}</div>
      {done && <div className="text-green-400 font-semibold mb-4">You matched them all!</div>}
      <div className="grid grid-cols-4 gap-2">
        {cards.map((card) => (
          <button
            key={card.id}
            onClick={() => handleFlip(card.id)}
            className={`w-16 h-16 md:w-20 md:h-20 text-2xl md:text-3xl rounded-lg border transition-all duration-300 ${
              card.flipped || card.matched
                ? "bg-[#1a1a2e] border-[#60A5FA] rotate-y-0"
                : "bg-[#252545] border-gray-700 hover:bg-[#2e2e5e]"
            }`}
          >
            {(card.flipped || card.matched) ? card.emoji : "?"}
          </button>
        ))}
      </div>
      <button
        onClick={reset}
        className="mt-6 px-4 py-2 bg-[#60A5FA] text-black rounded font-semibold text-sm hover:bg-[#3b82f6] transition-colors"
      >
        {done ? "Play Again" : "Reset"}
      </button>
      <Link
        href="/game"
        className="mt-4 text-xs text-gray-400 hover:text-white transition-colors"
      >
        ← Back to games
      </Link>
    </div>
  );
}
