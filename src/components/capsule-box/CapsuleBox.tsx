import React from 'react';
import { IconCapsuleBox, IconCapsuleBoxOpen } from 'src/assets/icons';
import { isDarkColor, px, themeColor } from 'src/utils/styles';
import { ICapsuleBox } from 'src/types/capsule';
import { isFuture, isPast } from 'date-fns';
import styles from './styles.module.scss';
import Capsule from '../capsule/Capsule';

type Props = ICapsuleBox & React.HTMLAttributes<HTMLDivElement>;

const CapsuleBox = ({
  theme,
  closedAt,
  openedAt,
  capsules = [],
  ...other
}: Props) => {
  const boxColor = themeColor(theme);

  // 열렸거나 봉인되기 전
  const isOpened = isPast(new Date(openedAt)) || isFuture(new Date(closedAt));

  return (
    <div className={styles.capsuleBox} {...other}>
      {isOpened ? (
        <IconCapsuleBoxOpen fill={boxColor} />
      ) : (
        <IconCapsuleBox fill={boxColor} />
      )}
      <div
        className={`${styles.textBox} ${isDarkColor(boxColor) ? styles.dark : ''}`}
      >
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
      <div className={styles.capsules}>
        {capsules.map((color, i) => (
          <Capsule
            key={i}
            color={color}
            width={px(80)}
            className={styles.capsule}
          />
        ))}
      </div>
    </div>
  );
};

export default CapsuleBox;
