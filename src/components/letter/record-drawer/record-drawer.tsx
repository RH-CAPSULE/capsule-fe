import { Drawer } from 'src/components/drawer';
import { Disc, Pause, Play, RotateCcw, Square } from 'lucide-react';
import useAudio from 'src/hooks/use-audio';
import useRecording from 'src/hooks/use-recording';
import { useFormContext } from 'react-hook-form';
import styles from './styles.module.scss';

const formatTime = (seconds: number) => {
  const min = Math.floor(seconds / 60);
  const sec = Math.floor(seconds % 60);
  return `${min < 10 ? `0${min}` : min}:${sec < 10 ? `0${sec}` : sec}`;
};

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const RecordDrawer = ({ isOpen, onClose }: Props) => {
  const { setValue } = useFormContext();
  const recordManager = useRecording();
  const audioManager = useAudio({ audioUrl: recordManager.audioUrl });

  const isRecorded = !!recordManager.audioUrl;

  const renderRecordButton = () => {
    if (isRecorded) {
      return (
        <button
          type="button"
          className={styles.recordButton}
          onClick={recordManager.initRecording}
        >
          <RotateCcw />
        </button>
      );
    }
    if (recordManager.isRecording) {
      return (
        <button
          type="button"
          className={styles.recordButton}
          onClick={recordManager.stopRecording}
        >
          <Square />
        </button>
      );
    }
    return (
      <button
        type="button"
        className={styles.recordButton}
        onClick={recordManager.startRecording}
      >
        <Disc />
      </button>
    );
  };

  const handleCancel = () => {
    recordManager.initRecording();
    audioManager.handleStop();
    onClose();
  };

  const handleSave = () => {
    recordManager.initRecording();
    audioManager.handleStop();
    setValue('audioBlob', recordManager.audioBlob);
    onClose();
  };

  return (
    <Drawer
      open={isOpen}
      onClose={onClose}
      direction="bottom"
      style={{ maxHeight: '30vh', minHeight: '30vh', display: 'flex' }}
    >
      <div className={styles.drawerContainer}>
        <div className={styles.drawerHeader}>음성 메시지</div>
        <div className={styles.drawerBody}>
          <div className={styles.recordStatus}>
            {isRecorded &&
              (audioManager.isPlaying ? (
                <button type="button" onClick={audioManager.handlePause}>
                  <Pause />
                </button>
              ) : (
                <button type="button" onClick={audioManager.handlePlay}>
                  <Play />
                </button>
              ))}
            <div className={styles.recordingAnimation} />
            <div className={styles.recordTime}>
              {audioManager.isPlaying
                ? formatTime(audioManager.time)
                : formatTime(recordManager.time)}
            </div>
          </div>
        </div>
        <div className={styles.drawerFooter}>
          <button type="button" onClick={handleCancel}>
            취소
          </button>
          {renderRecordButton()}
          <button type="button" onClick={handleSave}>
            완료
          </button>
        </div>
      </div>
    </Drawer>
  );
};

export default RecordDrawer;
