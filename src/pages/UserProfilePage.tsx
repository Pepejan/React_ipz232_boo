import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Header from "../components/Header";
import styles from "../styles/UserProfilePage.module.css";

interface GameResult {
    id: number;
    moves: number;
    time: number;
    pairsCount?: number;
    date: string;
}

export default function UserProfilePage() {
    const { userId } = useParams<{ userId: string }>();
    const navigate = useNavigate();
    const [games, setGames] = useState<GameResult[]>([]);
    const [userName, setUserName] = useState("");

    const getDifficulty = (pairsCount?: number) => {
        if (!pairsCount) return "N/A";
        if (pairsCount <= 4) return "🟢 Easy";
        if (pairsCount <= 8) return "🟡 Medium";
        return "🔴 Hard";
    };

    useEffect(() => {
        if (userId) {
            localStorage.setItem("currentUserId", userId);
            const savedGames = JSON.parse(
                localStorage.getItem(`user_${userId}_games`) || "[]"
            );
            setGames(savedGames.reverse());

            const savedName = localStorage.getItem(`user_${userId}_name`);
            setUserName(savedName || `Player ${userId}`);
        }
    }, [userId]);

    const handleNameChange = (newName: string) => {
        if (userId && newName.trim()) {
            setUserName(newName);
            localStorage.setItem(`user_${userId}_name`, newName);
        }
    };

    const getBestScore = () => {
        if (games.length === 0) return null;
        return games.reduce((best, game) =>
            game.moves < best.moves ? game : best
        );
    };

    const getAverageScore = () => {
        if (games.length === 0) return 0;
        const total = games.reduce((sum, game) => sum + game.moves, 0);
        return Math.round(total / games.length);
    };

    const bestScore = getBestScore();

    return (
        <div className={styles.profilePage}>
            <Header title="👤 User Profile" />

            <div className={styles.profileCard}>
                <div className={styles.userInfo}>
                    <div className={styles.avatar}>
                        {userName.charAt(0).toUpperCase()}
                    </div>
                    <input
                        type="text"
                        value={userName}
                        onChange={(e) => handleNameChange(e.target.value)}
                        className={styles.nameInput}
                        placeholder="Enter your name"
                    />
                    <p className={styles.userId}>ID: {userId}</p>
                </div>

                <div className={styles.statistics}>
                    <h3 className={styles.sectionTitle}>📊 Statistics</h3>
                    <div className={styles.statsGrid}>
                        <div className={styles.statItem}>
                            <span className={styles.statLabel}>Total Games</span>
                            <span className={styles.statNumber}>{games.length}</span>
                        </div>
                        <div className={styles.statItem}>
                            <span className={styles.statLabel}>Best Score</span>
                            <span className={styles.statNumber}>
                                {bestScore ? `${bestScore.moves} moves` : "N/A"}
                            </span>
                        </div>
                        <div className={styles.statItem}>
                            <span className={styles.statLabel}>Average Moves</span>
                            <span className={styles.statNumber}>{getAverageScore()}</span>
                        </div>
                    </div>
                </div>

                <div className={styles.gamesHistory}>
                    <h3 className={styles.sectionTitle}>🎮 Game History</h3>
                    {games.length === 0 ? (
                        <p className={styles.noGames}>No games played yet</p>
                    ) : (
                        <div className={styles.gamesList}>
                            {games.slice(0, 10).map((game) => (
                                <div key={game.id} className={styles.gameItem}>
                                    <div className={styles.gameDate}>
                                        {new Date(game.date).toLocaleDateString()}
                                    </div>
                                    <div className={styles.gameStats}>
                                        <span>{getDifficulty(game.pairsCount)}</span>
                                        <span>🎯 {game.moves} moves</span>
                                        <span>⏱️ {game.time}s</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                <button
                    className={styles.backButton}
                    onClick={() => navigate("/")}
                >
                    🏠 Back to Home
                </button>
            </div>
        </div>
    );
}