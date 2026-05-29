"use client";
import Link from "next/link";
import AnimatedText from "@/components/AnimatedText";
import Sequencer from "@/components/Sequencer";

const games = [
  {
    name: "Tic-Tac-Toe",
    desc: "Classic 3-in-a-row",
    href: "/game/tic-tac-toe",
    icon: "❌",
  },
  {
    name: "Chess",
    desc: "Strategic board battle",
    href: "/game/chess",
    icon: "♟",
  },
  {
    name: "Snake",
    desc: "Eat & grow",
    href: "/game/snake",
    icon: "🐍",
  },
  {
    name: "Memory",
    desc: "Match the pairs",
    href: "/game/memory",
    icon: "🃏",
  },
];

export default function GameHub() {
  return (
    <div className="flex flex-col items-center justify-center w-full md:w-[50vw] min-h-[60vh] px-4 pb-20 md:pb-0">
      <Sequencer>
        <AnimatedText
          as="h1"
          className="text-2xl md:text-4xl font-bold mb-2 text-white"
          delay={0.04}
        >
          <span>Game Room</span>
        </AnimatedText>
        <AnimatedText
          as="p"
          className="text-sm md:text-base text-gray-400 mb-8"
          delay={0.08}
        >
          <span>Pick a game to play</span>
        </AnimatedText>
        <div className="grid grid-cols-2 gap-4 w-full max-w-md">
          {games.map((game, i) => (
            <AnimatedText
              as="div"
              key={game.name}
              className="w-full"
              delay={0.12 + i * 0.06}
            >
              <Link
                href={game.href}
                className="flex flex-col items-center justify-center gap-2 p-4 md:p-6 rounded-xl border border-gray-700 bg-[#1a1a2e] hover:bg-[#252545] hover:border-[#60A5FA] transition-all duration-300 text-center"
              >
                <span className="text-2xl md:text-3xl">{game.icon}</span>
                <span className="text-white font-semibold text-sm md:text-base">
                  {game.name}
                </span>
                <span className="text-gray-400 text-xs">{game.desc}</span>
              </Link>
            </AnimatedText>
          ))}
        </div>
      </Sequencer>
    </div>
  );
}
