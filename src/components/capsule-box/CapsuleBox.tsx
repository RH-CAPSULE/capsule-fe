import React from 'react';
import { IconCapsuleBox, IconCapsuleBoxOpen } from 'src/assets/icons';
import { px, themeColor } from 'src/utils/styles';
import { ICapsuleBox } from 'src/types/capsule';
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

  const isOpen = new Date() <= new Date(closedAt);

  return (
    <div className={styles.capsuleBox} {...other}>
      {isOpen ? (
        <IconCapsuleBoxOpen fill={boxColor} />
      ) : (
        <IconCapsuleBox fill={boxColor} />
      )}
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
