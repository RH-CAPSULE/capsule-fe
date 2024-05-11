import React from 'react';
import { Button } from 'src/components/button';
import { Modal } from 'src/components/modal';
import { useTimer } from 'src/hooks/useTimer';
import { useEmailAuthStore } from 'src/store/auth';
import { handleConfirm } from 'react-handle-alert';
import { useVerifyEmail } from 'src/apis/queries/auth/verify-email';
import { useSendEmail } from 'src/apis/queries/auth/send-email';
import { useFormContext } from 'react-hook-form';
import { EmailVerifyPurpose } from 'src/types/auth';
import { useSnackbar } from 'notistack';
import styles from './styles.module.scss';
import useOTP from './useOTP';

// ----------------------------------------------------------------------

const formatTimer = (distance: number | null) => {
  if (!distance) return null;

  const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((distance % (1000 * 60)) / 1000);

  if (minutes === 0) return `${seconds}초`;
  return `${minutes}분 ${seconds}초`;
};

interface Props {
  open: boolean;
  purpose: EmailVerifyPurpose;
  onClose: () => void;
}

// ----------------------------------------------------------------------

const OTPModal = ({ open, purpose, onClose }: Props) => {
  const {
    // state
    endAt,
    // actions
    setEndAt,
    setIsAuthenticated,
  } = useEmailAuthStore((state) => state);

  const { getValues } = useFormContext();

  const { enqueueSnackbar } = useSnackbar();

  const { timer, isTimerCompleted, setTimer } = useTimer(endAt);

  const { code, inputRefs, onOTPChange, onKeyDown } = useOTP();

  const verifyEmailMutation = useVerifyEmail();

  const sendEmailMutation = useSendEmail();

  const verifyEmail = () => {
    verifyEmailMutation.mutate(
      {
        userEmail: getValues('userEmail'),
        code: code.join(''),
      },
      {
        onSuccess: () => {
          onClose();
          setEndAt(null);
          setTimer(null);
          setIsAuthenticated(true);
          enqueueSnackbar('이메일 인증이 완료되었습니다.', {
            variant: 'success',
          });
        },
      }
    );
  };

  const reSendEmail = async () => {
    if (!(await handleConfirm('인증번호를 다시 보내시겠습니까?'))) return;

    sendEmailMutation.mutate(
      {
        userEmail: getValues('userEmail'),
        purpose,
      },
      {
        onSuccess: () => {
          setEndAt(Date.now() + 1000 * 60 * 3);
        },
      }
    );
  };

  // 이메일 보내고 90초 지난 경우
  const isShowResendButton = isTimerCompleted || (timer && timer < 90000);

  return (
    <Modal open={open} onClose={onClose} className={styles.otpModal}>
      <Modal.Title>
        <p>이메일로 전송된 인증번호를 입력해주세요.</p>
      </Modal.Title>
      <Modal.Content>
        <div className={styles.otpBox}>
          {code.map((digit, index) => (
            <input
              key={index}
              type="text"
              value={digit}
              onChange={(e) => onOTPChange(e, index)}
              ref={(el) => {
                inputRefs.current[index] = el;
              }}
              onKeyDown={(e) => onKeyDown(e, index)}
              inputMode="decimal"
            />
          ))}
        </div>
        {timer && (
          <div className={styles.timer}>
            <span>{formatTimer(timer)}</span>
          </div>
        )}
      </Modal.Content>
      <Modal.Action className={styles.actionsBox}>
        <Button
          className={styles.verifyButton}
          onClick={verifyEmail}
          loading={verifyEmailMutation.isPending}
        >
          인증하기
        </Button>
        {isShowResendButton && (
          <button
            className={styles.resendButton}
            type="button"
            onClick={reSendEmail}
          >
            이메일이 도착하지 않았나요?
          </button>
        )}
      </Modal.Action>
    </Modal>
  );
};

export default OTPModal;
