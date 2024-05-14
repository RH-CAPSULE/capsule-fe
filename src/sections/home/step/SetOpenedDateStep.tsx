import { format } from 'date-fns';
import React from 'react';
import { useFormContext } from 'react-hook-form';
import { IconArrowBack } from 'src/assets/icons';
import { Button } from 'src/components/button';
import { MakingCapsuleBox } from 'src/components/capsule-box';
import { Modal } from 'src/components/modal';
import { Radio } from 'src/components/radio';
import { useMakeCapsuleStore } from 'src/store/capsule';
import { ICapsuleBox, MakeCapsuleStep } from 'src/types/capsule';
import styles from './styles.module.scss';

// ----------------------------------------------------------------------

enum SelectedDateType {
  SixMonth = '6month',
  OneYear = '1year',
  Direct = 'direct',
}

// ----------------------------------------------------------------------

const SetOpenedDateStep = () => {
  const { currentStep, setCurrentStep } = useMakeCapsuleStore((state) => state);

  const { watch, setValue } = useFormContext<ICapsuleBox>();

  const [selectedDateType, setSelectedDateType] =
    React.useState<SelectedDateType | null>(null);

  const directSelectInputRef = React.useRef<HTMLInputElement>(null);

  const handleBackStep = () => {
    setCurrentStep(MakeCapsuleStep.SetClosedDate);
  };

  const handleNext = () => {
    setCurrentStep(MakeCapsuleStep.Confirm);
  };

  const onChange6Months = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedDateType(e.target.value as SelectedDateType);
    setValue(
      'openedAt',
      // 6개월 뒤
      format(new Date(Date.now() + 1000 * 60 * 60 * 24 * 30 * 6), 'yyyy-MM-dd')
    );
  };

  const onChange1year = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedDateType(e.target.value as SelectedDateType);
    setValue(
      'openedAt',
      format(new Date(Date.now() + 1000 * 60 * 60 * 24 * 365), 'yyyy-MM-dd')
    );
  };

  const onChangeDirectDate = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedDateType(e.target.value as SelectedDateType);
  };

  const theme = watch('theme');
  const closedAt = watch('closedAt');
  const openedAt = watch('openedAt');

  return (
    <>
      <header>
        <IconArrowBack onClick={handleBackStep} />
      </header>
      <Modal.Title className={styles.title}>{currentStep}</Modal.Title>
      <Modal.Content>
        <MakingCapsuleBox
          theme={theme}
          openedAt={openedAt}
          closedAt={closedAt}
        />
        <div className={styles.radioBox}>
          <Radio
            label="6개월 뒤(기본)"
            name="select-type-6months"
            value={SelectedDateType.SixMonth}
            checked={selectedDateType === SelectedDateType.SixMonth}
            onChange={onChange6Months}
          />
          <Radio
            label="1년 뒤"
            name="select-type-1year"
            value={SelectedDateType.OneYear}
            checked={selectedDateType === SelectedDateType.OneYear}
            onChange={onChange1year}
          />
          <Radio
            label="직접 선택"
            name="select-type-directly"
            value={SelectedDateType.Direct}
            checked={selectedDateType === SelectedDateType.Direct}
            onChange={onChangeDirectDate}
          />
        </div>
      </Modal.Content>
      <Modal.Action className={styles.modalActionBox}>
        {selectedDateType === SelectedDateType.Direct && (
          <Button
            className={styles.modalButton}
            theme={theme}
            onClick={() => directSelectInputRef.current?.showPicker()}
          >
            <input
              type="date"
              ref={directSelectInputRef}
              min={format(new Date(), 'yyyy-MM-dd')}
              value={openedAt}
              onChange={(e) => setValue('openedAt', e.target.value)}
            />
            개봉일자 설정
          </Button>
        )}
        <Button
          className={styles.modalButton}
          disabled={!selectedDateType}
          onClick={handleNext}
          theme={theme}
        >
          날짜 결정하기
        </Button>
      </Modal.Action>
    </>
  );
};

export default SetOpenedDateStep;
