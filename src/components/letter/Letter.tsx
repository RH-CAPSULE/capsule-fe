import React, { useRef, useState } from 'react';
import {
  IconClose,
  IconImagePlus,
  IconImagePlusAqua,
  IconMike,
  IconMikeAqua,
  IconPlay,
  IconStop,
} from 'src/assets/icons';
import { useFormContext } from 'react-hook-form';
import { RHFInput, RHFTextArea } from '../hook-form';
// style
import styles from './styles.module.scss';
// component
import { IconButton } from '../button';
import ImageUpload from '../image-upload/ImageUpload';
// type
import { LetterType } from '../../types/letter';
import { Theme } from '../../types';
import AudioUpload from '../audio-upload/ImageUpload';

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  type?: LetterType;
  className?: string;
  methods?: any;
}

const Letter = ({ type = 'PRIMARY', className, methods, ...other }: Props) => {
  const { watch } = useFormContext();
  const audioButtonRef = watch('audioButtonRef');

  const classes = React.useCallback(() => {
    const classArr = [styles.container, styles[type]];
    if (className) classArr.push(className);
    return classArr.join(' ');
  }, [type, className]);

  const handleButtonClick = () => {
    const fileInputRef = watch('fileInputRef');
    fileInputRef.current?.click();
  };
  const handleRecordButtonClick = () => {
    // @ts-ignore
    audioButtonRef?.current?.triggerRecord();
  };

  return (
    <div className={classes()}>
      <div className={`${styles.top} ${styles.toFrom}`}>
        TO.
        <RHFInput name="title" placeholder="캡슐에게.." />
      </div>
      <ImageUpload />
      <div className={styles.contents}>
        <AudioUpload />
        <div className={styles.textarea}>
          <RHFTextArea name="content" placeholder="내용을 입력해주세요." />
        </div>
      </div>

      <div className={styles.bottom}>
        <IconButton
          label="이미지 첨부"
          theme={type === 'PRIMARY' ? '' : Theme.AQUA}
          className="image"
          prevIcon={type === 'PRIMARY' ? IconImagePlusAqua : IconImagePlus}
          onClick={handleButtonClick}
        />
        <IconButton
          theme={type === 'PRIMARY' ? '' : Theme.AQUA}
          className="image"
          prevIcon={type === 'PRIMARY' ? IconMikeAqua : IconMike}
          onClick={handleRecordButtonClick}
        />
        <div className={`${styles.toFrom} ${styles.right}`}>
          From.
          <RHFInput name="writer" placeholder="캡슐이가" />
        </div>
      </div>
    </div>
  );
};

export default Letter;
