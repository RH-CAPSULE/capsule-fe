import { useSnackbar } from 'notistack';
import React from 'react';

const useRecording = () => {
  const { enqueueSnackbar } = useSnackbar();

  const [isRecording, setIsRecording] = React.useState(false);
  const [time, setTime] = React.useState<number>(0);
  const [audioUrl, setAudioUrl] = React.useState<string | null>(null);
  const [audioBlob, setAudioBlob] = React.useState<Blob | null>(null);
  const mediaRecorderRef = React.useRef<MediaRecorder | null>(null);
  const audioChunks = React.useRef<Blob[]>([]);
  const timerRef = React.useRef<NodeJS.Timeout | null>(null);

  // 녹음 시작
  const startRecording = async () => {
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      console.error('MediaDevices API not supported in this browser');
      enqueueSnackbar('마이크를 사용할 수 없습니다.', { variant: 'error' });
      return;
    }

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });

      audioChunks.current = []; // 초기화
      mediaRecorderRef.current = new MediaRecorder(stream);
      mediaRecorderRef.current.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunks.current.push(event.data);
        }
      };

      mediaRecorderRef.current.start();
      setIsRecording(true);
      setTime(0); // 타이머 초기화

      // 타이머 시작
      timerRef.current = setInterval(() => {
        setTime((prevTime) => prevTime + 1);
      }, 1000);

      console.log('Recording started...');
    } catch (error) {
      console.error('Failed to start recording:', error);
      enqueueSnackbar(
        '녹음 시작 중 오류가 발생했습니다. 개발자에게 문의해주세요.',
        {
          variant: 'error',
        }
      );
      setIsRecording(false);
    }
  };

  // 녹음 종료
  const stopRecording = async () => {
    return new Promise<Blob | null>((resolve) => {
      if (mediaRecorderRef.current) {
        // onstop 이벤트 핸들러 정의
        mediaRecorderRef.current.onstop = () => {
          console.log('Recording stopped.');

          // Blob 생성
          if (audioChunks.current.length > 0) {
            const blob = new Blob(audioChunks.current, { type: 'audio/wav' });
            const url = URL.createObjectURL(blob);
            setAudioUrl(url);
            setAudioBlob(blob);
            resolve(blob); // Promise 완료
          } else {
            resolve(null); // 데이터가 없으면 null 반환
          }
        };

        // 녹음 중단
        mediaRecorderRef.current.stop();

        // 스트림 정리
        mediaRecorderRef.current.stream
          .getTracks()
          .forEach((track) => track.stop());
        mediaRecorderRef.current = null; // MediaRecorder 해제
      } else {
        resolve(null); // MediaRecorder가 없으면 null 반환
      }

      setIsRecording(false); // 상태 업데이트

      // 타이머 정지
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    });
  };

  // 녹음 파일 다운로드
  const downloadRecording = () => {
    if (audioUrl) {
      const link = document.createElement('a');
      link.href = audioUrl;
      link.download = 'recording.wav';
      link.click();
    }
  };

  const initRecording = () => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
      mediaRecorderRef.current = null;
    }
    setIsRecording(false);
    setAudioUrl(null);
    setAudioBlob(null);
    audioChunks.current = [];

    // 타이머 초기화
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
    setTime(0);
  };

  // 컴포넌트 언마운트 시 URL 해제
  React.useEffect(() => {
    return () => {
      if (audioUrl) URL.revokeObjectURL(audioUrl);
      if (timerRef.current) clearInterval(timerRef.current); // 타이머 정리
    };
  }, [audioUrl]);

  return {
    time,
    audioUrl,
    audioBlob,
    isRecording,
    stopRecording,
    initRecording,
    startRecording,
    downloadRecording,
  };
};

export default useRecording;
