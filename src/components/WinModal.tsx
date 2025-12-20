import Modal from "./Modal";

interface WinModalProps {
    isOpen: boolean;
    onClose: () => void;
    moves: number;
    time: number;
    onPlayAgain: () => void;
    onNewGame: () => void;
}

export default function WinModal({ isOpen, onClose, moves, time, onPlayAgain, onNewGame }: WinModalProps) {
    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <div className="win-modal">
                <h2 className="win-title">🏆 Congratulations!</h2>
                <p className="win-text">You completed the game! 🎉</p>
                <div className="win-stats">
                    <div className="win-stat-item">
                        <span className="win-stat-label">Moves:</span>
                        <span className="win-stat-value">{moves}</span>
                    </div>
                    <div className="win-stat-item">
                        <span className="win-stat-label">Time:</span>
                        <span className="win-stat-value">{time}s</span>
                    </div>
                </div>
                <div className="win-modal-buttons">
                    <button className="btn btn-primary" onClick={onPlayAgain}>
                        🔄 Play Again
                    </button>
                    <button className="btn btn-secondary" onClick={onNewGame}>
                        🎮 New Game
                    </button>
                </div>
            </div>
        </Modal>
    );
}