import React from 'react';
import { useFormContext } from 'react-hook-form';
import { IconArrowBack } from 'src/assets/icons';
import { Button } from 'src/components/button';
import { MakingCapsuleBox } from 'src/components/capsule-box';
import { Modal } from 'src/components/modal';
import { useMakeCapsuleStore } from 'src/store/capsule';
import { ICapsuleBox, MakeCapsuleStep } from 'src/types/capsule';
import { useMutationState } from '@tanstack/react-query';
import { QUERY_KEY } from 'src/apis/queryKeys';
import styles from './styles.module.scss';

const ConfirmStep = () => {
  const { currentStep, setCurrentStep } = useMakeCapsuleStore((state) => state);

  const { watch } = useFormContext<ICapsuleBox>();

  const handleBackStep = () => {
    setCurrentStep(MakeCapsuleStep.SetClosedDate);
  };

  const { theme, openedAt, closedAt } = watch();

  // pending statue
  const mutationStatusList = useMutationState({
    filters: {
      mutationKey: [QUERY_KEY.MAKE_CAPSULE_BOX],
    },
    select: (mutate) => mutate.state.status,
  });

  const isMaking = React.useMemo(
    () => mutationStatusList.some((status) => status === 'pending'),
    [mutationStatusList]
  );

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
      </Modal.Content>
      <Modal.Action className={styles.modalActionBox}>
        <Button
          type="submit"
          className={styles.modalButton}
          theme={theme}
          loading={isMaking}
        >
          캡슐함 생성하기
        </Button>
      </Modal.Action>
    </>
  );
};

export default ConfirmStep;
