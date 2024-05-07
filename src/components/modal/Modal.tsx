import React from 'react';
import styles from './styles.module.scss';

interface ModalProps extends React.HTMLAttributes<HTMLDivElement> {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const Modal = ({ open, onClose, children, ...other }: ModalProps) => {
  const bgRef = React.useRef<HTMLDivElement>(null);
  const modalRef = React.useRef<HTMLDivElement>(null);

  const onBackgroundClick = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    if (e.target === bgRef.current) {
      modalRef.current!.style.animation = `${styles.fadeOut} 0.2s ease forwards`;
      modalRef.current!.onanimationend = () => onClose();
    }
  };

  const onkeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Escape') {
      onClose();
    }
  };

  if (!open) return null;

  return (
    <div
      ref={bgRef}
      tabIndex={0}
      role="button"
      onKeyDown={onkeyDown}
      onClick={onBackgroundClick}
      className={styles.modalContainer}
    >
      <div ref={modalRef} className={styles.modalBox} {...other}>
        {children}
      </div>
    </div>
  );
};

// ----------------------------------------------------------------------

interface ModalTitleProps {
  children: React.ReactNode;
}

Modal.Title = ({ children }: ModalTitleProps) => {
  return <div className={styles.modalTitle}>{children}</div>;
};

// ----------------------------------------------------------------------

interface ModalContentProps {
  children: React.ReactNode;
}

Modal.Content = ({ children }: ModalContentProps) => {
  return <div className={styles.modalContent}>{children}</div>;
};

// ----------------------------------------------------------------------

Modal.Action = () => {
  return <div>Modal Action</div>;
};

// ----------------------------------------------------------------------

export default Modal;
