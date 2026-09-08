import { useEffect } from "react";
import type { ReactNode } from "react";
import { createPortal } from "react-dom";
interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: ReactNode;
  footer?: ReactNode;
}

function Modal({ isOpen, onClose, title, children, footer }: ModalProps) {
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-soil-900/40" onClick={onClose} aria-hidden="true" />
      <div
        role="dialog"
        aria-modal="true"
        aria-label={title}
        className="relative z-10 w-full max-w-md rounded-2xl bg-white shadow-lg"
      >
        {title && (
          <div className="flex items-center justify-between border-b border-farm-100 px-4 py-3">
            <h2 className="font-display text-base font-semibold text-farm-900">{title}</h2>
            <button
              onClick={onClose}
              aria-label="Đóng"
              className="text-soil-400 hover:text-soil-600"
            >
              ✕
            </button>
          </div>
        )}
        <div className="px-4 py-4">{children}</div>
        {footer && (
          <div className="flex justify-end gap-2 border-t border-farm-100 px-4 py-3">
            {footer}
          </div>
        )}
      </div>
    </div>,
    document.body
  );
}

export default Modal;