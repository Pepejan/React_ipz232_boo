import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import SettingsForm from "../components/SettingsForm";
import { useGameSettings } from "../contexts/GameSettingsContext";
import type { GameSettings } from "../contexts/GameSettingsContext";
import styles from "../styles/StartPage.module.css";

interface StartPageProps {
    onStart?: (settings: GameSettings) => void;
    initialSettings?: GameSettings;
}

export default function StartPage({ onStart, initialSettings }: StartPageProps) {
    const navigate = useNavigate();
    const { settings, updateSettings } = useGameSettings();

    const currentSettings = initialSettings || settings;

    const handleStart = (newSettings: GameSettings) => {
        updateSettings(newSettings);
        if (onStart) {
            onStart(newSettings);
        }
        navigate("/game");
    };

    const handleViewProfile = () => {
        const userId = localStorage.getItem("currentUserId") || "1";
        navigate(`/user/${userId}`);
    };

    return (
        <div className={styles.startPage}>
            <Header />
            <p className={styles.welcomeText}>
                Welcome to Emoji Match! Test your memory 🧠
            </p>
            <SettingsForm
                onSubmit={handleStart}
                initialSettings={currentSettings}
            />
            <button
                className={styles.profileButton}
                onClick={handleViewProfile}
            >
                👤 View Profile
            </button>
        </div>
    );
}