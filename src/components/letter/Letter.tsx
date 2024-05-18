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
import { RHFInput, RHFTextArea } from '../hook-form';
// style
import styles from './styles.module.scss';
// component
import { IconButton } from '../button';
import ImageUpload from '../image-upload/ImageUpload';
// type
import { LetterType, Letters } from '../../types/letter';
import { Theme } from '../../types';

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  type?: LetterType;
  fileInputRef: React.RefObject<HTMLInputElement>;
  mediaRecorderRef: React.RefObject<MediaRecorder | null>;
  audioChunks: Blob[];
  setAudioChunks: React.Dispatch<React.SetStateAction<Blob[]>>;
  className?: string;
}

const Letter = ({
  type = 'PRIMARY',
  fileInputRef,
  mediaRecorderRef,
  audioChunks,
  setAudioChunks,
  className,
  ...other
}: Props) => {
  const [imageUploaded, setImageUploaded] = useState(false); // 이미지가 업로드되었는지 여부
  const [recording, setRecording] = useState(false);
  const [audioDuration, setAudioDuration] = useState<string>('00:00');

  const classes = React.useCallback(() => {
    const classArr = [styles.container, styles[type]];
    if (className) classArr.push(className);

    return classArr.join(' ');
  }, [type, className]);

  const handleImageUpload = () => {
    setImageUploaded(true);
  };
  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  // 리팩터링 필요

  const handleRecordButtonClick = async () => {
    if (!recording) {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          audio: true,
        });
        const recorder = new MediaRecorder(stream);
        // @ts-ignore
        mediaRecorderRef.current = recorder;
        const startTime = Date.now();
        mediaRecorderRef.current.addEventListener('dataavailable', (event) => {
          setAudioChunks((prevChunks) => [...prevChunks, event.data]);
          const endTime = Date.now();
          const duration = new Date(endTime - startTime);
          const minutes = duration.getUTCMinutes().toString().padStart(2, '0');
          const seconds = duration.getUTCSeconds().toString().padStart(2, '0');
          setAudioDuration(`${minutes}:${seconds}`);
        });
        mediaRecorderRef.current.start();
        setRecording(true);
      } catch (error) {
        console.error('Error accessing microphone:', error);
      }
    } else {
      mediaRecorderRef.current?.stop();
      setRecording(false);
    }
  };

  const handlePlaybackButtonClick = () => {
    const audioBlob = new Blob(audioChunks, { type: 'audio/wav' });
    const audioURL = URL.createObjectURL(audioBlob);
    const audio = new Audio(audioURL);
    audio.play();
  };

  const handleStopButtonClick = () => {
    mediaRecorderRef.current?.stop();
    setRecording(false);
  };

  return (
    <div className={classes()}>
      <div className={`${styles.top} ${styles.toFrom}`}>
        TO..
        <RHFInput name="title" placeholder="캡슐에게.." />
      </div>
      <ImageUpload fileInputRef={fileInputRef} onUpload={handleImageUpload} />

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
            <IconButton
              label={`재생 (${audioDuration})`}
              onClick={handlePlaybackButtonClick}
              theme="AQUA-gray"
              prevIcon={IconPlay}
              full
            />
          )}
        </div>
        <RHFTextArea
          name="content"
          placeholder="내용을 입력해주세요."
          style={{ height: imageUploaded ? '200px' : '420px' }}
        />
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
          From..
          <RHFInput name="writer" placeholder="캡슐이가" />
        </div>
      </div>
    </div>
  );
};

export default Letter;
