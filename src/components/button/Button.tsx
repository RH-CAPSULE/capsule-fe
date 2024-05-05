import React from 'react';
import styles from './styles.module.scss';

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  type?: 'button' | 'submit' | 'reset';
  // add props
}

const Button = ({ children, className = '', type = 'button', ...other }: Props) => (
  // eslint-disable-next-line react/button-has-type
  <button type={type} className={`${styles.button} ${className}`} {...other}>
    {children}
  </button>
);

export default Button;
