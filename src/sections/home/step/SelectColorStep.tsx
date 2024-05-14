import React from 'react';
import { MakingCapsuleBox } from 'src/components/capsule-box';
import { useMakeCapsuleStore } from 'src/store/capsule';
import { Theme } from 'src/types/theme';
import { ICapsuleBox, MakeCapsuleStep } from 'src/types/capsule';

// swiper
import { Swiper, SwiperSlide } from 'swiper/react';
import { A11y, Pagination } from 'swiper/modules';
import { Modal } from 'src/components/modal';
import { Button } from 'src/components/button';
import { Swiper as ISwiper } from 'swiper/types';
import 'swiper/css';
import 'swiper/css/pagination';
// swiper 내부 style 수정해야 해서 module 안 씀
import './swiper.scss';

// style
import { IconArrowBack } from 'src/assets/icons';
import { useFormContext } from 'react-hook-form';
import { px } from 'src/utils/styles';
import styles from './styles.module.scss';

// ----------------------------------------------------------------------

const THEMES = [
  Theme.AQUA,
  Theme.MAGENTA,
  Theme.PURPLE,
  Theme.BROWN,
  Theme.GREIGE,
];

// ----------------------------------------------------------------------

const SelectColorStep = () => {
  const { currentStep, setCurrentStep, setIsMakeModalOpen } =
    useMakeCapsuleStore((state) => state);

  const { watch, setValue } = useFormContext<ICapsuleBox>();

  const handleBackStep = () => {
    setIsMakeModalOpen(false);
  };

  const handleNext = () => {
    setCurrentStep(MakeCapsuleStep.SetClosedDate);
  };

  const theme = watch('theme');
  const initialSlide = THEMES.indexOf(theme);

  return (
    <>
      <header>
        <IconArrowBack onClick={handleBackStep} />
      </header>
      <Modal.Title className={styles.title}>{currentStep}</Modal.Title>
      <Modal.Content>
        <Swiper
          initialSlide={initialSlide}
          modules={[Pagination, A11y]}
          pagination={{
            type: 'bullets',
            clickable: true,
          }}
          spaceBetween={10}
          className="swiperCapsule"
          onSlideChange={(swiper: ISwiper) =>
            setValue('theme', THEMES[swiper.activeIndex])
          }
        >
          {THEMES.map((item) => (
            <SwiperSlide key={item}>
              <MakingCapsuleBox
                theme={item}
                openedAt={null}
                closedAt={null}
                style={{ marginBottom: px(40) }}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </Modal.Content>
      <Modal.Action className={styles.modalActionBox}>
        <Button
          className={styles.modalButton}
          onClick={handleNext}
          theme={theme}
        >
          선택하기
        </Button>
      </Modal.Action>
    </>
  );
};

export default SelectColorStep;
