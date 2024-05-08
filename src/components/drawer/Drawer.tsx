import React from 'react';
import { createPortal } from 'react-dom';
import styles from './styles.module.scss';

const drawerRoot = document.getElementById('drawer-root')!;

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  open: boolean;
  onClose: () => void;
}

const Drawer = ({ children, open, onClose, ...other }: Props) => {
  const bgRef = React.useRef<HTMLDivElement>(null);
  const drawerRef = React.useRef<HTMLDivElement>(null);

  const onBackgroundClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === bgRef.current) {
      drawerRef.current!.style.animation = `${styles.rightOut} 0.2s ease forwards`;
      drawerRef.current!.onanimationend = () => onClose();
    }
  };

  const onkeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Escape') {
      onClose();
    }
  };

  if (!open) return null;

  return createPortal(
    <div
      ref={bgRef}
      tabIndex={0}
      role="button"
      onKeyDown={onkeyDown}
      onClick={onBackgroundClick}
      className={styles.drawerContainer}
    >
      <div ref={drawerRef} className={styles.drawerBox} {...other}>
        {children}
      </div>
    </div>,
    drawerRoot
  );
};

export default Drawer;
