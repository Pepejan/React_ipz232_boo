import type {GameSettings} from "../contexts/GameSettingsContext.tsx";

export interface ValidationErrors {
    pairsCount?: string;
    flipSpeed?: string;
}

export const validateSettings = (settings: Partial<GameSettings>): ValidationErrors => {
    const errors: ValidationErrors = {};

    if (!settings.pairsCount || settings.pairsCount < 3 || settings.pairsCount > 12) {
        errors.pairsCount = "Pairs count must be between 3 and 12";
    }

    if (!settings.flipSpeed || settings.flipSpeed < 500 || settings.flipSpeed > 3000) {
        errors.flipSpeed = "Flip speed must be between 500 and 3000ms";
    }

    return errors;
};