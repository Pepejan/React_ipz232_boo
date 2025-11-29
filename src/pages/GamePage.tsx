import { useEffect } from "react";
import Header from "../components/Header";
import Grid from "../components/Grid";
import { useGameLogic } from "../hooks/useGameLogic";

interface GamePageProps {
    onFinish: (moves: number) => void;
}

export default function GamePage({ onFinish }: GamePageProps) {
    const { cards, flipped, solved, moves, handleClick, isWon } = useGameLogic();

    useEffect(() => {
        if (isWon) {
            setTimeout(() => onFinish(moves), 500);
        }
    }, [isWon, moves, onFinish]);

    return (
        <div className="page">
            <Header title="🎮 Game Time!" />
            <p className="text">Moves: {moves}</p>
            <Grid
                cards={cards}
                flipped={flipped}
                solved={solved}
                onCardClick={handleClick}
            />
        </div>
    );
}