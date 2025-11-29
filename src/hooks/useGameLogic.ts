import { useState, useEffect } from "react";

interface Card {
    id: number;
    emoji: string;
}

export function useGameLogic() {
    const emojis = ["🐶", "🐱", "🐭", "🐹"];
    const [cards, setCards] = useState<Card[]>([]);
    const [flipped, setFlipped] = useState<number[]>([]);
    const [solved, setSolved] = useState<number[]>([]);
    const [moves, setMoves] = useState(0);

    useEffect(() => {
        const shuffled = [...emojis, ...emojis]
            .sort(() => Math.random() - 0.5)
            .map((emoji, index) => ({ id: index, emoji }));
        setCards(shuffled);
    }, []);

    const handleClick = (id: number) => {
        if (flipped.length === 2 || flipped.includes(id) || solved.includes(id)) {
            return;
        }

        const newFlipped = [...flipped, id];
        setFlipped(newFlipped);

        if (newFlipped.length === 2) {
            setMoves(moves + 1);
            const [first, second] = newFlipped;
            if (cards[first].emoji === cards[second].emoji) {
                setSolved([...solved, first, second]);
                setFlipped([]);
            } else {
                setTimeout(() => setFlipped([]), 1000);
            }
        }
    };

    const isWon = solved.length === cards.length && cards.length > 0;

    return { cards, flipped, solved, moves, handleClick, isWon };
}