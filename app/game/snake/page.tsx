"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";

const SIZE = 20;
const TILE = 20;
const SPEED = 120;

type Dir = "UP" | "DOWN" | "LEFT" | "RIGHT";
type Pos = { x: number; y: number };

export default function Snake() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [score, setScore] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [gameOver, setGameOver] = useState(false);

  const stateRef = useRef({
    snake: [{ x: 10, y: 10 }],
    food: { x: 15, y: 15 },
    dir: "RIGHT" as Dir,
    nextDir: "RIGHT" as Dir,
    growing: false,
    score: 0,
  });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const s = stateRef.current;

    const placeFood = () => {
      let f: Pos;
      do {
        f = { x: Math.floor(Math.random() * SIZE), y: Math.floor(Math.random() * SIZE) };
      } while (s.snake.some((p) => p.x === f.x && p.y === f.y));
      s.food = f;
    };

    const step = () => {
      s.dir = s.nextDir;
      const head = s.snake[0];
      const next: Pos = { x: head.x, y: head.y };
      switch (s.dir) {
        case "UP": next.y--; break;
        case "DOWN": next.y++; break;
        case "LEFT": next.x--; break;
        case "RIGHT": next.x++; break;
      }

      if (next.x < 0 || next.x >= SIZE || next.y < 0 || next.y >= SIZE) {
        setGameOver(true);
        setPlaying(false);
        return;
      }
      if (s.snake.some((p) => p.x === next.x && p.y === next.y)) {
        setGameOver(true);
        setPlaying(false);
        return;
      }

      s.snake.unshift(next);
      if (next.x === s.food.x && next.y === s.food.y) {
        s.score++;
        setScore(s.score);
        placeFood();
      } else {
        s.snake.pop();
      }

      draw();
    };

    const draw = () => {
      if (!ctx || !canvas) return;
      ctx.fillStyle = "#0f0f1a";
      ctx.fillRect(0, 0, SIZE * TILE, SIZE * TILE);

      ctx.fillStyle = "#60A5FA";
      s.snake.forEach((p) => ctx.fillRect(p.x * TILE, p.y * TILE, TILE - 1, TILE - 1));

      ctx.fillStyle = "#ef4444";
      ctx.fillRect(s.food.x * TILE, s.food.y * TILE, TILE - 1, TILE - 1);
    };

    draw();

    const handleKey = (e: KeyboardEvent) => {
      const nd = s.dir;
      switch (e.key) {
        case "ArrowUp": if (nd !== "DOWN") s.nextDir = "UP"; break;
        case "ArrowDown": if (nd !== "UP") s.nextDir = "DOWN"; break;
        case "ArrowLeft": if (nd !== "RIGHT") s.nextDir = "LEFT"; break;
        case "ArrowRight": if (nd !== "LEFT") s.nextDir = "RIGHT"; break;
      }
    };

    let interval: NodeJS.Timeout;
    if (playing) {
      placeFood();
      interval = setInterval(step, SPEED);
      window.addEventListener("keydown", handleKey);
    }

    return () => {
      clearInterval(interval);
      window.removeEventListener("keydown", handleKey);
    };
  }, [playing]);

  const start = () => {
    stateRef.current = {
      snake: [{ x: 10, y: 10 }],
      food: { x: 15, y: 15 },
      dir: "RIGHT",
      nextDir: "RIGHT",
      growing: false,
      score: 0,
    };
    setScore(0);
    setGameOver(false);
    setPlaying(true);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] pb-20 md:pb-0 px-4">
      <h1 className="text-2xl font-bold text-white mb-2">Snake</h1>
      <div className="text-sm text-gray-400 mb-2">Score: {score}</div>
      {gameOver && <div className="text-red-400 font-semibold mb-2">Game Over</div>}
      <canvas
        ref={canvasRef}
        width={SIZE * TILE}
        height={SIZE * TILE}
        className="rounded-lg border border-gray-700"
      />
      {!playing ? (
        <button
          onClick={start}
          className="mt-6 px-4 py-2 bg-[#60A5FA] text-black rounded font-semibold text-sm hover:bg-[#3b82f6] transition-colors"
        >
          {gameOver ? "Play Again" : "Start Game"}
        </button>
      ) : (
        <div className="mt-4 text-xs text-gray-500">Arrow keys to move</div>
      )}
      <Link
        href="/game"
        className="mt-4 text-xs text-gray-400 hover:text-white transition-colors"
      >
        ← Back to games
      </Link>
    </div>
  );
}
