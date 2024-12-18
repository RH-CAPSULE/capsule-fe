import React from 'react';
import { Pause, Play } from 'lucide-react';
import { useFormContext } from 'react-hook-form';
import useAudio from 'src/hooks/use-audio';
import { IconClose } from 'src/assets/icons';
import styles from './styles.module.scss';

const formatTime = (seconds: number) => {
  const min = Math.floor(seconds / 60);
  const sec = Math.floor(seconds % 60);
  return `${min < 10 ? `0${min}` : min}:${sec < 10 ? `0${sec}` : sec}`;
};

const blobToUrl = (blob: Blob | null) => {
  if (!blob) return null;
  return URL.createObjectURL(blob);
};

const AudioView = () => {
  const { watch, setValue } = useFormContext();
  const audioBlob = watch('audioBlob');
  const [audioUrl, setAudioUrl] = React.useState<string | null>(
    blobToUrl(audioBlob)
  );
  const audioManager = useAudio({ audioUrl });
  console.log(audioUrl, audioBlob);
  const handleDelete = () => {
    setValue('audioBlob', null);
  };

  React.useEffect(() => {
    setAudioUrl(blobToUrl(audioBlob));
  }, [audioBlob]);

  if (!audioBlob) return null;

  return (
    <div className={styles.recordStatus}>
      {audioManager.isPlaying ? (
        <button type="button" onClick={audioManager.handlePause}>
          <Pause />
        </button>
      ) : (
        <button type="button" onClick={audioManager.handlePlay}>
          <Play />
        </button>
      )}
      <div className={styles.recordingAnimation} />
      <div className={styles.recordTime}>{formatTime(audioManager.time)}</div>
      <button
        type="button"
        className={styles.audioRemoveBtn}
        onClick={handleDelete}
      >
        <IconClose />
      </button>
    </div>
  );
};

export default AudioView;
