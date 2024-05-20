import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { A11y } from 'swiper/modules';
import { Swiper as ISwiper } from 'swiper/types';
import { Letters, LetterType } from '../../types/letter';
import styles from './styles.module.scss';

interface LetterSelectorProps {
  type: LetterType;
  onTypeChange: (type: LetterType) => void;
}

const Letter = [Letters.PRIMARY, Letters.LETTER, Letters.BORDER];

const LetterSelector: React.FC<LetterSelectorProps> = ({
  type,
  onTypeChange,
}) => {
  const handleKeyPress = (
    event: React.KeyboardEvent<HTMLDivElement>,
    newType: LetterType
  ) => {
    if (event.key === 'Enter' || event.key === ' ') {
      onTypeChange(newType);
    }
  };

  return (
    <div className={styles.body}>
      <Swiper
        initialSlide={0}
        modules={[A11y]}
        pagination={{
          type: 'bullets',
          clickable: true,
        }}
        spaceBetween={15}
        className="swiperCapsule"
        onSlideChange={(swiper: ISwiper) =>
          onTypeChange(Letter[swiper.activeIndex])
        }
      >
        {Letter.map((value, index) => (
          <SwiperSlide key={value} className="slideStyle">
            <div
              className={styles.item}
              role="button"
              tabIndex={index}
              onClick={() => onTypeChange(Letter[index])}
              onKeyDown={(event) => handleKeyPress(event, Letter[index])}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default LetterSelector;
