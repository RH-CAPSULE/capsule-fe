import React from 'react';

interface Props {
  audioUrl: string | null;
}

const useAudio = ({ audioUrl }: Props) => {
  const [time, setTime] = React.useState(0); // 현재 재생 시간
  const [duration, setDuration] = React.useState(0); // 오디오 총 길이
  const [isPlaying, setIsPlaying] = React.useState(false);

  const audioRef = React.useRef<HTMLAudioElement | null>(null);

  // 오디오 초기화
  React.useEffect(() => {
    if (!audioUrl) return;
    const audio = new Audio(audioUrl);
    audioRef.current = audio;

    const handleLoadedMetadata = () => {
      setDuration(audio.duration); // 총 길이 설정
    };

    const handleTimeUpdate = () => {
      setTime(audio.currentTime); // 현재 재생 시간 업데이트
    };

    const handleEnded = () => {
      setIsPlaying(false);
      setTime(0);
    };

    // 이벤트 리스너 등록
    audio.addEventListener('loadedmetadata', handleLoadedMetadata);
    audio.addEventListener('timeupdate', handleTimeUpdate);
    audio.addEventListener('ended', handleEnded);

    // 정리 작업
    return () => {
      audio.pause();
      audio.currentTime = 0;
      audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
      audio.removeEventListener('timeupdate', handleTimeUpdate);
      audio.removeEventListener('ended', handleEnded);
      audioRef.current = null;
    };
  }, [audioUrl]);

  // 재생 핸들러
  const handlePlay = () => {
    if (audioRef.current) {
      audioRef.current.play();
      setIsPlaying(true);
    }
  };

  // 일시 정지 핸들러
  const handlePause = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      setIsPlaying(false);
    }
  };

  // 정지 핸들러
  const handleStop = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      setIsPlaying(false);
      setTime(0);
    }
  };

  return {
    time, // 현재 재생 시간
    duration, // 오디오 총 길이
    isPlaying, // 재생 상태
    handlePlay, // 재생 함수
    handlePause, // 일시 정지 함수
    handleStop, // 정지 함수
  };
};

export default useAudio;
