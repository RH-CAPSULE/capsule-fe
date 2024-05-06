import React from 'react';
import { Theme } from 'src/types/theme';
import styles from './styles.module.scss';
import { Loading } from '../loading';

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  loading?: boolean;
  type?: 'button' | 'submit' | 'reset';
  theme?: Theme | string;
}

const Button = ({
  children,
  theme = '',
  loading = false,
  className = '',
  type = 'button',
  ...other
}: Props) => (
  <button
    // eslint-disable-next-line react/button-has-type
    type={type}
    className={`${styles.button} ${className}`}
    {...other}
    data-loading={loading}
    data-theme={theme}
  >
    {loading ? <Loading /> : children}
  </button>
);

export default Button;
