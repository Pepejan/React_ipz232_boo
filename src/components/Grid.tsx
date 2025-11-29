import Card from "./Card";

export default function Grid() {
    return (
        <div className="grid">
            {[...Array(8)].map((_, i) => (
                <Card key={i} symbol="❓" />
            ))}
        </div>
    );
}
