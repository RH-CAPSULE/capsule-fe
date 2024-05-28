import React, { useState } from 'react';
import { useFormContext } from 'react-hook-form';

interface props {
  audioChunks: Blob[];
  setAudioChunks: React.Dispatch<React.SetStateAction<Blob[]>>;
}

export const useAudio = ({ audioChunks, setAudioChunks }: props) => {
  const [recording, setRecording] = useState(false);
  const [audioDuration, setAudioDuration] = useState<string>('00:00');
  const [isPlaying, setIsPlaying] = useState(false);
  const { watch } = useFormContext();
  const recodeRef = watch('recodeRef');

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
          setAudioChunks((prevChunks) => [...prevChunks, event.data]);
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
    setAudioChunks([]);
    setAudioDuration('00:00');
  };

  return {
    isPlaying,
    recording,
    audioDuration,
    handleRecordButtonClick,
    handlePlaybackButtonClick,
    handleStopButtonClick,
    handleDeleteAudio,
  };
};
