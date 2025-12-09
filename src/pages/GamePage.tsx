import { useEffect, useState } from "react";
import Header from "../components/Header";
import Grid from "../components/Grid";
import WinModal from "../components/WinModal";
import { useGameLogic } from "../hooks/useGameLogic";

interface GamePageProps {
    onFinish: (moves: number) => void;
    emojis: string[];
    flipSpeed: number;
    onBackToSettings: () => void;
}

export default function GamePage({ onFinish, emojis, flipSpeed, onBackToSettings }: GamePageProps) {
    const {
        cards,
        flipped,
        solved,
        moves,
        time,
        flipCard,
        markAsSolved,
        incrementMoves,
        isWon,
        resetGame
    } = useGameLogic(emojis, flipSpeed);

    const [showWinModal, setShowWinModal] = useState(false);

    useEffect(() => {
        if (isWon) {
            setTimeout(() => {
                setShowWinModal(true);
                onFinish(moves);
            }, 500);
        }
    }, [isWon, moves, onFinish]);

    const handleCardClick = (id: number) => {
        if (flipped.length === 2) {
            return;
        }

        if (flipped.includes(id) || solved.includes(id)) {
            return;
        }

        flipCard(id);

        if (flipped.length === 1) {
            incrementMoves();

            const firstCardId = flipped[0];
            const firstCard = cards[firstCardId];
            const secondCard = cards[id];

            if (firstCard.emoji === secondCard.emoji) {
                markAsSolved(firstCardId, id);
            }
        }
    };

    const handlePlayAgain = () => {
        resetGame();
        setShowWinModal(false);
    };

    const handleNewGame = () => {
        setShowWinModal(false);
        onBackToSettings();
    };

    return (
        <div className="page">
            <Header title="🎮 Game Time!" />
            <div className="game-info">
                <p className="text">⏱️ Time: {time}s</p>
                <p className="text">🎯 Moves: {moves}</p>
            </div>
            <Grid
                cards={cards}
                flipped={flipped}
                solved={solved}
                onCardClick={handleCardClick}
            />
            <button className="btn btn-settings" onClick={onBackToSettings}>
                ⚙️ Settings
            </button>

            <WinModal
                isOpen={showWinModal}
                onClose={() => setShowWinModal(false)}
                moves={moves}
                time={time}
                onPlayAgain={handlePlayAgain}
                onNewGame={handleNewGame}
            />
        </div>
    );
}