import Header from "../components/Header";
import SettingsForm from "../components/SettingsForm";
import type {GameSettings} from "../contexts/GameSettingsContext";

interface StartPageProps {
    onStart: (settings: GameSettings) => void;
    initialSettings: GameSettings;
}

export default function StartPage({ onStart, initialSettings }: StartPageProps) {
    return (
        <div className="page">
            <Header />
            <p className="text">Welcome to Emoji Match! Test your memory 🧠</p>
            <SettingsForm
                onSubmit={onStart}
                initialSettings={initialSettings}
            />
        </div>
    );
}