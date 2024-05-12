import React from 'react';
import { ThemeType } from 'src/types/theme';
import styles from './styles.module.scss';
import { Loading } from '../loading';

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  type?: 'button' | 'submit' | 'reset';
  size?: 'small' | 'medium' | 'large';
  full?: boolean;
  theme?: ThemeType | string;
  loading?: boolean;
  className?: string;
}

const Button = ({
  type = 'button',
  size = 'medium',
  theme = '',
  full = false,
  loading = false,
  children,
  className = '',
  ...other
}: Props) => {
  const classes = React.useCallback(() => {
    const classArr = [styles.button, styles[size]];
    if (full) classArr.push(styles.full);
    if (className) classArr.push(className);

    return classArr.join(' ');
  }, [full, size, className]);

  return (
    <button
      // eslint-disable-next-line react/button-has-type
      type={type}
      className={classes()}
      {...other}
      data-loading={loading}
      data-theme={theme}
    >
      {loading ? <Loading /> : children}
    </button>
  );
};

export default Button;
