/**
 * @module Button
 * @category Components
 */

/**
 * Props for the {@link Button} component.
 */
interface ButtonProps {
    text: string;
    onClick?: () => void;
}

/**
 * A simple reusable button component used for actions and navigation.
 *
 * Applies the global `.btn` CSS class for consistent styling.
 *
 * @param props - {@link ButtonProps}
 *
 * @example
 * ```tsx
 * <Button text="Play Again" onClick={() => restartGame()} />
 * ```
 */
export default function Button({ text, onClick }: ButtonProps) {
    return (
        <button className="btn" onClick={onClick}>
            {text}
        </button>
    );
}