/**
 * @module userStore
 * @category Store
 */

import { create } from 'zustand';
import { persist } from 'zustand/middleware';

/**
 * A single completed game result saved to the player's history.
 */
export interface GameResult {
    id: number;
    moves: number;
    time: number;
    pairsCount: number;
    date: string;
}

/**
 * Shape of the user store state and actions.
 */
interface UserState {
    userId: string;
    userName: string;
    games: GameResult[];

    /**
     * Sets the active user ID and loads their saved data.
     * @param id - The user ID to switch to.
     */
    setUserId: (id: string) => void;

    /**
     * Updates the player's display name.
     * @param name - The new display name.
     */
    setUserName: (name: string) => void;

    /**
     * Adds a new game result to the top of the history array.
     * Automatically assigns `id` (timestamp) and `date` (ISO string).
     * @param result - Game data without `id` and `date`.
     */
    addGameResult: (result: Omit<GameResult, 'id' | 'date'>) => void;

    /**
     * Loads a user's name and game history from `localStorage`.
     * @param userId - The user ID whose data should be loaded.
     */
    loadUserData: (userId: string) => void;

    /** Empties the current user's game history array. */
    clearGameHistory: () => void;

    /**
     * Returns the game with the fewest moves, or `null` if no games exist.
     */
    getBestScore: () => GameResult | null;

    /**
     * Returns the average number of moves across all games, rounded to nearest integer.
     * Returns `0` if no games exist.
     */
    getAverageScore: () => number;

    /** Returns the total number of completed games. */
    getTotalGames: () => number;
}

/**
 * Zustand store for the player profile and game history.
 *
 * Persisted to `localStorage` under the key `emoji-match-user`.
 * Also mirrors per-user data under `user_<id>_games` and `user_<id>_name`
 * keys to support multi-user profile switching.
 *
 * @example
 * ```ts
 * const { userName, games, addGameResult } = useUserStore();
 * addGameResult({ moves: 14, time: 42, pairsCount: 6 });
 * ```
 */
export const useUserStore = create<UserState>()(
    persist(
        (set, get) => ({
            userId: '1',
            userName: 'Player 1',
            games: [],

            setUserId: (id: string) => {
                set({ userId: id });
                get().loadUserData(id);
            },

            setUserName: (name: string) => {
                set({ userName: name });
            },

            addGameResult: (result: Omit<GameResult, 'id' | 'date'>) => {
                const newGame: GameResult = {
                    ...result,
                    id: Date.now(),
                    date: new Date().toISOString(),
                };

                set((state) => ({
                    games: [newGame, ...state.games],
                }));
            },

            loadUserData: (userId: string) => {
                const savedGames = localStorage.getItem(`user_${userId}_games`);
                const savedName = localStorage.getItem(`user_${userId}_name`);

                set({
                    userId,
                    userName: savedName || `Player ${userId}`,
                    games: savedGames ? JSON.parse(savedGames) : [],
                });
            },

            clearGameHistory: () => set({ games: [] }),

            getBestScore: () => {
                const { games } = get();
                if (games.length === 0) return null;
                return games.reduce((best, game) =>
                    game.moves < best.moves ? game : best
                );
            },

            getAverageScore: () => {
                const { games } = get();
                if (games.length === 0) return 0;
                const total = games.reduce((sum, game) => sum + game.moves, 0);
                return Math.round(total / games.length);
            },

            getTotalGames: () => get().games.length,
        }),
        {
            name: 'emoji-match-user',
            onRehydrateStorage: () => (state) => {
                if (state) {
                    const { userId, games, userName } = state;
                    localStorage.setItem(`user_${userId}_games`, JSON.stringify(games));
                    localStorage.setItem(`user_${userId}_name`, userName);
                }
            },
        }
    )
);