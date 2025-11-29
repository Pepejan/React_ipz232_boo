import Card from "./Card";

interface CardType {
    id: number;
    emoji: string;
}

interface GridProps {
    cards: CardType[];
    flipped: number[];
    solved: number[];
    onCardClick: (id: number) => void;
}

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