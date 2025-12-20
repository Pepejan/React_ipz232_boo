import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface GameResult {
    id: number;
    moves: number;
    time: number;
    pairsCount: number;
    date: string;
}

interface UserState {
    userId: string;
    userName: string;
    games: GameResult[];

    // Actions
    setUserId: (id: string) => void;
    setUserName: (name: string) => void;
    addGameResult: (result: Omit<GameResult, 'id' | 'date'>) => void;
    loadUserData: (userId: string) => void;
    clearGameHistory: () => void;

    // Computed values
    getBestScore: () => GameResult | null;
    getAverageScore: () => number;
    getTotalGames: () => number;
}

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
                // Завантаження даних з localStorage для конкретного користувача
                const savedGames = localStorage.getItem(`user_${userId}_games`);
                const savedName = localStorage.getItem(`user_${userId}_name`);

                set({
                    userId,
                    userName: savedName || `Player ${userId}`,
                    games: savedGames ? JSON.parse(savedGames) : [],
                });
            },

            clearGameHistory: () => set({ games: [] }),

            // Computed values
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
            // Зберігаємо дані також в localStorage для кожного користувача
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