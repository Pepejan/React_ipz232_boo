import { createContext, useContext } from "react";

export interface GameSettings {
    difficulty: "easy" | "medium" | "hard";
    pairsCount: number;
    flipSpeed: number;
    theme: "animals" | "food" | "nature";
}

export const defaultSettings: GameSettings = {
    difficulty: "medium",
    pairsCount: 6,
    flipSpeed: 1000,
    theme: "animals"
};

export const GameSettingsContext = createContext<{
    settings: GameSettings;
    updateSettings: (settings: GameSettings) => void;
}>({
    settings: defaultSettings,
    updateSettings: () => {}
});

export const useGameSettings = () => useContext(GameSettingsContext);