/**
 * @module settingsStore
 * @category Store
 */

import { create } from 'zustand';
import { persist } from 'zustand/middleware';

/**
 * Game configuration settings chosen by the player.
 */
export interface GameSettings {
    /** Number of emoji pairs on the board. Min: 3, Max: 12. */
    pairsCount: number;
    /** Milliseconds before an unmatched pair flips back. Min: 500, Max: 3000. */
    flipSpeed: number;
    /** Emoji theme used for card symbols. */
    theme: "animals" | "food" | "nature";
}

/**
 * Shape of the settings store state and actions.
 */
interface SettingsState {
    /** Current game settings. */
    settings: GameSettings;
    /**
     * Replaces the current settings with new values.
     * @param settings - The new {@link GameSettings} to apply.
     */
    updateSettings: (settings: GameSettings) => void;
    /** Resets all settings back to their default values. */
    resetSettings: () => void;
}

/**
 * Default settings applied on first launch or after a reset.
 */
const defaultSettings: GameSettings = {
    pairsCount: 6,
    flipSpeed: 1000,
    theme: "animals"
};

/**
 * Zustand store for persisted game configuration settings.
 *
 * Settings are saved to `localStorage` under the key `emoji-match-settings`
 * and automatically restored on page reload.
 *
 * @example
 * ```ts
 * const { settings, updateSettings } = useSettingsStore();
 * updateSettings({ ...settings, pairsCount: 8 });
 * ```
 */
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