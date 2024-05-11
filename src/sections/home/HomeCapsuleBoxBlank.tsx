import React from 'react';
import { IconCapsuleBoxBlank } from 'src/assets/icons';
import { Modal } from 'src/components/modal';
import { useMakeCapsuleStore } from 'src/store/capsule';
import { ICapsuleBox, MakeCapsuleStep } from 'src/types/capsule';
import { useForm } from 'react-hook-form';
import { Theme } from 'src/types/theme';
import { FormProvider } from 'src/components/hook-form';
import { useMakeCapsuleBox } from 'src/apis/queries/capsule/make-capsule-box';
import { useSnackbar } from 'notistack';
import { formatISODate } from 'src/utils/date';
import { useQueryClient } from '@tanstack/react-query';
import { QUERY_KEY } from 'src/apis/queryKeys';
import styles from './styles.module.scss';
import {
  ConfirmStep,
  SelectColorStep,
  SetClosedDateStep,
  SetOpenedDateStep,
} from './step';

const defaultValues = {
  theme: Theme.AQUA,
  closedAt: '',
  openedAt: '',
};

const HomeCapsuleBoxBlank = () => {
  const queryClient = useQueryClient();
  const { enqueueSnackbar } = useSnackbar();

  const { currentStep, isMakeModalOpen, setIsMakeModalOpen } =
    useMakeCapsuleStore((state) => state);

  const makeCapsuleBoxMutate = useMakeCapsuleBox();

  const methods = useForm<ICapsuleBox>({
    defaultValues,
  });

  const onSubmit = (data: ICapsuleBox) => {
    const { closedAt, openedAt, theme } = data;
    makeCapsuleBoxMutate.mutate(
      {
        theme,
        closedAt: formatISODate(closedAt),
        openedAt: formatISODate(openedAt),
      },
      {
        onSuccess: () => {
          enqueueSnackbar('캡슐함이 생성되었습니다.', { variant: 'success' });
          setIsMakeModalOpen(false);
          // 캡슐함 refetch
          queryClient.invalidateQueries({ queryKey: [QUERY_KEY.CAPSULE_BOX] });
        },
      }
    );
  };

  const renderContent = () => {
    switch (currentStep) {
      case MakeCapsuleStep.SelectColor:
        return <SelectColorStep />;
      case MakeCapsuleStep.SetClosedDate:
        return <SetClosedDateStep />;
      case MakeCapsuleStep.SetOpenedDate:
        return <SetOpenedDateStep />;
      case MakeCapsuleStep.Confirm:
        return <ConfirmStep />;
      default:
        return null;
    }
  };

  return (
    <>
      <section className={styles.section}>
        <IconCapsuleBoxBlank onClick={() => setIsMakeModalOpen(true)} />
      </section>
      <Modal open={isMakeModalOpen} style={{ width: '100%' }}>
        <FormProvider
          methods={methods}
          onSubmit={methods.handleSubmit(onSubmit)}
        >
          {renderContent()}
        </FormProvider>
      </Modal>
    </>
  );
};

export default HomeCapsuleBoxBlank;
