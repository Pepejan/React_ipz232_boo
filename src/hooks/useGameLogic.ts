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

    useEffect(() => {
        if (flipped.length === 2) {
            const [first, second] = flipped;
            if (cards[first]?.emoji !== cards[second]?.emoji) {
                const timeout = setTimeout(() => setFlipped([]), flipSpeed);
                return () => clearTimeout(timeout);
            }
        }
    }, [flipped, cards, flipSpeed]);

    const flipCard = (id: number) => {
        setFlipped(prev => [...prev, id]);
    };

    const markAsSolved = (first: number, second: number) => {
        setSolved(prev => [...prev, first, second]);
        setFlipped([]);
    };

    const incrementMoves = () => {
        setMoves(prev => prev + 1);
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

    return {
        cards,
        flipped,
        solved,
        moves,
        time,
        flipCard,
        markAsSolved,
        incrementMoves,
        isWon,
        resetGame
    };
}