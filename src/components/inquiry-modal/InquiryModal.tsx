import React from 'react';
import { Button } from 'src/components/button';
import { Modal } from 'src/components/modal';
import { useTimer } from 'src/hooks/useTimer';
import { useEmailAuthStore } from 'src/store/auth';
import { useVerifyEmail } from 'src/apis/queries/auth/verify-email';
import { useSendEmail } from 'src/apis/queries/auth/send-email';
import { useFormContext } from 'react-hook-form';
import { EmailVerifyPurpose } from 'src/types/auth';
import { useSnackbar } from 'notistack';
import { onConfirm } from 'src/utils/rha-alert';
import styles from './styles.module.scss';

// ----------------------------------------------------------------------

interface Props {
  open: boolean;
  onClose: () => void;
}

// ----------------------------------------------------------------------

const InquiryModal = ({ open, onClose }: Props) => {
  // const { getValues } = useFormContext();

  const submitInquiry = () => {
    console.log('submitInquiry');
  };

  return (
    <Modal open={open} onClose={onClose} className={styles.inquiryModal}>
      <Modal.Title>
        <p>문의하기</p>
      </Modal.Title>
      <Modal.Content className={styles.inquiryContent}>
        <div className={styles.inputBox}>
          <textarea
            placeholder="내용을 입력해주세요"
            className={styles.textarea}
          />
        </div>
      </Modal.Content>
      <Modal.Action className={styles.actionsBox}>
        <Button
          className={styles.verifyButton}
          onClick={submitInquiry}
          // disabled={code.some((digit) => digit === '')}
          // loading={verifyEmailMutation.isPending}
        >
          제출
        </Button>
      </Modal.Action>
    </Modal>
  );
};

export default InquiryModal;
