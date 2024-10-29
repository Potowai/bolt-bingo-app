import React, { useState } from 'react';
import { Shuffle } from 'lucide-react';

interface WordPickerProps {
  wordList: string[];
}

export const WordPicker: React.FC<WordPickerProps> = ({ wordList }) => {
  const [currentWord, setCurrentWord] = useState<string>('');

  const pickRandomWord = () => {
    const randomIndex = Math.floor(Math.random() * wordList.length);
    setCurrentWord(wordList[randomIndex]);
  };

  return (
    <div className="bg-gray-900/80 backdrop-blur-sm rounded-xl shadow-lg shadow-orange-500/20 p-6 text-center border border-orange-500/20">
      <h2 className="text-2xl font-bold mb-4 text-orange-400">Word Picker</h2>
      <div className="mb-4">
        {currentWord ? (
          <p className="text-4xl font-bold text-orange-500 font-serif">{currentWord}</p>
        ) : (
          <p className="text-orange-300/70">Click the button to pick a word</p>
        )}
      </div>
      <button
        onClick={pickRandomWord}
        className="bg-orange-600 text-white px-6 py-3 rounded-lg font-medium flex items-center justify-center gap-2 hover:bg-orange-700 transition-colors mx-auto"
      >
        <Shuffle className="w-5 h-5" />
        Pick Random Word
      </button>
    </div>
  );
};