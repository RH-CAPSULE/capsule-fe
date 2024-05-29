import React, { useRef, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { IconClose } from 'src/assets/icons';

import styles from './styles.module.scss';

interface props {
  src?: string;
}

const ImageUpload = ({ src }: props) => {
  const { register, watch, setValue } = useFormContext();
  const [imageURL, setImageURL] = useState<string | null>(src || null);
  const fileInputRef = watch('fileInputRef');

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedImage = event.target.files?.[0];
    if (selectedImage) {
      const imageUrl = URL.createObjectURL(selectedImage);
      setImageURL(imageUrl);
      register('image', { value: selectedImage });
    }
  };

  const handleImageDelete = () => {
    setImageURL(null);
    register('image', { value: null });
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className={styles.image}>
      {imageURL && (
        <>
          <img src={imageURL} alt="Uploaded" className={styles.uploadedImage} />
          <IconClose
            onClick={handleImageDelete}
            className={styles.removeImage}
          />
        </>
      )}
      <input
        type="file"
        accept="image/*"
        ref={fileInputRef}
        onChange={handleImageChange}
        className={styles.disable}
      />
    </div>
  );
};

export default ImageUpload;
