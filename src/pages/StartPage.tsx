import Header from "../components/Header";
import Button from "../components/Button";
import type {Difficulty} from "../hooks/useDifficulty";

interface StartPageProps {
    onStart: () => void;
    difficulty: Difficulty;
    onDifficultyChange: (diff: Difficulty) => void;
}

export default function StartPage({ onStart, difficulty, onDifficultyChange }: StartPageProps) {
    return (
        <div className="page">
            <Header />
            <p className="text">Welcome to Emoji Match! Test your memory 🧠</p>

            <div className="difficulty-selector">
                <p className="text">Choose difficulty:</p>
                <div className="btn-group">
                    <Button
                        text="Easy (4 pairs)"
                        onClick={() => onDifficultyChange("easy")}
                    />
                    <Button
                        text="Medium (6 pairs)"
                        onClick={() => onDifficultyChange("medium")}
                    />
                    <Button
                        text="Hard (8 pairs)"
                        onClick={() => onDifficultyChange("hard")}
                    />
                </div>
                <p className="text">Selected: {difficulty}</p>
            </div>

            <Button text="Start Game" onClick={onStart} />
        </div>
    );
}