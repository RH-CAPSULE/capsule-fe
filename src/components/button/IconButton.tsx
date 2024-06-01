import React from 'react';
import { ThemeType } from 'src/types/theme';
import styles from './styles.module.scss';
import { Loading } from '../loading';

/**
 * @description 아이콘이 포함된 버튼 컴포넌트
 */

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  type?: 'button' | 'submit' | 'reset';
  size?: 'small' | 'medium' | 'large';
  full?: boolean;
  theme?: ThemeType | string;
  loading?: boolean;
  className?: string;
  prevIcon?: React.ComponentType;
  icon?: React.ComponentType;
  label?: string;
}

const IconButton = ({
  type = 'button',
  size = 'medium',
  theme = '',
  full = false,
  loading = false,
  children,
  className = '',
  prevIcon: PrevIcon,
  icon: Icon,
  label = '',
  ...other
}: Props) => {
  const classes = React.useCallback(() => {
    const classArr = [
      styles.button,
      styles[size],
      styles[className],
      styles.iconButton,
    ];
    if (full) classArr.push(styles.full);

    return classArr.join(' ');
  }, [full, size, className]);

  return (
    <button
      // eslint-disable-next-line react/button-has-type
      type={type || 'button'}
      className={classes()}
      {...other}
      data-loading={loading}
      data-theme={theme}
    >
      {PrevIcon && <PrevIcon />}
      {label}
      {Icon && <Icon />}
      {loading ? <Loading /> : children}
    </button>
  );
};

export default IconButton;
