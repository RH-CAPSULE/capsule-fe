import React from 'react';
import { IconCapsuleBox, IconCapsuleBoxOpen } from 'src/assets/icons';
import { Theme } from 'src/types/theme';
import { themeColor } from 'src/utils/styles';
import styles from './styles.module.scss';

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  theme?: Theme;
  open: boolean;
  closedAt?: string;
  openedAt?: string;
}

const CapsuleBox = ({ theme, closedAt, open, openedAt, ...other }: Props) => {
  const color = themeColor(theme);

  return (
    <div className={styles.capsuleBox} {...other}>
      {open ? (
        <IconCapsuleBoxOpen fill={color} />
      ) : (
        <IconCapsuleBox fill={color} />
      )}
      <div className={styles.textBox}>
        {closedAt && <p>{closedAt}</p>}
        {openedAt && <p>{openedAt}</p>}
      </div>
    </div>
  );
};

export default CapsuleBox;
