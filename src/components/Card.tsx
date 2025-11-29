interface CardProps {
    symbol: string;
    onClick: () => void;
    isFlipped: boolean;
}

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