import React, { useRef, useState } from 'react';

import {
  IconClose,
  IconImagePlus,
  IconImagePlusAqua,
  IconMike,
  IconMikeAqua,
} from 'src/assets/icons';
import { useFormContext } from 'react-hook-form';
import { RHFInput, RHFTextArea } from '../hook-form';

import styles from './styles.module.scss';

import { IconButton } from '../button';
import { LetterType } from '../../types/letter';
import ImageUpload from '../image-upload/ImageUpload';

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  type?: LetterType;
  loading?: boolean;
  className?: string;
}

const Letter = ({ type = 'PRIMARY', className, ...other }: Props) => {
  const classes = React.useCallback(() => {
    const classArr = [styles.container, styles[type]];
    if (className) classArr.push(className);

    return classArr.join(' ');
  }, [type, className]);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const [imageUploaded, setImageUploaded] = useState(false); // 이미지가 업로드되었는지 여부

  const handleImageUpload = () => {
    setImageUploaded(true);
  };
  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  console.log(imageUploaded);

  return (
    <div className={classes()}>
      <div className={`${styles.top} ${styles.toFrom}`}>
        TO..
        <RHFInput name="title" placeholder="캡슐에게.." />
      </div>
      <ImageUpload fileInputRef={fileInputRef} onUpload={handleImageUpload} />
      <div className={styles.contents}>
        <RHFTextArea
          name="content"
          placeholder="내용을 입력해주세요."
          style={{ height: imageUploaded ? '200px' : '420px' }}
        />
      </div>
      <div className={styles.bottom}>
        <IconButton
          label="이미지 첨부"
          theme={type === 'PRIMARY' ? 'WHITE' : 'AQUA'}
          className="image"
          prevIcon={type === 'PRIMARY' ? IconImagePlusAqua : IconImagePlus}
          onClick={handleButtonClick}
        />
        <IconButton
          theme={type === 'PRIMARY' ? 'WHITE' : 'AQUA'}
          className="image"
          prevIcon={type === 'PRIMARY' ? IconMikeAqua : IconMike}
        />
        <div className={`${styles.toFrom} ${styles.right}`}>
          From..
          <RHFInput name="title" placeholder="캡슐이가" />
        </div>
      </div>
    </div>
  );
};

export default Letter;
