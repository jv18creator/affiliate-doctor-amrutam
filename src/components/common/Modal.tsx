import { type ReactNode } from 'react';
import { createPortal } from 'react-dom';

interface ModalProps {
  open: boolean;
  onClose: () => void;
  children: ReactNode;
}

const Modal = ({ open, onClose, children }: ModalProps) => {
  if (!open) return null;

  return createPortal(
    <div className="fixed inset-0 z-99999 flex items-center justify-center pointer-events-auto">
      <div
        className="absolute inset-0 bg-[rgb(var(--color-overlay))]"
        aria-hidden="true"
        onClick={onClose}
      />

      <div className="relative z-100000 bg-surface rounded-3xl shadow-card max-w-md w-full mx-4 p-8">
        {children}
      </div>
    </div>,
    document.body,
  );
};

export default Modal;
