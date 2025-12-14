import { createContext, useContext } from "react";

export interface GameSettings {
    pairsCount: number;
    flipSpeed: number;
    theme: "animals" | "food" | "nature";
}

export const defaultSettings: GameSettings = {
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