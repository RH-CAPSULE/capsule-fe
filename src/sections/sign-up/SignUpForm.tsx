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
  userName: string;
  userEmail: string;
  password: string;
  passwordConfirm: string;
}

const signUpSchema = Yup.object().shape({
  userName: Yup.string()
    .required('이름을 입력해주세요.')
    .max(12, '이름은 12자 이하여야 합니다.'),
  userEmail: Yup.string()
    .required('이메일을 입력해주세요.')
    .matches(/^[a-z0-9]+@[a-z]+\.[a-z]{2,3}/i, '이메일 형식이 아닙니다.'),
  password: Yup.string()
    .required('비밀번호를 입력해주세요.')
    .matches(
      /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*()_+]).{8,}$/,
      '비밀번호는 특수문자, 숫자를 포함하여 8자리 이상이어야 합니다.'
    ),
  passwordConfirm: Yup.string()
    .required('비밀번호 확인을 입력해주세요.')
    .oneOf([Yup.ref('password'), ''], '비밀번호가 일치하지 않습니다.'),
});

const defaultValues = {
  name: '',
  userEmail: '',
  password: '',
  passwordConfirm: '',
};

// ----------------------------------------------------------------------

const SignUpForm = () => {
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
    const { userName, userEmail, password } = data;

    signUpMutation.mutate(
      {
        userName,
        userEmail,
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
        purpose: EmailVerifyPurpose.SIGN_UP,
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
        <RHFInput
          name="userName"
          placeholder="이름"
          inputMode="email"
          autoComplete="username"
        />
        <RHFInput
          name="userEmail"
          placeholder="이메일"
          inputMode="email"
          autoComplete="email"
        />
        <RHFInput
          type="password"
          name="password"
          placeholder="비밀번호"
          autoComplete="current-password"
        />
        <RHFInput
          type="password"
          name="passwordConfirm"
          placeholder="비밀번호 확인"
        />

        <p className={styles.description}>
          * 비밀번호는 특수문자, 숫자를 포함하여
          <br />
          8자리 이상이어야 합니다.
        </p>

        {isAuthenticated ? (
          <Button
            type="submit"
            disabled={!isValid}
            loading={signUpMutation.isPending}
          >
            회원가입
          </Button>
        ) : (
          <Button
            onClick={sendEmail}
            disabled={!!errors.userEmail || !watch('userEmail')}
            loading={sendEmailMutation.isPending}
          >
            이메일 인증하기
          </Button>
        )}

        {/* OTP Modal */}
        <OTPModal
          open={isOtpModalOpen}
          purpose={EmailVerifyPurpose.SIGN_UP}
          onClose={() => setIsOtpModalOpen(false)}
        />
      </FormProvider>
    </section>
  );
};

export default SignUpForm;
