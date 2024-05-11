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

enum SelectedDateType {
  Default = 'default',
  Direct = 'direct',
}

// ----------------------------------------------------------------------

const SetClosedDateStep = () => {
  const { currentStep, setCurrentStep } = useMakeCapsuleStore((state) => state);

  const { watch, setValue } = useFormContext<ICapsuleBox>();

  const [selectedDateType, setSelectedDateType] =
    React.useState<SelectedDateType | null>(null);

  const directSelectInputRef = React.useRef<HTMLInputElement>(null);

  const handleBackStep = () => {
    setCurrentStep(MakeCapsuleStep.SelectColor);
  };

  const handleNext = () => {
    setCurrentStep(MakeCapsuleStep.SetOpenedDate);
  };

  const onChangeDefaultDate = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedDateType(e.target.value as SelectedDateType);
    setValue(
      'closedAt',
      format(new Date(Date.now() + 1000 * 60 * 60 * 24 * 14), 'yyyy-MM-dd')
    );
  };

  const onChangeDirectDate = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedDateType(e.target.value as SelectedDateType);
  };

  const theme = watch('theme');
  const closedAt = watch('closedAt');

  return (
    <>
      <header>
        <IconArrowBack onClick={handleBackStep} />
      </header>
      <Modal.Title>{currentStep}</Modal.Title>
      <Modal.Content>
        <MakingCapsuleBox theme={theme} closedAt={closedAt} openedAt={null} />
        <div className={styles.radioBox}>
          <Radio
            label="2주 뒤(기본)"
            name="select-type-default"
            value={SelectedDateType.Default}
            checked={selectedDateType === SelectedDateType.Default}
            onChange={onChangeDefaultDate}
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
              value={closedAt}
              onChange={(e) => setValue('closedAt', e.target.value)}
            />
            개봉일자 설정
          </Button>
        )}
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
