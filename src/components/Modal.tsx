/**
 * @module Modal
 * @category Components
 */

import { useEffect } from "react";
import { createPortal } from "react-dom";

/**
 * Props for the {@link Modal} component.
 */
interface ModalProps {
    isOpen: boolean;

    onClose: () => void;

    children: React.ReactNode;
}

/**
 * A generic overlay modal rendered via React Portal.
 *
 * - Mounts content directly on `document.body` to avoid z-index issues.
 * - Blocks body scroll (`overflow: hidden`) while open.
 * - Clicking the backdrop calls `onClose`; clicks inside the modal are stopped.
 *
 * @param props - {@link ModalProps}
 *
 * @example
 * ```tsx
 * <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
 *   <p>Modal content here</p>
 * </Modal>
 * ```
 */
export default function Modal({ isOpen, onClose, children }: ModalProps) {
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "unset";
        }

        return () => {
            document.body.style.overflow = "unset";
        };
    }, [isOpen]);

    if (!isOpen) return null;

    const modalContent = (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                {children}
            </div>
        </div>
    );

    return createPortal(modalContent, document.body);
}