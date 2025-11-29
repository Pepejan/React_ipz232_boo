import Header from "../components/Header";
import Button from "../components/Button";

interface ResultPageProps {
    onRestart: () => void;
    onBack: () => void;
    moves: number;
}

export default function ResultPage({ onRestart, onBack, moves }: ResultPageProps) {
    return (
        <div className="page">
            <Header title="🏆 Results" />
            <p className="text">You Win! 🎉</p>
            <p className="text">Total moves: {moves}</p>
            <div className="btn-group">
                <Button text="Play Again" onClick={onRestart} />
                <Button text="Back to Start" onClick={onBack} />
            </div>
        </div>
    );
}