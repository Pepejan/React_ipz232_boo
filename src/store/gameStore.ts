/**
 * @module gameStore
 * @category Store
 */

import { create } from 'zustand';

/**
 * Represents a single card on the game board.
 */
interface Card {
    /** Unique index identifier for this card instance. */
    id: number;
    /** The emoji symbol for this card. */
    emoji: string;
}

/**
 * Shape of the game state and all available actions.
 */
interface GameState {
    /** All cards on the board (emoji pairs × 2, shuffled). */
    cards: Card[];
    /** IDs of currently face-up cards (max 2 at a time). */
    flipped: number[];
    /** IDs of successfully matched card pairs. */
    solved: number[];
    /** Number of pair attempts made by the player. */
    moves: number;
    /** Elapsed time in seconds since the game started. */
    time: number;
    /** Whether the game is currently in progress. */
    isGameActive: boolean;

    /**
     * Shuffles the provided emojis into pairs and resets all game state.
     * @param emojis - Array of unique emoji strings to use as card symbols.
     */
    initializeGame: (emojis: string[]) => void;

    /**
     * Flips a card face-up by adding its ID to `flipped`.
     * Ignored if 2 cards are already flipped, or the card is already flipped/solved.
     * @param id - The card ID to flip.
     */
    flipCard: (id: number) => void;

    /** Clears `flipped` — called after a non-matching pair timeout. */
    unflipCards: () => void;

    /**
     * Moves two matched card IDs from `flipped` to `solved`.
     * @param first - ID of the first matched card.
     * @param second - ID of the second matched card.
     */
    markAsSolved: (first: number, second: number) => void;

    /** Increments the move counter by 1. */
    incrementMoves: () => void;

    /** Increments the time counter by 1 second. */
    incrementTime: () => void;

    /**
     * Re-shuffles the emojis and resets all state. Equivalent to `initializeGame`.
     * @param emojis - Array of unique emoji strings.
     */
    resetGame: (emojis: string[]) => void;

    /**
     * Sets the `isGameActive` flag.
     * @param active - `true` to mark the game as active, `false` to stop.
     */
    setGameActive: (active: boolean) => void;
}

/**
 * Zustand store for all active game state.
 *
 * **Not persisted** — resets on page refresh.
 *
 * @example
 * ```ts
 * const { cards, flipped, flipCard } = useGameStore();
 * ```
 */
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