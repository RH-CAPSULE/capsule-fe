import React from 'react';
import styles from './styles.module.scss';

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  // add props
}

const Button = ({ children, className = '', ...other }: Props) => {
  return (
    <button className={`${styles.button} ${className}`} {...other}>
      {children}
    </button>
  );
};

export default Button;
