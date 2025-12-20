import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import SettingsForm from "../components/SettingsForm";
import { useSettingsStore, useUserStore } from "../store";
import type { GameSettings } from "../store";
import styles from "../styles/StartPage.module.css";

export default function StartPage() {
    const navigate = useNavigate();
    const { settings, updateSettings } = useSettingsStore();
    const { userId } = useUserStore();

    const handleStart = (newSettings: GameSettings) => {
        updateSettings(newSettings);
        navigate("/game");
    };

    const handleViewProfile = () => {
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
                initialSettings={settings}
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