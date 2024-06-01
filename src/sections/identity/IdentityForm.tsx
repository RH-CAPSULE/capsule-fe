import { useForm } from 'react-hook-form';
import { Button } from 'src/components/button';
import { RHFInput, FormProvider } from 'src/components/hook-form';
import { useSignUp } from 'src/apis/queries/auth/sign-up';
import { useSnackbar } from 'notistack';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import sha256 from 'sha256';
import React from 'react';
import { useEmailAuthStore } from 'src/store/auth';
import { OTPModal } from 'src/components/OTP-modal';
import { useSendEmail } from 'src/apis/queries/auth/send-email';
import { EmailVerifyPurpose } from 'src/types/auth';
import styles from './styles.module.scss';

// ----------------------------------------------------------------------

interface IFormValues {
  userEmail: string;
}

const signUpSchema = Yup.object().shape({
  userEmail: Yup.string()
    .required('이메일을 입력해주세요.')
    .matches(
      /^[a-zA-Z0-9+-_.]+@[a-z]+\.[a-z]{2,3}/i,
      '이메일 형식이 아닙니다.'
    ),
});

const defaultValues = {
  userEmail: '',
};

// ----------------------------------------------------------------------

const IdentityForm = () => {
  const { enqueueSnackbar } = useSnackbar();
  const [isOtpModalOpen, setIsOtpModalOpen] = React.useState<boolean>(false);

  const { endAt, isAuthenticated, setEndAt, setIsAuthenticated } =
    useEmailAuthStore((state) => state);

  const signUpMutation = useSignUp<Omit<IFormValues, 'passwordConfirm'>>();

  const methods = useForm<IFormValues>({
    defaultValues,
    resolver: yupResolver(signUpSchema),
    mode: 'onChange',
  });

  const {
    handleSubmit,
    formState: { isValid, errors },
    watch,
  } = methods;

  const onSubmit = (data: IFormValues) => {
    const { password } = data;

    signUpMutation.mutate(
      {
        password: sha256(password),
      },
      {
        onSuccess: () => setIsAuthenticated(false),
      }
    );
  };

  const sendEmailMutation = useSendEmail();

  const sendEmail = () => {
    // 보낸지 3분이 안 지났으면 모달 다시 열기
    if (endAt && new Date() < new Date(endAt)) {
      setIsOtpModalOpen(true);
      return;
    }

    sendEmailMutation.mutate(
      {
        userEmail: watch('userEmail'),
        purpose: EmailVerifyPurpose.RESET_PASSWORD,
      },
      {
        onSuccess: () => {
          setIsOtpModalOpen(true);
          enqueueSnackbar('이메일로 인증번호가 전송되었습니다.', {
            variant: 'success',
          });
          setEndAt(Date.now() + 1000 * 60 * 3);
        },
      }
    );
  };

  return (
    <section className={styles.section}>
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <p className={styles.description}>
          * 가입 시 작성한 이메일을 입력해주세요.
        </p>
        <RHFInput
          name="userEmail"
          placeholder="이메일"
          inputMode="email"
          autoComplete="email"
        />
        <Button
          onClick={sendEmail}
          disabled={!!errors.userEmail || !watch('userEmail')}
          loading={sendEmailMutation.isPending}
        >
          인증 요청
        </Button>

        {/* OTP Modal */}
        <OTPModal
          open={isOtpModalOpen}
          purpose={EmailVerifyPurpose.RESET_PASSWORD}
          onClose={() => setIsOtpModalOpen(false)}
        />
      </FormProvider>
    </section>
  );
};

export default IdentityForm;
