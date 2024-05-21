import React from 'react';
import { MakingCapsuleBox } from 'src/components/capsule-box';
import { Modal } from 'src/components/modal';
import { useMakeCapsuleStore } from 'src/store/capsule';
import { Button } from 'src/components/button';
import { ICapsuleBox, MakeCapsuleStep } from 'src/types/capsule';
import { useFormContext } from 'react-hook-form';
import { IconArrowBack } from 'src/assets/icons';
import { Radio } from 'src/components/radio';
import { format } from 'date-fns';
import styles from './styles.module.scss';

// ----------------------------------------------------------------------

const enum SelectedDateType {
  OneWeekLater = 'OneWeekLater',
  TwoWeekLater = 'TwoWeekLater',
}

const DateValues = {
  OneWeekLater: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7),
  TwoWeekLater: new Date(Date.now() + 1000 * 60 * 60 * 24 * 14),
};

// ----------------------------------------------------------------------

const SetClosedDateStep = () => {
  const { currentStep, setCurrentStep } = useMakeCapsuleStore((state) => state);

  const { watch, setValue } = useFormContext<ICapsuleBox>();

  const [selectedDateType, setSelectedDateType] =
    React.useState<SelectedDateType | null>(null);

  const handleBackStep = () => {
    setCurrentStep(MakeCapsuleStep.SelectColor);
  };

  const handleNext = () => {
    setCurrentStep(MakeCapsuleStep.SetOpenedDate);
  };

  const onChangeDate = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value as SelectedDateType;
    setSelectedDateType(value);
    setValue('closedAt', format(DateValues[value], 'yyyy-MM-dd'));
    console.log(value, format(DateValues[value], 'yyyy-MM-dd'));
  };

  const theme = watch('theme');
  const closedAt = watch('closedAt');

  return (
    <>
      <header>
        <IconArrowBack onClick={handleBackStep} />
      </header>
      <Modal.Title className={styles.title}>{currentStep}</Modal.Title>
      <Modal.Content>
        <MakingCapsuleBox theme={theme} closedAt={closedAt} openedAt={null} />
        <div className={styles.radioBox}>
          <Radio
            label="1주 뒤(기본)"
            name="one-week-later"
            value={SelectedDateType.OneWeekLater}
            checked={selectedDateType === SelectedDateType.OneWeekLater}
            onChange={onChangeDate}
          />
          <Radio
            label="2주 뒤"
            name="two-week-later"
            value={SelectedDateType.TwoWeekLater}
            checked={selectedDateType === SelectedDateType.TwoWeekLater}
            onChange={onChangeDate}
          />
        </div>
      </Modal.Content>
      <Modal.Action className={styles.modalActionBox}>
        <Button
          disabled={!selectedDateType}
          className={styles.modalButton}
          onClick={handleNext}
          theme={theme}
        >
          날짜 결정하기
        </Button>
      </Modal.Action>
    </>
  );
};

export default SetClosedDateStep;
