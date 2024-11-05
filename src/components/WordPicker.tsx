import React, { useState } from "react";
import { Shuffle } from "lucide-react";

interface WordPickerProps {
  wordList: string[];
}

export const WordPicker: React.FC<WordPickerProps> = ({ wordList }) => {
  const [currentWord, setCurrentWord] = useState<string>("");
  const [selectedWords, setSelectedWords] = useState<string[]>([]);
  const [finished, setFinished] = useState<boolean>(false); // Nouvel état pour indiquer la fin

  const pickRandomWord = () => {
    if (selectedWords.length === wordList.length) {
      setFinished(true); // Affiche "fin de la liste des mots" si tous les mots sont sélectionnés
      return;
    }

    let randomIndex;
    do {
      randomIndex = Math.floor(Math.random() * wordList.length);
    } while (selectedWords.includes(wordList[randomIndex]));

    setCurrentWord(wordList[randomIndex]);
    setSelectedWords((prevWords) => [...prevWords, wordList[randomIndex]]);
  };

  return (
    <div className="bg-gray-900/80 backdrop-blur-sm rounded-xl shadow-lg shadow-orange-500/20 p-6 text-center border border-orange-500/20 mb-8">
      <h2 className="text-2xl font-bold mb-4 text-orange-400">Word Picker</h2>
      <div className="mb-4">
        {finished ? (
          <p className="text-4xl font-bold text-orange-600 font-serif">
            Fin de la liste des mots
          </p>
        ) : currentWord ? (
          <p className="text-4xl font-bold text-orange-500 font-serif">
            {currentWord}
          </p>
        ) : (
          <p className="text-orange-300/70">
            Cliquez sur le bouton pour choisir un mot
          </p>
        )}
      </div>
      {!finished && ( // Cache le bouton si la sélection est terminée
        <button
          onClick={pickRandomWord}
          className="bg-orange-600 text-white px-6 py-3 rounded-lg font-medium flex items-center justify-center gap-2 hover:bg-orange-700 transition-colors mx-auto"
        >
          <Shuffle className="w-5 h-5" />
          Choisir un mot aléatoire
        </button>
      )}
    </div>
  );
};
