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

  const { register } = useFormContext();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [imageURL, setImageURL] = useState<string | null>(null);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedImage = event.target.files?.[0];
    if (selectedImage) {
      const imageUrl = URL.createObjectURL(selectedImage);
      setImageURL(imageUrl);
      register('image', { value: selectedImage });
    }
  };

  const handleImageDelte = () => {
    setImageURL(null);
    register('image', { value: null });
    // 파일 입력 필드 비우기
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleButtonClick = () => {
    // 파일 입력 필드 클릭
    fileInputRef.current?.click();
  };

  return (
    <div className={classes()}>
      <div className={`${styles.top} ${styles.toFrom}`}>
        TO..
        <RHFInput name="title" placeholder="캡슐에게.." />
      </div>
      <div className={styles.image}>
        {/* 이미지를 보여줄 div */}
        {imageURL && (
          <>
            <img
              src={imageURL}
              alt="Uploaded"
              className={styles.uploadedImage}
            />
            <IconClose
              onClick={handleImageDelte}
              className={styles.removeImage}
            />
          </>
        )}
        {/* 파일 입력 필드 */}
        <input
          type="file"
          accept="image/*"
          ref={fileInputRef}
          onChange={handleImageChange}
          className={styles.disable}
        />
      </div>
      <div className={styles.contents}>
        <RHFTextArea name="content" placeholder="내용을 입력해주세요." />
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
