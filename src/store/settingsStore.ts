import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface GameSettings {
    pairsCount: number;
    flipSpeed: number;
    theme: "animals" | "food" | "nature";
}

interface SettingsState {
    settings: GameSettings;
    updateSettings: (settings: GameSettings) => void;
    resetSettings: () => void;
}

const defaultSettings: GameSettings = {
    pairsCount: 6,
    flipSpeed: 1000,
    theme: "animals"
};

export const useSettingsStore = create<SettingsState>()(
    persist(
        (set) => ({
            settings: defaultSettings,

            updateSettings: (newSettings: GameSettings) =>
                set({ settings: newSettings }),

            resetSettings: () =>
                set({ settings: defaultSettings }),
        }),
        {
            name: 'emoji-match-settings',
        }
    )
);