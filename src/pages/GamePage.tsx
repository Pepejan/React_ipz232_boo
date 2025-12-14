import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Grid from "../components/Grid";
import WinModal from "../components/WinModal";
import { useGameStore, useUserStore } from "../store";
import styles from "../styles/GamePage.module.css";

interface GamePageProps {
    emojis: string[];
    flipSpeed: number;
}

export default function GamePage({ emojis, flipSpeed }: GamePageProps) {
    const navigate = useNavigate();
    const [showWinModal, setShowWinModal] = useState(false);

    const {
        cards,
        flipped,
        solved,
        moves,
        time,
        initializeGame,
        flipCard,
        unflipCards,
        markAsSolved,
        incrementMoves,
        incrementTime,
        resetGame,
        setGameActive,
    } = useGameStore();

    const { addGameResult } = useUserStore();

    useEffect(() => {
        initializeGame(emojis);
        setShowWinModal(false);
        return () => setGameActive(false);
    }, [emojis]);

    useEffect(() => {
        if (cards.length > 0 && solved.length < cards.length && !showWinModal) {
            const timer = setInterval(incrementTime, 1000);
            return () => clearInterval(timer);
        }
    }, [cards, solved, showWinModal]);

    useEffect(() => {
        if (flipped.length === 2) {
            const [first, second] = flipped;
            if (cards[first]?.emoji === cards[second]?.emoji) {
                markAsSolved(first, second);
            } else {
                const timeout = setTimeout(unflipCards, flipSpeed);
                return () => clearTimeout(timeout);
            }
        }
    }, [flipped, cards, flipSpeed]);

    useEffect(() => {
        if (solved.length === cards.length && cards.length > 0 && !showWinModal) {
            setTimeout(() => {
                setShowWinModal(true);
                setGameActive(false);

                addGameResult({
                    moves,
                    time,
                    pairsCount: emojis.length,
                });
            }, 500);
        }
    }, [solved, cards, showWinModal]);

    const handleCardClick = (id: number) => {
        if (flipped.length === 2 || flipped.includes(id) || solved.includes(id)) {
            return;
        }

        if (moves === 0 && flipped.length === 0) {
            setGameActive(true);
        }

        flipCard(id);

        if (flipped.length === 1) {
            incrementMoves();
        }
    };

    const handlePlayAgain = () => {
        resetGame(emojis);
        setShowWinModal(false);
    };

    const handleNewGame = () => {
        setShowWinModal(false);
        navigate("/");
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
                onClick={() => navigate("/")}
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