import React from 'react';
import { IconCapsuleBox, IconCapsuleBoxOpen } from 'src/assets/icons';
import { isDarkColor, em, themeColor } from 'src/utils/styles';
import { ICapsuleBox } from 'src/types/capsule';
import { isFuture, isPast } from 'date-fns';
import styles from './styles.module.scss';
import Capsule from '../capsule/Capsule';
import { capsuleCoordinates } from './coordinates';

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
        <Capsules capsules={capsules} />
      </div>
    </div>
  );
};

export default CapsuleBox;

// ----------------------------------------------------------------------
const Capsules = React.memo(({ capsules }: Pick<ICapsuleBox, 'capsules'>) => {
  return (
    <div className={styles.capsules}>
      {capsules.map((color, i) => {
        const { x, y, rotate } = capsuleCoordinates[i];
        return (
          <Capsule
            key={i}
            color={color}
            width={em(100)}
            className={styles.capsule}
            style={{
              left: em(x),
              bottom: em(y),
              transform: `rotate(${rotate}deg)`,
            }}
          />
        );
      })}
    </div>
  );
});
