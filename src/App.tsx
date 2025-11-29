import { useState } from "react";
import StartPage from "./pages/StartPage";
import GamePage from "./pages/GamePage";
import ResultPage from "./pages/ResultPage";
import { useDifficulty } from "./hooks/useDifficulty";
import "./styles/globals.css";

function App() {
    const [currentPage, setCurrentPage] = useState<"start" | "game" | "result">("start");
    const [finalMoves, setFinalMoves] = useState(0);
    const { difficulty, setDifficulty, config } = useDifficulty();

    const handleFinish = (moves: number) => {
        setFinalMoves(moves);
        setCurrentPage("result");
    };

    return (
        <div className="app">
            {currentPage === "start" && (
                <StartPage
                    onStart={() => setCurrentPage("game")}
                    difficulty={difficulty}
                    onDifficultyChange={setDifficulty}
                />
            )}
            {currentPage === "game" && (
                <GamePage
                    onFinish={handleFinish}
                    emojis={config.emojis}
                />
            )}
            {currentPage === "result" && (
                <ResultPage
                    moves={finalMoves}
                    onRestart={() => setCurrentPage("game")}
                    onBack={() => setCurrentPage("start")}
                />
            )}
        </div>
    );
}

export default App;