import React from 'react';

import { useQueryClient } from '@tanstack/react-query';
import { useSnackbar } from 'notistack';
import { useForm } from 'react-hook-form';
import { useMakeCapsuleBox } from 'src/apis/queries/capsule';
import { QUERY_KEY } from 'src/apis/queryKeys';
import { Modal } from 'src/components/modal';
import { useMakeCapsuleStore } from 'src/store/capsule';
import { Theme, ICapsuleBox, MakeCapsuleStep } from 'src/types';
import { formatISODate } from 'src/utils/date';
import { FormProvider } from 'src/components/hook-form';
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

const MakeCapsuleModal = () => {
  const queryClient = useQueryClient();
  const { enqueueSnackbar } = useSnackbar();

  const {
    currentStep,
    isMakeModalOpen,
    //
    setIsMakeModalOpen,
  } = useMakeCapsuleStore((state) => state);

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
        onError: () => {
          enqueueSnackbar(
            '캡슐함 생성에 실패했습니다. 잠시 후 다시 시도해주세요.',
            { variant: 'error' }
          );
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
    <Modal open={isMakeModalOpen} style={{ width: '100%' }}>
      <FormProvider methods={methods} onSubmit={methods.handleSubmit(onSubmit)}>
        {renderContent()}
      </FormProvider>
    </Modal>
  );
};

export default MakeCapsuleModal;
