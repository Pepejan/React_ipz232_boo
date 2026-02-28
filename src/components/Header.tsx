/**
 * @module Header
 * @category Components
 */

/**
 * Props for the {@link Header} component.
 */
interface HeaderProps {
    title?: string;
}

/**
 * A simple page header that displays a title string.
 *
 * Used at the top of every page to provide context about the current view.
 *
 * @param props - {@link HeaderProps}
 *
 * @example
 * ```tsx
 * // Default title
 * <Header />
 *
 * // Custom title
 * <Header title="🎮 Game Time!" />
 * ```
 */
export default function Header({ title }: HeaderProps) {
    return <header className="header">{title || "🎯 Emoji Match Game"}</header>;
}