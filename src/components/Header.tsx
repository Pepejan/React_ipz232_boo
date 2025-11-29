interface HeaderProps {
    title?: string;
}

export default function Header({ title }: HeaderProps) {
    return <header className="header">{title || "🎯 Emoji Match Game"}</header>;
}
