import { FieldErrors, useForm } from 'react-hook-form';
import { Button } from 'src/components/button';
import { RHFInput, FormProvider } from 'src/components/hook-form';
import { useSignIn } from 'src/apis/queries/auth/sign-in';
import { useSnackbar } from 'notistack';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import sha256 from 'sha256';
import styles from './styles.module.scss';

// ----------------------------------------------------------------------

interface IFormValues {
  name : string;
  email: string;
  password: string;
  passwordConfirm: string;
}

const signupSchema = Yup.object().shape({
  name: Yup.string()
    .required('이름을 입력해주세요.')
    .matches(/^[a-z0-9]+@[a-z]+\.[a-z]{2,3}/i, '이름 형식이 아닙니다.'),
  email: Yup.string()
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
  email: '',
  password: '',
  passwordConfirm: '',
};

// ----------------------------------------------------------------------

const SignupForm = () => {
  const { enqueueSnackbar } = useSnackbar();

  const signInMutation = useSignIn<IFormValues>();

  const methods = useForm<IFormValues>({
    defaultValues,
    resolver: yupResolver(signupSchema),
  });

  const {
    handleSubmit,
    formState: { isValid },
  } = methods;

  const onSubmit = (data: IFormValues) => {
    const { name, email, password, passwordConfirm } = data;
    signInMutation.mutate({
      name,
      email,
      password: sha256(password),
      passwordConfirm: sha256(password),
    });
  };

  const onInvalid = (error: FieldErrors<IFormValues>) => {
    if (error.name) {
      enqueueSnackbar(error.name.message, { variant: 'error' });
    }
    if (error.email) {
      enqueueSnackbar(error.email.message, { variant: 'error' });
    }
    if (error.password) {
      enqueueSnackbar(error.password.message, { variant: 'error' });
    }
  };

  return (
    <section className={styles.section}>
      <FormProvider
        methods={methods}
        onSubmit={handleSubmit(onSubmit, onInvalid)}
      >
        <RHFInput name="name" placeholder="이름" inputMode="email" autoComplete="username"/>
        <RHFInput name="email" placeholder="이메일" inputMode="email" autoComplete="useremail"/>
        <RHFInput type="password" name="password" placeholder="비밀번호" autoComplete="current-password"/>
        <RHFInput type="password" name="passwordConfirm" placeholder="비밀번호 확인"/>

        <p className={styles.description}>
          * 비밀번호는 특수문자, 숫자를 포함하여
          <br />
          8자리 이상이어야 합니다.
        </p>

        <Button
          type="submit"
          disabled={!isValid}
          loading={signInMutation.isPending}
        >
          회원가입
        </Button>
      </FormProvider>
    </section>
  );
};

export default SignupForm;
