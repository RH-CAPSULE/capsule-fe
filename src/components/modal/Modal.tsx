import React from 'react';
import styles from './styles.module.scss';

interface ModalProps extends React.HTMLAttributes<HTMLDivElement> {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

/**
 * @example
 * <Modal open={open} onClose={onClose}>
 *   <Modal.Title>Test</Modal.Title>
 *   <Modal.Content>Hi!</Modal.Content>
 *   <Modal.Action>
 *     <Button onClick={() => setOpen(false)}>Close</Button>
 *   </Modal.Action>
 * </Modal>
 */
const Modal = ({ open, onClose, children, ...other }: ModalProps) => {
  const bgRef = React.useRef<HTMLDivElement>(null);
  const modalRef = React.useRef<HTMLDivElement>(null);

  const [innerOpenState, setInnerOpenState] = React.useState(false);

  const onBackgroundClick = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    if (e.target === bgRef.current) {
      onClose();
    }
  };

  const onkeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Escape') {
      onClose();
    }
  };

  React.useEffect(() => {
    if (open) {
      setInnerOpenState(open);
    } else {
      if (!modalRef.current) return;
      modalRef.current.style.animation = `${styles.fadeOut} 0.2s ease forwards`;
      modalRef.current.onanimationend = () => {
        setInnerOpenState(false);
        modalRef.current!.onanimationend = null;
      };
    }
  }, [open]);

  if (!innerOpenState) return null;

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

interface ModalActionProps {
  children: React.ReactNode;
}

Modal.Action = ({ children }: ModalActionProps) => {
  return <div className={styles.modalAction}>{children}</div>;
};

// ----------------------------------------------------------------------

export default Modal;
