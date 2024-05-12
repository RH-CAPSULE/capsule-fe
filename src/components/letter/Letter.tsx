import React from 'react';

import {
  IconImagePlus,
  IconImagePlusAqua,
  IconMike,
  IconMikeAqua,
} from 'src/assets/icons';
import { RHFInput, RHFTextArea } from '../hook-form';

import styles from './styles.module.scss';

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
      <div className={`${styles.top} ${styles.toFrom}`}>TO..</div>
      <div className={styles.contents}>
        <RHFTextArea name="letter" placeholder="내용을 입력해주세요." />
      </div>
      <div className={styles.bottom}>
        {type === 'PRIMARY' ? (
          <>
            <IconButton
              label="이미지 첨부"
              theme="WHITE"
              className="image"
              prevIcon={IconImagePlusAqua}
            />
            <IconButton
              theme="WHITE"
              className="image"
              prevIcon={IconMikeAqua}
            />
          </>
        ) : (
          <>
            <IconButton
              label="이미지 첨부"
              theme="AQUA"
              className="image"
              prevIcon={IconImagePlus}
            />
            <IconButton theme="AQUA" className="image" prevIcon={IconMike} />
          </>
        )}
        <div className={`${styles.toFrom} ${styles.right}`}>From..</div>
      </div>
    </div>
  );
};

export default Letter;
