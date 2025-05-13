"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import clsx from "clsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faReact,
  faLaravel,
  faPhp,
  faJava,
  faJs,
  faNodeJs,
  faPython,
  faHtml5,
  faCss3Alt,
  faGitAlt,
  faGithub,
  faDocker,
  faLinux,
  faAws,
  faNpm,
  faYarn,
  faVuejs,
  faAngular,
  faSwift,
  faAndroid,
  faApple,
} from "@fortawesome/free-brands-svg-icons";
import {
  faDatabase as faDatabaseSolid,
  faServer,
  faCode,
  faTerminal,
  faCubes,
} from "@fortawesome/free-solid-svg-icons";

// Define icons for popular programming tools
const icons = [
  { key: "react", icon: faReact },
  { key: "laravel", icon: faLaravel },
  { key: "php", icon: faPhp },
  { key: "java", icon: faJava },
  { key: "js", icon: faJs },
  { key: "nodejs", icon: faNodeJs },
  { key: "python", icon: faPython },
  { key: "html5", icon: faHtml5 },
  { key: "css3", icon: faCss3Alt },
  { key: "git", icon: faGitAlt },
  { key: "github", icon: faGithub },
  { key: "docker", icon: faDocker },
  { key: "linux", icon: faLinux },
  { key: "aws", icon: faAws },
  { key: "npm", icon: faNpm },
  { key: "yarn", icon: faYarn },
  { key: "vuejs", icon: faVuejs },
  { key: "angular", icon: faAngular },
  { key: "swift", icon: faSwift },
  { key: "android", icon: faAndroid },
  { key: "apple", icon: faApple },
  { key: "database", icon: faDatabaseSolid },
  { key: "server", icon: faServer },
  { key: "code", icon: faCode },
  { key: "terminal", icon: faTerminal },
  { key: "cubes", icon: faCubes },
];

const getRandomUniqueIcons = (arr: { key: string; icon: any }[], count: number) => {
  const shuffled = arr
    .map((value) => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value);
  return shuffled.slice(0, count);
};

const shuffleArray = (arr: { key: string; icon: any }[]) => {
  return [...arr, ...arr]
    .map((value) => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value);
};

export default function MemoryGame() {
  const [cards, setCards] = useState<{ key: string; icon: any }[]>([]);
  const [flipped, setFlipped] = useState<number[]>([]);
  const [matched, setMatched] = useState<number[]>([]);
  const [gameWon, setGameWon] = useState(false);

  useEffect(() => {
    startNewGame();
  }, []);

  useEffect(() => {
    if (matched.length > 0 && matched.length === cards.length) {
      setGameWon(true);
    }
  }, [matched, cards.length]);

  const startNewGame = () => {
    const selectedIcons = getRandomUniqueIcons(icons, 8); // Pick 8 random unique icons
    setCards(shuffleArray(selectedIcons));
    setFlipped([]);
    setMatched([]);
    setGameWon(false);
  };

  const handleFlip = (index: number) => {
    if (
      flipped.length === 2 ||
      flipped.includes(index) ||
      matched.includes(index) ||
      gameWon
    )
      return;

    const newFlipped = [...flipped, index];
    setFlipped(newFlipped);

    if (newFlipped.length === 2) {
      const [first, second] = newFlipped;
      if (cards[first].key === cards[second].key) {
        setMatched((prev) => [...prev, first, second]);
      }

      setTimeout(() => setFlipped([]), 800);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <button
          onClick={startNewGame}
          className="px-3 py-1 bg-amber-500 hover:bg-amber-600 text-black rounded text-sm font-medium transition-colors"
        >
          New Game
        </button>
      </div>

      <AnimatePresence>
        {gameWon && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="bg-green-600 text-white p-4 rounded-lg mb-4 text-center"
          >
            <h3 className="font-bold text-lg">🎉 Congratulations! 🎉</h3>
            <p>You've matched all the pairs!</p>
            <button
              onClick={startNewGame}
              className="mt-2 px-4 py-1 bg-white text-green-600 rounded font-medium hover:bg-gray-100 transition-colors"
            >
              Play Again
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="grid grid-cols-4 gap-3">
        {cards.map((iconObj, index) => {
          const isFlipped = flipped.includes(index) || matched.includes(index);
          return (
            <div
              key={index}
              onClick={() => handleFlip(index)}
              className={clsx(
                "w-16 h-16 flex items-center justify-center rounded-lg cursor-pointer",
                "bg-zinc-800 border-2 transition-all",
                isFlipped
                  ? "border-amber-500 bg-zinc-700"
                  : "border-zinc-700 hover:border-zinc-600",
                matched.includes(index) && "border-green-500",
                "perspective-600"
              )}
              style={{ perspective: 600 }}
            >
              <motion.div
                className="relative w-full h-full"
                initial={false}
                animate={{ rotateY: isFlipped ? 180 : 0 }}
                transition={{ duration: 0.3 }}
                style={{ transformStyle: "preserve-3d" }}
              >
                {/* Front (hidden) */}
                <div
                  className="absolute inset-0 w-full h-full flex items-center justify-center rounded-md bg-zinc-900"
                  style={{ backfaceVisibility: "hidden" }}
                >
                  <span className="text-xs text-zinc-600 font-bold">?</span>
                </div>
                {/* Back (icon) */}
                <div
                  className="absolute inset-0 w-full h-full flex items-center justify-center rounded-md text-amber-500"
                  style={{ transform: "rotateY(180deg)", backfaceVisibility: "hidden" }}
                >
                  <FontAwesomeIcon icon={iconObj.icon} className="w-8 h-8" />
                </div>
              </motion.div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
