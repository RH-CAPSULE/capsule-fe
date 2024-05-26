import React from 'react';
import { RHFInput, RHFTextArea } from 'src/components/hook-form';
import { useFormContext } from 'react-hook-form';
import { ICapsule } from 'src/types';
import styles from '../styles.module.scss';

// Audio로 이름 변경
const Record = () => {
  const { watch } = useFormContext<ICapsule>();

  const { theme, audioUrl, imageUrl } = watch();

  const classes = React.useMemo(() => {
    const classArr = [styles.container, styles[theme]];
    return classArr.join(' ');
  }, [theme]);

  return (
    <div className={classes}>
      <div className={`${styles.top} ${styles.toFrom}`}>
        TO.
        <RHFInput name="title" placeholder="캡슐에게.." />
      </div>
      {/* img */}
      {imageUrl && (
        <div className={styles.img}>
          <img src={imageUrl} alt="" />
        </div>
      )}

      {/* audio */}
      <div className={styles.contents}>
        {audioUrl && (
          <div className={styles.audio}>
            <audio controls>
              <source src={audioUrl} type="audio/ogg" />
              <source src={audioUrl} type="audio/mpeg" />
              <track
                src={audioUrl}
                kind="captions"
                srcLang="en"
                label="english_captions"
              />
              Your browser does not support the audio element.
            </audio>
          </div>
        )}
        <div className={styles.textarea}>
          <RHFTextArea name="content" placeholder="내용을 입력해주세요." />
        </div>
      </div>

      <div className={styles.bottom}>
        <div className={`${styles.toFrom} ${styles.right}`}>
          From.
          <RHFInput name="writer" placeholder="캡슐이가" />
        </div>
      </div>
    </div>
  );
};

export default Record;
