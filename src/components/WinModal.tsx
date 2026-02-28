/**
 * @module WinModal
 * @category Components
 */

import Modal from "./Modal";

/**
 * Props for the {@link WinModal} component.
 */
interface WinModalProps {
    isOpen: boolean;

    onClose: () => void;

    moves: number;

    time: number;

    onPlayAgain: () => void;

    onNewGame: () => void;
}

/**
 * Completion dialog shown after all card pairs have been matched.
 *
 * Displays the player's final stats (moves and time) and provides
 * two action buttons: **Play Again** and **New Game**.
 *
 * Built on top of the generic {@link Modal} component.
 *
 * @param props - {@link WinModalProps}
 *
 * @example
 * ```tsx
 * <WinModal
 *   isOpen={showWinModal}
 *   onClose={() => setShowWinModal(false)}
 *   moves={moves}
 *   time={time}
 *   onPlayAgain={handlePlayAgain}
 *   onNewGame={handleNewGame}
 * />
 * ```
 */
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