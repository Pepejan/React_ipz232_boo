import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import type { GameSettings } from "../contexts/GameSettingsContext";

interface SettingsFormProps {
    onSubmit: (settings: GameSettings) => void;
    initialSettings: GameSettings;
}

const schema: yup.ObjectSchema<GameSettings> = yup.object({
    pairsCount: yup
        .number()
        .required("Number of pairs is required")
        .min(3, "Minimum 3 pairs")
        .max(12, "Maximum 12 pairs")
        .integer("Must be a whole number"),
    flipSpeed: yup
        .number()
        .required("Flip speed is required")
        .min(500, "Minimum 500ms")
        .max(3000, "Maximum 3000ms"),
    theme: yup
        .mixed<"animals" | "food" | "nature">()
        .oneOf(["animals", "food", "nature"])
        .required("Theme is required")
}).required();

export default function SettingsForm({ onSubmit, initialSettings }: SettingsFormProps) {
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors }
    } = useForm<GameSettings>({
        resolver: yupResolver(schema),
        defaultValues: initialSettings
    });

    const flipSpeed = watch("flipSpeed");

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="settings-form">
            <h3 className="form-title">⚙️ Game Settings</h3>

            <div className="form-group">
                <label>Number of Pairs (3-12):</label>
                <input
                    type="number"
                    {...register("pairsCount", { valueAsNumber: true })}
                    className="form-input"
                    min="3"
                    max="12"
                />
                {errors.pairsCount && (
                    <span className="error">{errors.pairsCount.message}</span>
                )}
            </div>

            <div className="form-group">
                <label>Flip Speed: {flipSpeed}ms</label>
                <input
                    type="range"
                    {...register("flipSpeed", { valueAsNumber: true })}
                    className="form-range"
                    min="500"
                    max="3000"
                    step="100"
                />
                <div className="range-labels">
                    <span>Fast (500ms)</span>
                    <span>Slow (3000ms)</span>
                </div>
                {errors.flipSpeed && (
                    <span className="error">{errors.flipSpeed.message}</span>
                )}
            </div>

            <div className="form-group">
                <label>Theme:</label>
                <select {...register("theme")} className="form-select">
                    <option value="animals">Animals 🐾</option>
                    <option value="food">Food 🍎</option>
                    <option value="nature">Nature 🌿</option>
                </select>
                {errors.theme && (
                    <span className="error">{errors.theme.message}</span>
                )}
            </div>

            <button type="submit" className="btn btn-submit">
                Save & Start Game
            </button>
        </form>
    );
}