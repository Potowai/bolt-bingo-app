export interface BingoCard {
  id: string;
  words: string[];
  checked: boolean[];
}

const createCardId = (selectedIndices: number[]): string => {
  return selectedIndices.map(index => 
    (index + 1).toString().padStart(2, '0')
  ).join('');
};

const decodeCardId = (id: string, wordListLength: number): number[] | null => {
  try {
    if (id.length !== 50) return null; // 25 positions × 2 chars

    const indices: number[] = [];
    for (let i = 0; i < id.length; i += 2) {
      const index = parseInt(id.slice(i, i + 2)) - 1;
      if (index >= wordListLength || index < 0) return null;
      indices.push(index);
    }
    return indices;
  } catch {
    return null;
  }
};

export const generateCards = async (wordList: string[], numCards: number = 1): Promise<BingoCard[]> => {
  if (wordList.length < 25) {
    throw new Error('Need at least 25 words to generate a card');
  }

  const cards: BingoCard[] = [];
  const seed = Date.now();
  
  for (let i = 0; i < numCards; i++) {
    const selectedIndices: number[] = [];
    const availableIndices = Array.from({ length: wordList.length }, (_, i) => i);
    
    // Select 25 unique indices deterministically
    for (let j = 0; j < 25; j++) {
      const index = Math.floor((seed + i * 100 + j) % availableIndices.length);
      selectedIndices.push(availableIndices[index]);
      availableIndices.splice(index, 1);
    }

    const id = createCardId(selectedIndices);
    const selectedWords = selectedIndices.map(index => wordList[index]);

    cards.push({
      id,
      words: selectedWords,
      checked: new Array(25).fill(false),
    });
  }

  return cards;
};

export const recoverCard = async (id: string, wordList: string[]): Promise<BingoCard | null> => {
  const indices = decodeCardId(id, wordList.length);
  if (!indices || indices.length !== 25) return null;

  const words = indices.map(index => wordList[index]);
  return {
    id,
    words,
    checked: new Array(25).fill(false),
  };
};

export const checkWin = (checked: boolean[]): boolean => {
  // Check rows
  for (let i = 0; i < 5; i++) {
    if (checked.slice(i * 5, (i + 1) * 5).every(Boolean)) return true;
  }

  // Check columns
  for (let i = 0; i < 5; i++) {
    if ([0, 1, 2, 3, 4].every(j => checked[i + j * 5])) return true;
  }

  // Check diagonals
  if ([0, 6, 12, 18, 24].every(i => checked[i])) return true;
  if ([4, 8, 12, 16, 20].every(i => checked[i])) return true;

  return false;
};