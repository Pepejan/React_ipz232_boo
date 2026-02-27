import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import StartPage from "./pages/StartPage";
import GamePage from "./pages/GamePage";
import UserProfilePage from "./pages/UserProfilePage";
import { useSettingsStore } from "./store";
import { emojiThemes } from "./constants/emojiThemes";
import "./styles/globals.css";
import "./styles/modal.css";
import "./styles/settings.css";
import CookieBanner from "./components/CookieBanner";


function App() {
    const { settings } = useSettingsStore();
    const emojis = emojiThemes[settings.theme].slice(0, settings.pairsCount);

    return (
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
                <CookieBanner />  {}
            </div>
        </BrowserRouter>
    );
}

export default App;