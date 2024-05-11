import React from 'react';
import {
  IconArrowLeft,
  IconCapsuleBox,
  IconCapsuleBoxOpen,
  IconImagePlus,
  IconMike,
} from 'src/assets/icons';
import { px, themeColor } from 'src/utils/styles';
import { ICapsuleBox } from 'src/types/capsule';
import styles from './styles.module.scss';
import Capsule from '../capsule/Capsule';
import { Theme } from '../../types/theme';
import { RHFInput, RHFTextArea } from '../hook-form';
import { IconButton } from '../button';

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  type?: 'PRIMARY' | 'LETTER' | 'BORDER';
  loading?: boolean;
  className?: string;
}

const Letter = ({ type = 'PRIMARY', className, ...other }: Props) => {
  const classes = React.useCallback(() => {
    const classArr = [styles.container, styles[type]];
    if (className) classArr.push(className);

    return classArr.join(' ');
  }, [type, className]);

  return (
    <div className={classes()}>
      <div className={styles.top}>TO..</div>
      <div className={styles.contents}>
        <RHFTextArea name="letter" placeholder="내용을 입력해주세요." />
      </div>
      <div className={styles.bottom}>
        <IconButton
          label="이미지 첨부"
          theme="AQUA"
          className="image"
          prevIcon={IconImagePlus}
        />
        <IconButton theme="AQUA" className="image" prevIcon={IconMike} />
        <div className={`${styles.top} ${styles.right}`}>From..</div>
      </div>
    </div>
  );
};

export default Letter;
