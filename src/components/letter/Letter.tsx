import React, { useState } from 'react';
import {
  IconClose,
  IconImagePlus,
  IconImagePlusAqua,
  IconMike,
  IconMikeAqua,
  IconPlay,
  IconStop,
} from 'src/assets/icons';
import { RHFInput, RHFTextArea } from '../hook-form';
// style
import styles from './styles.module.scss';
// component
import { IconButton } from '../button';
import ImageUpload from '../image-upload/ImageUpload';
// type
import { LetterType } from '../../types/letter';
import { Theme } from '../../types';
import { useAudio } from '../../hooks/useAudio';

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  type?: LetterType;
  fileInputRef: React.RefObject<HTMLInputElement>;
  mediaRecorderRef: React.RefObject<MediaRecorder | null>;
  audioChunks: Blob[];
  setAudioChunks: React.Dispatch<React.SetStateAction<Blob[]>>;
  className?: string;
  methods?: any;
}

const Letter = ({
  type = 'PRIMARY',
  fileInputRef,
  mediaRecorderRef,
  audioChunks,
  setAudioChunks,
  className,
  methods,
  ...other
}: Props) => {
  const classes = React.useCallback(() => {
    const classArr = [styles.container, styles[type]];
    if (className) classArr.push(className);
    return classArr.join(' ');
  }, [type, className]);

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  const {
    isPlaying,
    recording,
    audioDuration,
    handleRecordButtonClick,
    handlePlaybackButtonClick,
    handleStopButtonClick,
    handleDeleteAudio,
  } = useAudio({ mediaRecorderRef, audioChunks, setAudioChunks });

  return (
    <div className={classes()}>
      <div className={`${styles.top} ${styles.toFrom}`}>
        TO.
        <RHFInput name="title" placeholder="캡슐에게.." />
      </div>
      <ImageUpload fileInputRef={fileInputRef} />

      <div className={styles.contents}>
        <div className={styles.audio}>
          {recording && (
            <IconButton
              label="녹음 중지"
              onClick={handleStopButtonClick}
              theme="AQUA-gray"
              prevIcon={IconStop}
              full
            />
          )}
          {audioChunks.length > 0 && (
            <>
              <IconButton
                label={`재생 (${audioDuration})`}
                onClick={handlePlaybackButtonClick}
                theme="AQUA-gray"
                prevIcon={IconPlay}
                full
                disabled={isPlaying}
              />
              <IconClose onClick={handleDeleteAudio} />
            </>
          )}
        </div>
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
