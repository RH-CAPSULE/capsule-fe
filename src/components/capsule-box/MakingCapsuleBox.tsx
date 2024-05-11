import React from 'react';
import { IconCapsuleBoxOpen } from 'src/assets/icons';
import { themeColor } from 'src/utils/styles';
import { Theme } from 'src/types/theme';
import styles from './styles.module.scss';

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  theme: Theme;
  openedAt: string | null;
  closedAt: string | null;
}

const MakingCapsuleBox = ({ theme, closedAt, openedAt, ...other }: Props) => {
  const boxColor = themeColor(theme);

  return (
    <div
      className={`${styles.capsuleBox} ${styles.makingCapsuleBox}`}
      {...other}
    >
      <IconCapsuleBoxOpen fill={boxColor} />
      <div className={styles.textBox}>
        {closedAt && (
          <p>
            봉인일자
            <br />[{closedAt}]
          </p>
        )}
        {openedAt && (
          <p>
            개봉일자
            <br />[{openedAt}]
          </p>
        )}
      </div>
    </div>
  );
};

export default MakingCapsuleBox;
