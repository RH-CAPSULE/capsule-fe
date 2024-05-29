import React, { forwardRef, useImperativeHandle, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { IconClose, IconPlay, IconStop } from 'src/assets/icons';

import styles from './styles.module.scss';
import { IconButton } from '../button';

const AudioUpload = forwardRef((props, ref) => {
  const { watch, getValues, setValue } = useFormContext();
  const [recording, setRecording] = useState(false);
  const [audioDuration, setAudioDuration] = useState<string>('00:00');
  const [isPlaying, setIsPlaying] = useState(false);

  const recodeRef = watch('recodeRef');
  const audioChunks = watch('audioChunks') || [];
  const audioButtonRef = watch('audioButtonRef');

  const handleRecordButtonClick = async () => {
    if (audioChunks.length > 0) return;
    if (!recording) {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          audio: true,
        });
        const recorder = new MediaRecorder(stream);
        // @ts-ignore
        recodeRef.current = recorder;
        const startTime = Date.now();
        recodeRef.current.addEventListener('dataavailable', (event: any) => {
          const prevChunks = getValues('audioChunks') || [];

          setValue('audioChunks', [...prevChunks, event.data]);
          const endTime = Date.now();
          const duration = new Date(endTime - startTime);
          const minutes = duration.getUTCMinutes().toString().padStart(2, '0');
          const seconds = duration.getUTCSeconds().toString().padStart(2, '0');
          setAudioDuration(`${minutes}:${seconds}`);
        });
        recodeRef.current.start();
        setRecording(true);
      } catch (error) {
        console.error('Error accessing microphone:', error);
      }
    } else {
      recodeRef.current?.stop();
      setRecording(false);
    }
  };

  const handlePlaybackButtonClick = () => {
    if (audioChunks.length === 0 || isPlaying) return;
    const audioBlob = new Blob(audioChunks, { type: 'audio/wav' });
    const audioURL = URL.createObjectURL(audioBlob);
    const audio = new Audio(audioURL);
    setIsPlaying(true);
    audio.play();
    audio.addEventListener('ended', () => {
      setIsPlaying(false);
    });
  };

  const handleStopButtonClick = () => {
    recodeRef.current?.stop();
    setRecording(false);
  };
  const handleDeleteAudio = () => {
    setValue('audioChunks', []);
    setAudioDuration('00:00');
  };

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
