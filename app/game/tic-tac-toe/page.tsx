"use client";
import { useState, useEffect, useCallback } from "react";
import Link from "next/link";

type Player = "X" | "O";
type Board = (Player | null)[];

const WIN_LINES = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8],
  [0, 3, 6], [1, 4, 7], [2, 5, 8],
  [0, 4, 8], [2, 4, 6],
];

function calcWinner(board: Board): Player | "draw" | null {
  for (const [a, b, c] of WIN_LINES) {
    if (board[a] && board[a] === board[b] && board[a] === board[c]) return board[a];
  }
  if (board.every((c) => c !== null)) return "draw";
  return null;
}

function minimax(board: Board, depth: number, isMax: boolean, ai: Player, human: Player): number {
  const w = calcWinner(board);
  if (w === ai) return 10 - depth;
  if (w === human) return depth - 10;
  if (w === "draw") return 0;

  if (isMax) {
    let best = -Infinity;
    for (let i = 0; i < 9; i++) {
      if (!board[i]) {
        board[i] = ai;
        best = Math.max(best, minimax(board, depth + 1, false, ai, human));
        board[i] = null;
      }
    }
    return best;
  } else {
    let best = Infinity;
    for (let i = 0; i < 9; i++) {
      if (!board[i]) {
        board[i] = human;
        best = Math.min(best, minimax(board, depth + 1, true, ai, human));
        board[i] = null;
      }
    }
    return best;
  }
}

function bestMove(board: Board, ai: Player, human: Player): number {
  let best = -Infinity;
  let move = -1;
  for (let i = 0; i < 9; i++) {
    if (!board[i]) {
      board[i] = ai;
      const score = minimax(board, 0, false, ai, human);
      board[i] = null;
      if (score > best) {
        best = score;
        move = i;
      }
    }
  }
  return move;
}

export default function TicTacToe() {
  const [board, setBoard] = useState<Board>(Array(9).fill(null));
  const [isX, setIsX] = useState(true);
  const [mode, setMode] = useState<"human" | "ai">("human");
  const [aiPlayer, setAiPlayer] = useState<Player>("O");
  const winner = calcWinner(board);

  const makeAiMove = useCallback((b: Board, ai: Player, human: Player) => {
    const move = bestMove([...b], ai, human);
    if (move === -1) return;
    const next = [...b];
    next[move] = ai;
    setBoard(next);
    setIsX(ai === "X" ? false : true);
  }, []);

  useEffect(() => {
    if (mode === "ai" && !winner && !isX && aiPlayer === "O") {
      const t = setTimeout(() => makeAiMove(board, "O", "X"), 300);
      return () => clearTimeout(t);
    }
    if (mode === "ai" && !winner && isX && aiPlayer === "X") {
      const t = setTimeout(() => makeAiMove(board, "X", "O"), 300);
      return () => clearTimeout(t);
    }
  }, [mode, winner, isX, aiPlayer, board, makeAiMove]);

  const handleClick = (i: number) => {
    if (board[i] || winner) return;
    if (mode === "ai") {
      const currentPlayer = isX ? "X" : "O";
      if (currentPlayer === aiPlayer) return;
    }
    const next = [...board];
    next[i] = isX ? "X" : "O";
    setBoard(next);
    setIsX(!isX);
  };

  const reset = () => {
    setBoard(Array(9).fill(null));
    setIsX(true);
  };

  const switchMode = (m: "human" | "ai") => {
    setMode(m);
    setBoard(Array(9).fill(null));
    setIsX(true);
  };

  const status = winner
    ? winner === "draw"
      ? "It's a draw!"
      : `${winner} wins!`
    : mode === "ai"
      ? isX === (aiPlayer !== "X")
        ? "Computer thinking..."
        : "Your turn"
      : `Next: ${isX ? "X" : "O"}`;

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] pb-20 md:pb-0 px-4">
      <h1 className="text-2xl font-bold text-white mb-4">Tic-Tac-Toe</h1>
      <div className="flex gap-2 mb-4">
        <button
          onClick={() => switchMode("human")}
          className={`px-3 py-1 text-xs rounded transition-colors ${
            mode === "human" ? "bg-[#60A5FA] text-black" : "bg-[#1a1a2e] text-gray-400 border border-gray-700"
          }`}
        >
          2-Player
        </button>
        <button
          onClick={() => switchMode("ai")}
          className={`px-3 py-1 text-xs rounded transition-colors ${
            mode === "ai" ? "bg-[#60A5FA] text-black" : "bg-[#1a1a2e] text-gray-400 border border-gray-700"
          }`}
        >
          vs Computer
        </button>
      </div>
      <div className="text-sm mb-4 text-gray-300">{status}</div>
      <div className="grid grid-cols-3 gap-2 w-64 h-64">
        {board.map((cell, i) => (
          <button
            key={i}
            onClick={() => handleClick(i)}
            className="text-3xl font-bold text-white bg-[#1a1a2e] border border-gray-700 rounded hover:bg-[#252545] transition-colors"
          >
            {cell}
          </button>
        ))}
      </div>
      <button
        onClick={reset}
        className="mt-6 px-4 py-2 bg-[#60A5FA] text-black rounded font-semibold text-sm hover:bg-[#3b82f6] transition-colors"
      >
        Restart
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
