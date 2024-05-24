import React from 'react';
import { Button } from 'src/components/button';
import { Modal } from 'src/components/modal';
import { useTimer } from 'src/hooks/useTimer';
import { useEmailAuthStore } from 'src/store/auth';
import { useVerifyEmail } from 'src/apis/queries/auth/verify-email';
import { useSendEmail } from 'src/apis/queries/auth/send-email';
import { useForm, useFormContext } from 'react-hook-form';
import { EmailVerifyPurpose } from 'src/types/auth';
import { useSnackbar } from 'notistack';
import { onConfirm } from 'src/utils/rha-alert';
import { yupResolver } from '@hookform/resolvers/yup';
import sha256 from 'sha256';
import * as Yup from 'yup';
import styles from './styles.module.scss';
import FormProvider from '../hook-form/FormProvider';
import { ICapsuleBox } from '../../types';
import { formatISODate } from '../../utils/date';
import { QUERY_KEY } from '../../apis/queryKeys';
import { useInquiry } from '../../apis/queries/inquiry/inquiry';
import RHFTextarea from '../hook-form/RHFTextArea';

// ----------------------------------------------------------------------

interface Props {
  open: boolean;
  onClose: () => void;
}

interface IFormValues {
  content: string;
}

const defaultValues = {
  content: '',
};

const inquirySchema = Yup.object().shape({
  content: Yup.string().required('문의 내용을 입력해주세요.'),
});

// ----------------------------------------------------------------------

const InquiryModal = ({ open, onClose }: Props) => {
  const useInquiryMutation = useInquiry<IFormValues>();

  const methods = useForm<IFormValues>({
    defaultValues,
    resolver: yupResolver(inquirySchema),
  });

  const {
    handleSubmit,
    formState: { isValid },
  } = methods;

  const onSubmit = (data: IFormValues) => {
    useInquiryMutation.mutate(
      {
        content: data.content,
      },
      {
        onSuccess: () => {
          onClose();
        },
      }
    );
  };

  return (
    <Modal open={open} onClose={onClose} className={styles.inquiryModal}>
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <Modal.Title className={styles.inquiryTitle}>
          <p>문의하기</p>
        </Modal.Title>
        <Modal.Content className={styles.inquiryContent}>
          <div className={styles.inputBox}>
            <RHFTextarea
              name="content"
              className={styles.input}
              placeholder="문의할 내용을 작성해주세요"
            />
          </div>
        </Modal.Content>
        <Modal.Action className={styles.actionsBox}>
          <Button
            className={styles.verifyButton}
            disabled={!isValid}
            type="submit"
          >
            제출
          </Button>
        </Modal.Action>
      </FormProvider>
    </Modal>
  );
};

export default InquiryModal;
