/**
 * @module Grid
 * @category Components
 */

import Card from "./Card";

/**
 * Represents a single card on the game board.
 */
interface CardType {
    id: number;

    emoji: string;
}

/**
 * Props for the {@link Grid} component.
 */
interface GridProps {

    cards: CardType[];

    flipped: number[];

    solved: number[];

    onCardClick: (id: number) => void;
}

/**
 * The main game board — renders a CSS grid of {@link Card} components.
 *
 * A card shows its emoji when its ID is present in either `flipped` or
 * `solved`; otherwise it shows the back face (`❓`).
 *
 * @param props - {@link GridProps}
 *
 * @example
 * ```tsx
 * <Grid
 *   cards={cards}
 *   flipped={[0, 3]}
 *   solved={[2, 7]}
 *   onCardClick={(id) => handleCardClick(id)}
 * />
 * ```
 */
export default function Grid({ cards, flipped, solved, onCardClick }: GridProps) {
    return (
        <div className="grid">
            {cards.map((card) => (
                <Card
                    key={card.id}
                    symbol={flipped.includes(card.id) || solved.includes(card.id) ? card.emoji : "❓"}
                    onClick={() => onCardClick(card.id)}
                    isFlipped={flipped.includes(card.id) || solved.includes(card.id)}
                />
            ))}
        </div>
    );
}