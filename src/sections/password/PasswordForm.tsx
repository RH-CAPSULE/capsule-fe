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
import { useParams } from 'react-router-dom';
import styles from './styles.module.scss';
import { usePasswordInit } from '../../apis/queries/auth/password-init';

// ----------------------------------------------------------------------

interface IFormValues {
  password: string;
  passwordConfirm: string;
}

const signUpSchema = Yup.object().shape({
  password: Yup.string()
    .required('비밀번호를 입력해주세요.')
    .matches(
      /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*()_+]).{8,}$/,
      '비밀번호는 특수문자, 숫자를 포함하여 8자리 이상이어야 합니다.'
    ),
  passwordConfirm: Yup.string()
    .required('비밀번호 확인을 입력해주세요.')
    .oneOf([Yup.ref('password'), ''], '비밀번호를 다시 입력해주세요.'),
});

const defaultValues = {
  password: '',
  passwordConfirm: '',
};

// ----------------------------------------------------------------------

const PasswordForm = () => {
  const { enqueueSnackbar } = useSnackbar();
  const { userEmail } = useEmailAuthStore((state) => state);

  const resetPwMutation =
    usePasswordInit<Omit<IFormValues, 'passwordConfirm'>>();

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

    resetPwMutation.mutate({
      userEmail,
      password: sha256(password),
    });
  };

  return (
    <section className={styles.section}>
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <RHFInput
          type="password"
          name="password"
          placeholder="새 비밀번호 입력"
          autoComplete="current-password"
        />
        <RHFInput
          type="password"
          name="passwordConfirm"
          placeholder="비밀번호 확인"
        />
        <Button
          type="submit"
          disabled={!!errors.passwordConfirm || !watch('userEmail')}
          loading={resetPwMutation.isPending}
        >
          확인
        </Button>
      </FormProvider>
    </section>
  );
};

export default PasswordForm;
