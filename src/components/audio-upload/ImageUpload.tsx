import React, {
  forwardRef,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';
import { useFormContext } from 'react-hook-form';
import { IconClose, IconPlay, IconStop } from 'src/assets/icons';

import styles from './styles.module.scss';
import { IconButton } from '../button';
import { useAudio } from '../../hooks/useAudio';

const AudioUpload = forwardRef((props, ref) => {
  const { register, watch, setValue } = useFormContext();
  const audioChunks = watch('audioChunks');
  const audioButtonRef = watch('audioButtonRef');

  const {
    isPlaying,
    recording,
    audioDuration,
    handleRecordButtonClick,
    handlePlaybackButtonClick,
    handleStopButtonClick,
    handleDeleteAudio,
  } = useAudio();

  useImperativeHandle(audioButtonRef, () => ({
    triggerRecord: handleRecordButtonClick,
  }));

  return (
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
  );
});

export default AudioUpload;
