import { useState } from "react";
import StartPage from "./pages/StartPage";
import GamePage from "./pages/GamePage";
import { GameSettingsContext, defaultSettings, type GameSettings } from "./contexts/GameSettingsContext";
import { emojiThemes } from "./constants/emojiThemes";
import "./styles/globals.css";
import "./styles/modal.css";
import "./styles/settings.css";

function App() {
    const [currentPage, setCurrentPage] = useState<"start" | "game">("start");
    const [settings, setSettings] = useState<GameSettings>(() => {
        const saved = localStorage.getItem("emojiMatchSettings");
        return saved ? JSON.parse(saved) : defaultSettings;
    });

    const updateSettings = (newSettings: GameSettings) => {
        setSettings(newSettings);
        localStorage.setItem("emojiMatchSettings", JSON.stringify(newSettings));
    };

    const handleStart = (newSettings: GameSettings) => {
        updateSettings(newSettings);
        setCurrentPage("game");
    };

    const handleFinish = (moves: number) => {
        console.log("Game finished with", moves, "moves");
    };

    const emojis = emojiThemes[settings.theme].slice(0, settings.pairsCount);

    return (
        <GameSettingsContext.Provider value={{ settings, updateSettings }}>
            <div className="app">
                {currentPage === "start" && (
                    <StartPage
                        onStart={handleStart}
                        initialSettings={settings}
                    />
                )}
                {currentPage === "game" && (
                    <GamePage
                        onFinish={handleFinish}
                        emojis={emojis}
                        flipSpeed={settings.flipSpeed}
                        onBackToSettings={() => setCurrentPage("start")}
                    />
                )}
            </div>
        </GameSettingsContext.Provider>
    );
}

export default App;