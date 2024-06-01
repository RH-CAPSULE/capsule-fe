import React, { useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
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
  const swiperRef = React.useRef<ISwiper | null>(null);

  const handleKeyPress = (
    event: React.KeyboardEvent<HTMLDivElement>,
    newType: LetterType
  ) => {
    if (event.key === 'Enter' || event.key === ' ') {
      onTypeChange(newType);
    }
    const index = Letter.indexOf(newType);
    if (swiperRef.current) {
      swiperRef.current.slideTo(index);
    }
  };

  const handleClick = (index: number) => {
    onTypeChange(Letter[index]);
    if (swiperRef.current) {
      swiperRef.current.slideTo(index);
    }
  };

  useEffect(() => {
    // This will trigger a re-render after the initial render
    window.dispatchEvent(new Event('resize'));
  }, []);

  const currentSlide = Letter.indexOf(type);

  return (
    <div className={styles.body}>
      <Swiper
        initialSlide={0}
        slidesPerView={3}
        pagination={{ clickable: true }}
        centeredSlides
        className={styles.swiperLetter}
        onSwiper={(swiper: ISwiper) => {
          swiperRef.current = swiper;
        }}
        onSlideChange={(swiper: ISwiper) =>
          onTypeChange(Letter[swiper.activeIndex])
        }
      >
        {Letter.map((value, index) => (
          <SwiperSlide key={value} className={styles.swiperSlide}>
            <div
              className={`${styles.item} ${index === currentSlide ? styles.active : ''}`}
              role="button"
              tabIndex={index}
              onClick={() => handleClick(index)}
              onKeyDown={(event) => handleKeyPress(event, Letter[index])}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default LetterSelector;
