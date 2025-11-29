import { useState } from "react";

export type Difficulty = "easy" | "medium" | "hard";

interface DifficultyConfig {
    emojis: string[];
    gridCols: number;
}

export function useDifficulty() {
    const [difficulty, setDifficulty] = useState<Difficulty>("easy");

    const configs: Record<Difficulty, DifficultyConfig> = {
        easy: { emojis: ["🐶", "🐱", "🐭", "🐹"], gridCols: 4 },
        medium: { emojis: ["🐶", "🐱", "🐭", "🐹", "🐰", "🦊"], gridCols: 4 },
        hard: { emojis: ["🐶", "🐱", "🐭", "🐹", "🐰", "🦊", "🐻", "🐼"], gridCols: 4 }
    };

    return { difficulty, setDifficulty, config: configs[difficulty] };
}