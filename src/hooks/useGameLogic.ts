import { useState, useEffect } from "react";

interface Card {
    id: number;
    emoji: string;
}

export function useGameLogic(emojis: string[], flipSpeed: number = 1000) {
    const [cards, setCards] = useState<Card[]>([]);
    const [flipped, setFlipped] = useState<number[]>([]);
    const [solved, setSolved] = useState<number[]>([]);
    const [moves, setMoves] = useState(0);
    const [time, setTime] = useState(0);

    useEffect(() => {
        const shuffled = [...emojis, ...emojis]
            .sort(() => Math.random() - 0.5)
            .map((emoji, index) => ({ id: index, emoji }));
        setCards(shuffled);
        setFlipped([]);
        setSolved([]);
        setMoves(0);
        setTime(0);
    }, [emojis]);

    // Timer
    useEffect(() => {
        if (cards.length > 0 && solved.length < cards.length) {
            const timer = setInterval(() => {
                setTime(t => t + 1);
            }, 1000);
            return () => clearInterval(timer);
        }
    }, [cards, solved]);

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
                setTimeout(() => setFlipped([]), flipSpeed);
            }
        }
    };

    const resetGame = () => {
        const shuffled = [...emojis, ...emojis]
            .sort(() => Math.random() - 0.5)
            .map((emoji, index) => ({ id: index, emoji }));
        setCards(shuffled);
        setFlipped([]);
        setSolved([]);
        setMoves(0);
        setTime(0);
    };

    const isWon = solved.length === cards.length && cards.length > 0;

    return { cards, flipped, solved, moves, time, handleClick, isWon, resetGame };
}