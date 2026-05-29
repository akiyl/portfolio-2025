"use client";
import { useState, useCallback, useEffect, useRef } from "react";
import Link from "next/link";

type PieceType = "K" | "Q" | "R" | "B" | "N" | "P";
type Color = "w" | "b";
type Piece = { type: PieceType; color: Color };
type Board = (Piece | null)[][];

function initBoard(): Board {
  const backRank: PieceType[] = ["R", "N", "B", "Q", "K", "B", "N", "R"];
  const board: Board = Array.from({ length: 8 }, () => Array(8).fill(null));
  for (let i = 0; i < 8; i++) {
    board[0][i] = { type: backRank[i], color: "b" };
    board[1][i] = { type: "P", color: "b" };
    board[6][i] = { type: "P", color: "w" };
    board[7][i] = { type: backRank[i], color: "w" };
  }
  return board;
}

function cloneBoard(b: Board): Board {
  return b.map((row) => row.map((c) => (c ? { ...c } : null)));
}

function inBounds(r: number, c: number) {
  return r >= 0 && r < 8 && c >= 0 && c < 8;
}

function rayMoves(
  board: Board, r: number, c: number,
  drs: number[], dcs: number[], color: Color
): [number, number][] {
  const moves: [number, number][] = [];
  for (let di = 0; di < drs.length; di++) {
    const dr = drs[di], dc = dcs[di];
    let nr = r + dr, nc = c + dc;
    while (inBounds(nr, nc)) {
      const target = board[nr][nc];
      if (!target) {
        moves.push([nr, nc]);
      } else {
        if (target.color !== color) moves.push([nr, nc]);
        break;
      }
      nr += dr;
      nc += dc;
    }
  }
  return moves;
}

function getMoves(board: Board, r: number, c: number): [number, number][] {
  const piece = board[r][c];
  if (!piece) return [];
  const { type, color } = piece;

  switch (type) {
    case "P": {
      const dir = color === "w" ? -1 : 1;
      const startRow = color === "w" ? 6 : 1;
      const moves: [number, number][] = [];
      const nr = r + dir;
      if (inBounds(nr, c) && !board[nr][c]) {
        moves.push([nr, c]);
        if (r === startRow && !board[r + 2 * dir][c]) moves.push([r + 2 * dir, c]);
      }
      for (const dc of [-1, 1]) {
        const nc = c + dc;
        if (inBounds(nr, nc) && board[nr][nc] && board[nr][nc]!.color !== color) {
          moves.push([nr, nc]);
        }
      }
      return moves;
    }
    case "N": {
      const knightDeltas = [[-2,-1],[-2,1],[-1,-2],[-1,2],[1,-2],[1,2],[2,-1],[2,1]];
      return knightDeltas
        .map(([dr, dc]) => [r + dr, c + dc] as [number, number])
        .filter(([nr, nc]) => inBounds(nr, nc) && (!board[nr][nc] || board[nr][nc]!.color !== color));
    }
    case "B": return rayMoves(board, r, c, [-1,-1,-1,1,1,-1,1,1], [-1,1,-1,1,-1,1,-1,1], color);
    case "R": return rayMoves(board, r, c, [-1,1,0,0], [0,0,-1,1], color);
    case "Q": return rayMoves(board, r, c, [-1,-1,-1,1,1,-1,1,1,-1,1,0,0], [-1,1,-1,1,-1,1,-1,1,0,0,-1,1], color);
    case "K": {
      const kingDeltas = [[-1,-1],[-1,0],[-1,1],[0,-1],[0,1],[1,-1],[1,0],[1,1]];
      return kingDeltas
        .map(([dr, dc]) => [r + dr, c + dc] as [number, number])
        .filter(([nr, nc]) => inBounds(nr, nc) && (!board[nr][nc] || board[nr][nc]!.color !== color));
    }
    default: return [];
  }
}

function getAllMoves(board: Board, color: Color): [number, number, number, number][] {
  const all: [number, number, number, number][] = [];
  for (let r = 0; r < 8; r++) {
    for (let c = 0; c < 8; c++) {
      const p = board[r][c];
      if (p && p.color === color) {
        for (const [nr, nc] of getMoves(board, r, c)) {
          all.push([r, c, nr, nc]);
        }
      }
    }
  }
  return all;
}

function applyMove(board: Board, r: number, c: number, nr: number, nc: number): Board {
  const b = cloneBoard(board);
  b[nr][nc] = b[r][c];
  b[r][c] = null;
  if (b[nr][nc]?.type === "P" && (nr === 0 || nr === 7)) {
    b[nr][nc] = { type: "Q", color: b[nr][nc]!.color };
  }
  return b;
}

const PIECE_VALUES: Record<PieceType, number> = {
  P: 100, N: 320, B: 330, R: 500, Q: 900, K: 20000,
};

function evaluate(board: Board): number {
  let score = 0;
  for (let r = 0; r < 8; r++) {
    for (let c = 0; c < 8; c++) {
      const p = board[r][c];
      if (p) {
        const val = PIECE_VALUES[p.type];
        score += p.color === "w" ? val : -val;
      }
    }
  }
  return score;
}

function minimax(board: Board, depth: number, alpha: number, beta: number, isMax: boolean): number {
  if (depth === 0) return evaluate(board);
  const color = isMax ? "w" : "b";
  const moves = getAllMoves(board, color);
  if (moves.length === 0) return isMax ? -99999 : 99999;

  if (isMax) {
    let maxEval = -Infinity;
    for (const [r, c, nr, nc] of moves) {
      const b = applyMove(board, r, c, nr, nc);
      const e = minimax(b, depth - 1, alpha, beta, false);
      maxEval = Math.max(maxEval, e);
      alpha = Math.max(alpha, e);
      if (beta <= alpha) break;
    }
    return maxEval;
  } else {
    let minEval = Infinity;
    for (const [r, c, nr, nc] of moves) {
      const b = applyMove(board, r, c, nr, nc);
      const e = minimax(b, depth - 1, alpha, beta, true);
      minEval = Math.min(minEval, e);
      beta = Math.min(beta, e);
      if (beta <= alpha) break;
    }
    return minEval;
  }
}

function bestAiMove(board: Board): [number, number, number, number] | null {
  const moves = getAllMoves(board, "b");
  if (moves.length === 0) return null;
  let bestScore = -Infinity;
  let best: [number, number, number, number] = moves[0];
  for (const [r, c, nr, nc] of moves) {
    const b = applyMove(board, r, c, nr, nc);
    const score = minimax(b, 2, -Infinity, Infinity, true);
    if (score > bestScore) {
      bestScore = score;
      best = [r, c, nr, nc];
    }
  }
  return best;
}

const PIECE_SYMBOLS: Record<string, string> = {
  wK: "♔", wQ: "♕", wR: "♖", wB: "♗", wN: "♘", wP: "♙",
  bK: "♚", bQ: "♛", bR: "♜", bB: "♝", bN: "♞", bP: "♟",
};

export default function Chess() {
  const [board, setBoard] = useState<Board>(initBoard);
  const [turn, setTurn] = useState<Color>("w");
  const [selected, setSelected] = useState<[number, number] | null>(null);
  const [moves, setMoves] = useState<[number, number][]>([]);
  const [winner, setWinner] = useState<Color | null>(null);
  const [message, setMessage] = useState("");
  const [mode, setMode] = useState<"human" | "ai">("human");
  const aiThinking = useRef(false);

  const doMove = useCallback((b: Board, r: number, c: number, nr: number, nc: number, t: Color): Board => {
    const newBoard = b.map((row) => [...row]);
    newBoard[nr][nc] = newBoard[r][c];
    newBoard[r][c] = null;
    if (newBoard[nr][nc]?.type === "P" && (nr === 0 || nr === 7)) {
      newBoard[nr][nc] = { type: "Q", color: t };
    }
    const oppColor = t === "w" ? "b" : "w";
    const kingAlive = newBoard.some((row) =>
      row.some((p) => p?.type === "K" && p.color === oppColor)
    );
    if (!kingAlive) {
      setWinner(t);
      setMessage(`${t === "w" ? "White" : "Black"} wins!`);
    }
    return newBoard;
  }, []);

  const handleClick = useCallback(
    (r: number, c: number) => {
      if (winner || aiThinking.current) return;
      if (mode === "ai" && turn === "b") return;
      const piece = board[r][c];

      if (selected) {
        if (moves.some(([mr, mc]) => mr === r && mc === c)) {
          const newBoard = doMove(board, selected[0], selected[1], r, c, turn);
          setBoard(newBoard);
          const nextTurn = turn === "w" ? "b" : "w";
          setTurn(nextTurn);
          setSelected(null);
          setMoves([]);
          return;
        }
        if (piece && piece.color === turn) {
          setSelected([r, c]);
          setMoves(getMoves(board, r, c));
          return;
        }
        setSelected(null);
        setMoves([]);
        return;
      }

      if (piece && piece.color === turn) {
        setSelected([r, c]);
        setMoves(getMoves(board, r, c));
      }
    },
    [board, turn, selected, moves, winner, mode, doMove]
  );

  useEffect(() => {
    if (mode !== "ai" || winner || turn !== "b" || aiThinking.current) return;
    aiThinking.current = true;
    const t = setTimeout(() => {
      const move = bestAiMove(board);
      if (move) {
        const [r, c, nr, nc] = move;
        const newBoard = doMove(board, r, c, nr, nc, "b");
        setBoard(newBoard);
        setTurn("w");
      }
      aiThinking.current = false;
    }, 200);
    return () => {
      clearTimeout(t);
      aiThinking.current = false;
    };
  }, [mode, turn, winner, board, doMove]);

  const reset = () => {
    setBoard(initBoard());
    setTurn("w");
    setSelected(null);
    setMoves([]);
    setWinner(null);
    setMessage("");
    aiThinking.current = false;
  };

  const switchMode = (m: "human" | "ai") => {
    setMode(m);
    setBoard(initBoard());
    setTurn("w");
    setSelected(null);
    setMoves([]);
    setWinner(null);
    setMessage("");
    aiThinking.current = false;
  };

  const isDark = (r: number, c: number) => (r + c) % 2 === 1;

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] pb-20 md:pb-0 px-4">
      <h1 className="text-2xl font-bold text-white mb-2">Chess</h1>
      <div className="flex gap-2 mb-2">
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
      <div className="text-sm text-gray-400 mb-1">
        {winner
          ? message
          : mode === "ai" && turn === "b"
            ? "Computer thinking..."
            : `${turn === "w" ? "White" : "Black"}'s turn`}
      </div>
      {message && <div className="text-green-400 font-semibold mb-2">{message}</div>}
      <div className="grid grid-cols-8 border border-gray-700 rounded overflow-hidden">
        {board.map((row, r) =>
          row.map((piece, c) => {
            const highlight = moves.some(([mr, mc]) => mr === r && mc === c);
            const isSel = selected?.[0] === r && selected?.[1] === c;
            return (
              <button
                key={`${r}-${c}`}
                onClick={() => handleClick(r, c)}
                className={`w-10 h-10 md:w-12 md:h-12 flex items-center justify-center text-lg md:text-xl transition-colors ${
                  isDark(r, c) ? "bg-[#1a1a2e]" : "bg-[#2a2a4a]"
                } ${
                  highlight ? "ring-2 ring-green-400 ring-inset" : ""
                } ${isSel ? "ring-2 ring-yellow-400 ring-inset" : ""} ${
                  piece ? "cursor-pointer" : highlight ? "cursor-pointer" : ""
                }`}
              >
                {piece && (
                  <span className={piece.color === "w" ? "text-white" : "text-gray-500"}>
                    {PIECE_SYMBOLS[`${piece.color}${piece.type}`]}
                  </span>
                )}
              </button>
            );
          })
        )}
      </div>
      <button
        onClick={reset}
        className="mt-6 px-4 py-2 bg-[#60A5FA] text-black rounded font-semibold text-sm hover:bg-[#3b82f6] transition-colors"
      >
        New Game
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
