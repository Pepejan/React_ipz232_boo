import { useState } from "react";
import StartPage from "./pages/StartPage";
import GamePage from "./pages/GamePage";
import ResultPage from "./pages/ResultPage";
import "./styles/globals.css";

function App() {
    const [currentPage, setCurrentPage] = useState<"start" | "game" | "result">("start");

    return (
        <div className="app">
            {currentPage === "start" && <StartPage onStart={() => setCurrentPage("game")} />}
            {currentPage === "game" && <GamePage onFinish={() => setCurrentPage("result")} />}
            {currentPage === "result" && (
                <ResultPage
                    onRestart={() => setCurrentPage("game")}
                    onBack={() => setCurrentPage("start")}
                />
            )}
        </div>
    );
}

export default App;
