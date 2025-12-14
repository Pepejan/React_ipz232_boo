import { useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import StartPage from "./pages/StartPage";
import GamePage from "./pages/GamePage";
import UserProfilePage from "./pages/UserProfilePage";
import { GameSettingsContext, defaultSettings, type GameSettings } from "./contexts/GameSettingsContext";
import { emojiThemes } from "./constants/emojiThemes";
import "./styles/globals.css";
import "./styles/modal.css";
import "./styles/settings.css";

function App() {
    const [settings, setSettings] = useState<GameSettings>(() => {
        const saved = localStorage.getItem("emojiMatchSettings");
        return saved ? JSON.parse(saved) : defaultSettings;
    });

    const updateSettings = (newSettings: GameSettings) => {
        setSettings(newSettings);
        localStorage.setItem("emojiMatchSettings", JSON.stringify(newSettings));
    };

    const emojis = emojiThemes[settings.theme].slice(0, settings.pairsCount);

    return (
        <GameSettingsContext.Provider value={{ settings, updateSettings }}>
            <BrowserRouter>
                <div className="app">
                    <Routes>
                        <Route path="/" element={<StartPage />} />
                        <Route
                            path="/game"
                            element={
                                <GamePage
                                    emojis={emojis}
                                    flipSpeed={settings.flipSpeed}
                                />
                            }
                        />
                        <Route path="/user/:userId" element={<UserProfilePage />} />
                        <Route path="*" element={<Navigate to="/" replace />} />
                    </Routes>
                </div>
            </BrowserRouter>
        </GameSettingsContext.Provider>
    );
}

export default App;