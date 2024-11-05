import { useState } from "react";
import { BingoCardComponent } from "./components/BingoCard";
import { WordPicker } from "./components/WordPicker";
import { CardRecovery } from "./components/CardRecovery";
import { generateCards, checkWin, type BingoCard } from "./utils/bingo";
import {
  ListPlus,
  Loader2,
  RefreshCw,
  Ghost,
  Skull,
  Candy,
  Cat,
  Moon,
} from "lucide-react";
import Modal from "./components/Modal";

const HalloweenBackground = () => {
  const icons = [Ghost, Skull, Candy, Cat, Moon];
  return (
    <>
      {icons.map((Icon, index) =>
        Array.from({ length: 3 }).map((_, i) => (
          <Icon
            key={`${index}-${i}`}
            className="halloween-icon text-orange-500"
            style={{
              top: `${Math.random() * 100}vh`,
              left: `${Math.random() * 100}vw`,
              width: `${Math.random() * 40 + 20}px`,
              height: `${Math.random() * 40 + 20}px`,
              animationDelay: `${Math.random() * 2}s`,
              zIndex: -1,
            }}
          />
        )),
      )}
    </>
  );
};

function App() {
  const [wordInput, setWordInput] = useState("");
  const [wordList, setWordList] = useState<string[]>([]);
  const [cards, setCards] = useState<BingoCard[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const gifUrl =
    "https://media.giphy.com/media/l3vRfhFD8hJCiP0uQ/giphy.gif?cid=790b7611h3m5roulg3v76k06jmkxv5tdi3tfi8b74dtiyp8d&ep=v1_gifs_search&rid=giphy.gif&ct=g";

  const handleAddWords = () => {
    const words = wordInput
      .split("\n")
      .map((word) => word.trim())
      .filter((word) => word.length > 0);
    setWordList([...new Set([...wordList, ...words])]);
    setWordInput("");
  };

  const handleGenerateCards = async () => {
    setIsGenerating(true);
    try {
      const newCards = await generateCards(wordList, 1);
      setCards(newCards);
    } catch (error) {
      alert(
        error instanceof Error ? error.message : "Failed to generate cards",
      );
    }
    setIsGenerating(false);
  };

  const handleToggleWord = (cardIndex: number, wordIndex: number) => {
    const newCards = [...cards];
    newCards[cardIndex] = {
      ...cards[cardIndex],
      checked: cards[cardIndex].checked.map((c, i) =>
        i === wordIndex ? !c : c,
      ),
    };
    setCards(newCards);

    if (checkWin(newCards[cardIndex].checked)) {
      setIsModalOpen(true);
    }
  };

  const handleCardRecovered = (card: BingoCard) => {
    if (!cards.some((c) => c.id === card.id)) {
      setCards([...cards, card]);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="min-h-screen bg-transparent relative">
      <HalloweenBackground />
      <Modal isOpen={isModalOpen} onClose={handleCloseModal} gifUrl={gifUrl} />
      <div className="container mx-auto px-4 py-8 relative z-10">
        <h1 className="text-5xl font-bold text-center mb-8 text-orange-500 font-serif tracking-wider">
          🎃 Spooky Bingo 🎃
        </h1>
        <div className="max-w-2xl mx-auto space-y-6 mb-8">
          <div className="bg-gray-900/80 backdrop-blur-sm rounded-xl shadow-lg shadow-orange-500/20 p-6 border border-orange-500/20">
            <h2 className="text-xl font-semibold mb-4 text-orange-400">
              Add Words
            </h2>
            <textarea
              value={wordInput}
              onChange={(e) => setWordInput(e.target.value)}
              placeholder="Enter words (one per line)"
              className="w-full h-32 p-3 rounded-lg mb-4 bg-gray-800 border-orange-500/30 text-orange-100 placeholder-orange-300/50 focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
            />
            <div className="flex justify-around items-center">
              <span className="text-sm text-orange-300">
                {wordList.length} words added
              </span>
              <button
                onClick={handleAddWords}
                className="bg-orange-600 text-white px-4 py-2 rounded-lg font-medium flex items-center gap-2 hover:bg-orange-700 transition-colors"
              >
                <ListPlus className="w-5 h-5" />
                Add Words
              </button>
              <button
                onClick={handleGenerateCards}
                disabled={isGenerating || wordList.length < 25}
                className="bg-purple-600 text-white px-4 py-2 rounded-lg font-medium flex items-center gap-2 hover:bg-purple-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isGenerating ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <RefreshCw className="w-5 h-5" />
                )}
                Generate Card
              </button>
            </div>
          </div>

          {wordList.length > 0 && (
            <CardRecovery
              wordList={wordList}
              onCardRecovered={handleCardRecovered}
            />
          )}

          {wordList.length > 0 && <WordPicker wordList={wordList} />}

          {cards.length > 0 && (
            <div className="grid gap-8">
              {cards.map((card, i) => (
                <BingoCardComponent
                  key={card.id}
                  card={card}
                  onToggle={(index) => handleToggleWord(i, index)}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
