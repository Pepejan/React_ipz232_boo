import { create } from 'zustand';

interface Card {
    id: number;
    emoji: string;
}

interface GameState {
    cards: Card[];
    flipped: number[];
    solved: number[];
    moves: number;
    time: number;
    isGameActive: boolean;

    initializeGame: (emojis: string[]) => void;
    flipCard: (id: number) => void;
    unflipCards: () => void;
    markAsSolved: (first: number, second: number) => void;
    incrementMoves: () => void;
    incrementTime: () => void;
    resetGame: (emojis: string[]) => void;
    setGameActive: (active: boolean) => void;
}

export const useGameStore = create<GameState>((set, get) => ({
    cards: [],
    flipped: [],
    solved: [],
    moves: 0,
    time: 0,
    isGameActive: false,

    initializeGame: (emojis: string[]) => {
        const shuffled = [...emojis, ...emojis]
            .sort(() => Math.random() - 0.5)
            .map((emoji, index) => ({ id: index, emoji }));

        set({
            cards: shuffled,
            flipped: [],
            solved: [],
            moves: 0,
            time: 0,
            isGameActive: false,
        });
    },

    flipCard: (id: number) => {
        const { flipped, solved } = get();
        if (flipped.length < 2 && !flipped.includes(id) && !solved.includes(id)) {
            set({ flipped: [...flipped, id] });
        }
    },

    unflipCards: () => set({ flipped: [] }),

    markAsSolved: (first: number, second: number) => {
        set((state) => ({
            solved: [...state.solved, first, second],
            flipped: [],
        }));
    },

    incrementMoves: () => set((state) => ({ moves: state.moves + 1 })),

    incrementTime: () => set((state) => ({ time: state.time + 1 })),

    resetGame: (emojis: string[]) => {
        const shuffled = [...emojis, ...emojis]
            .sort(() => Math.random() - 0.5)
            .map((emoji, index) => ({ id: index, emoji }));

        set({
            cards: shuffled,
            flipped: [],
            solved: [],
            moves: 0,
            time: 0,
            isGameActive: false,
        });
    },

    setGameActive: (active: boolean) => set({ isGameActive: active }),
}));