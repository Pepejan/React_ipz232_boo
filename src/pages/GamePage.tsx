import Header from "../components/Header";
import Grid from "../components/Grid";
import Button from "../components/Button";

interface GamePageProps {
    onFinish: () => void;
}

export default function GamePage({ onFinish }: GamePageProps) {
    return (
        <div className="page">
            <Header title="🎮 Game Time!" />
            <p className="text">Moves: 0</p>
            <Grid />
            <Button text="Finish Game" onClick={onFinish} />
        </div>
    );
}
