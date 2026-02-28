/**
 * @module Card
 * @category Components
 */

/**
 * Props for the {@link Card} component.
 */
interface CardProps {
    symbol: string;
    onClick: () => void;
    isFlipped: boolean;
}

/**
 * A single memory game card.
 *
 * Displays `❓` when face-down, or the `symbol` emoji when face-up.
 * The cursor changes to `default` when the card is already flipped
 * to prevent accidental re-clicks.
 *
 * @param props - {@link CardProps}
 *
 * @example
 * ```tsx
 * // Face-down card
 * <Card symbol="🐶" isFlipped={false} onClick={() => handleFlip(0)} />
 *
 * // Face-up card (already flipped or solved)
 * <Card symbol="🐶" isFlipped={true} onClick={() => {}} />
 * ```
 */
export default function Card({ symbol, onClick, isFlipped }: CardProps) {
    return (
        <div
            className="card"
            onClick={onClick}
            style={{ cursor: isFlipped ? 'default' : 'pointer' }}
        >
            {symbol}
        </div>
    );
}