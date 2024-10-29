import React, { useState } from 'react';
import { Search, Loader2 } from 'lucide-react';
import { recoverCard, type BingoCard } from '../utils/bingo';

interface CardRecoveryProps {
  wordList: string[];
  onCardRecovered: (card: BingoCard) => void;
}

export const CardRecovery: React.FC<CardRecoveryProps> = ({ wordList, onCardRecovered }) => {
  const [cardId, setCardId] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [error, setError] = useState('');

  const handleRecover = async () => {
    if (!cardId.trim()) {
      setError('Please enter a card ID');
      return;
    }

    setIsSearching(true);
    setError('');

    try {
      const card = await recoverCard(cardId, wordList);
      if (card) {
        onCardRecovered(card);
        setCardId('');
      } else {
        setError('Card not found');
      }
    } catch (err) {
      setError('Failed to recover card');
    } finally {
      setIsSearching(false);
    }
  };

  return (
    <div className="bg-gray-900/80 backdrop-blur-sm rounded-xl shadow-lg shadow-orange-500/20 p-6 border border-orange-500/20">
      <h2 className="text-xl font-semibold mb-4 text-orange-400">Recover Card</h2>
      <div className="flex gap-4">
        <input
          type="text"
          value={cardId}
          onChange={(e) => setCardId(e.target.value)}
          placeholder="Enter card ID"
          className="flex-1 p-2 rounded-lg bg-gray-800 border-orange-500/30 text-orange-100 placeholder-orange-300/50 focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
        />
        <button
          onClick={handleRecover}
          disabled={isSearching || !cardId.trim()}
          className="bg-orange-600 text-white px-4 py-2 rounded-lg font-medium flex items-center gap-2 hover:bg-orange-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSearching ? (
            <Loader2 className="w-5 h-5 animate-spin" />
          ) : (
            <Search className="w-5 h-5" />
          )}
          Recover Card
        </button>
      </div>
      {error && <p className="text-red-500 mt-2 text-sm">{error}</p>}
    </div>
  );
};