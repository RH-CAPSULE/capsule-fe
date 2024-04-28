import React from 'react';
import styles from './styles.module.scss';

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  // add props
}

const Input = ({ className = '', ...other }: Props) => {
  return <input className={`${styles.input} ${className}`} {...other} />;
};

export default Input;
