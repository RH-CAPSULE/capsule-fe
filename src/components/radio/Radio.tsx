import React from 'react';
import styles from './styles.module.scss';

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

const Radio = ({ label, name, ...other }: Props) => {
  return (
    <label className={styles.radio} htmlFor={`${label}-${name}`}>
      <input type="radio" id={`${label}-${name}`} name={name} {...other} />
      <span className={styles.checkmark}>{label}</span>
    </label>
  );
};

export default Radio;
