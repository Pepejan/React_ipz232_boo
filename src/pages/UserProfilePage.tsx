import { useParams, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import Header from "../components/Header";
import { useUserStore } from "../store";
import styles from "../styles/UserProfilePage.module.css";

export default function UserProfilePage() {
    const { userId: paramUserId } = useParams<{ userId: string }>();
    const navigate = useNavigate();

    const {
        userId,
        userName,
        games,
        setUserId,
        setUserName,
        loadUserData,
        getBestScore,
        getAverageScore,
        getTotalGames,
    } = useUserStore();

    useEffect(() => {
        if (paramUserId && paramUserId !== userId) {
            setUserId(paramUserId);
            loadUserData(paramUserId);
        }
    }, [paramUserId]);

    const getDifficulty = (pairsCount?: number) => {
        if (!pairsCount) return "N/A";
        if (pairsCount <= 4) return "🟢 Easy";
        if (pairsCount <= 8) return "🟡 Medium";
        return "🔴 Hard";
    };

    const handleNameChange = (newName: string) => {
        if (newName.trim()) {
            setUserName(newName);
            localStorage.setItem(`user_${userId}_name`, newName);
        }
    };

    const bestScore = getBestScore();
    const averageScore = getAverageScore();
    const totalGames = getTotalGames();

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
                            <span className={styles.statNumber}>{totalGames}</span>
                        </div>
                        <div className={styles.statItem}>
                            <span className={styles.statLabel}>Best Score</span>
                            <span className={styles.statNumber}>
                                {bestScore ? `${bestScore.moves} moves` : "N/A"}
                            </span>
                        </div>
                        <div className={styles.statItem}>
                            <span className={styles.statLabel}>Average Moves</span>
                            <span className={styles.statNumber}>{averageScore}</span>
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