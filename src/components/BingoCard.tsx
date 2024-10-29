import React from 'react';
import type { BingoCard } from '../utils/bingo';
import { CheckSquare, Square } from 'lucide-react';

interface BingoCardProps {
  card: BingoCard;
  onToggle: (index: number) => void;
}

export const BingoCardComponent: React.FC<BingoCardProps> = ({ card, onToggle }) => {
  return (
    <div className="bg-gray-900/80 backdrop-blur-sm rounded-xl shadow-lg shadow-orange-500/20 p-6 w-full max-w-[800px] mx-auto border border-orange-500/20">
      <div className="grid grid-cols-5 gap-3 aspect-square">
        {card.words.map((word, index) => (
          <button
            key={index}
            onClick={() => onToggle(index)}
            className={`w-full h-full p-2 rounded-lg text-base font-medium flex flex-col items-center justify-center transition-colors
              ${
                card.checked[index]
                  ? 'bg-purple-900/80 text-orange-300 hover:bg-purple-800/80'
                  : 'bg-gray-800/80 hover:bg-gray-700/80 text-orange-100'
              }`}
          >
            <span className="mb-2">
              {card.checked[index] ? (
                <CheckSquare className="w-6 h-6 text-orange-400" />
              ) : (
                <Square className="w-6 h-6 text-orange-400" />
              )}
            </span>
            <span className="text-center break-words leading-tight">{word}</span>
          </button>
        ))}
      </div>
      <div className="mt-4 text-sm text-orange-300/70 text-center">
        Card ID: {card.id}
      </div>
    </div>
  );
};