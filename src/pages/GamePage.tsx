import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Grid from "../components/Grid";
import WinModal from "../components/WinModal";
import { useGameLogic } from "../hooks/useGameLogic";
import styles from "../styles/GamePage.module.css";

interface GamePageProps {
    emojis: string[];
    flipSpeed: number;
    onFinish?: (moves: number) => void;
    onBackToSettings?: () => void;
}

export default function GamePage({ emojis, flipSpeed, onFinish, onBackToSettings }: GamePageProps) {
    const navigate = useNavigate();
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
                saveGameResult(moves, time);
                if (onFinish) {
                    onFinish(moves);
                }
            }, 500);
        }
    }, [isWon, moves, time, onFinish]);

    const saveGameResult = (finalMoves: number, finalTime: number) => {
        const userId = localStorage.getItem("currentUserId") || "1";
        const games = JSON.parse(localStorage.getItem(`user_${userId}_games`) || "[]");
        games.push({
            id: Date.now(),
            moves: finalMoves,
            time: finalTime,
            pairsCount: emojis.length,
            date: new Date().toISOString()
        });
        localStorage.setItem(`user_${userId}_games`, JSON.stringify(games));
    };

    const handleCardClick = (id: number) => {
        if (flipped.length === 2 || flipped.includes(id) || solved.includes(id)) {
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
        if (onBackToSettings) {
            onBackToSettings();
        } else {
            navigate("/");
        }
    };

    const handleBackToSettings = () => {
        if (onBackToSettings) {
            onBackToSettings();
        } else {
            navigate("/");
        }
    };

    return (
        <div className={styles.gamePage}>
            <Header title="🎮 Game Time!" />
            <div className={styles.gameInfo}>
                <div className={styles.statCard}>
                    <span className={styles.statIcon}>⏱️</span>
                    <span className={styles.statValue}>{time}s</span>
                </div>
                <div className={styles.statCard}>
                    <span className={styles.statIcon}>🎯</span>
                    <span className={styles.statValue}>{moves}</span>
                </div>
            </div>
            <Grid
                cards={cards}
                flipped={flipped}
                solved={solved}
                onCardClick={handleCardClick}
            />
            <button
                className={styles.settingsButton}
                onClick={handleBackToSettings}
            >
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