import Header from "../components/Header";
import Button from "../components/Button";

interface StartPageProps {
    onStart: () => void;
}

export default function StartPage({ onStart }: StartPageProps) {
    return (
        <div className="page">
            <Header />
            <p className="text">Welcome to Emoji Match! Test your memory 🧠</p>
            <Button text="Start Game" onClick={onStart} />
        </div>
    );
}
