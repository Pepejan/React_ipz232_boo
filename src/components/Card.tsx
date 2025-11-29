interface CardProps {
    symbol?: string;
}

export default function Card({ symbol = "🙂" }: CardProps) {
    return <div className="card">{symbol}</div>;
}
