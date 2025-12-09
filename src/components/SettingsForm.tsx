import { useState } from "react";
import type {GameSettings} from "../contexts/GameSettingsContext";
import {validateSettings, type ValidationErrors} from "../utils/validation";

interface SettingsFormProps {
    onSubmit: (settings: GameSettings) => void;
    initialSettings: GameSettings;
}

export default function SettingsForm({ onSubmit, initialSettings }: SettingsFormProps) {
    const [settings, setSettings] = useState<GameSettings>(initialSettings);
    const [errors, setErrors] = useState<ValidationErrors>({});

    const handleChange = (field: keyof GameSettings, value: GameSettings[typeof field]) => {
        setSettings(prev => ({ ...prev, [field]: value }));
        setErrors((prev: ValidationErrors) => ({ ...prev, [field]: undefined }));
    };

    const handleSubmit = () => {
        const validationErrors = validateSettings(settings);

        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        onSubmit(settings);
    };

    return (
        <div className="settings-form">
            <h3 className="form-title">⚙️ Game Settings</h3>

            <div className="form-group">
                <label>Number of Pairs (3-12):</label>
                <input
                    type="number"
                    value={settings.pairsCount}
                    onChange={(e) => handleChange("pairsCount", parseInt(e.target.value))}
                    className="form-input"
                    min="3"
                    max="12"
                />
                {errors.pairsCount && <span className="error">{errors.pairsCount}</span>}
            </div>

            <div className="form-group">
                <label>Flip Speed: {settings.flipSpeed}ms</label>
                <input
                    type="range"
                    value={settings.flipSpeed}
                    onChange={(e) => handleChange("flipSpeed", parseInt(e.target.value))}
                    className="form-range"
                    min="500"
                    max="3000"
                    step="100"
                />
                <div className="range-labels">
                    <span>Fast (500ms)</span>
                    <span>Slow (3000ms)</span>
                </div>
                {errors.flipSpeed && <span className="error">{errors.flipSpeed}</span>}
            </div>

            <div className="form-group">
                <label>Theme:</label>
                <select
                    value={settings.theme}
                    onChange={(e) => handleChange("theme", e.target.value as GameSettings["theme"])}
                    className="form-select"
                >
                    <option value="animals">Animals 🐾</option>
                    <option value="food">Food 🍎</option>
                    <option value="nature">Nature 🌿</option>
                </select>
            </div>

            <button onClick={handleSubmit} className="btn btn-submit">
                Save & Start Game
            </button>
        </div>
    );
}