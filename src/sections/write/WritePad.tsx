import { FieldErrors, useForm } from 'react-hook-form';
import { useSignUp } from 'src/apis/queries/auth/sign-up';
import { useSnackbar } from 'notistack';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import sha256 from 'sha256';
import styles from './styles.module.scss';

// ----------------------------------------------------------------------

interface IFormValues {
  name: string;
  userEmail: string;
  password: string;
  passwordConfirm: string;
}

const signupSchema = Yup.object().shape({
  name: Yup.string()
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

const WritePad = () => {
  const { enqueueSnackbar } = useSnackbar();

  const signUpMutation = useSignUp<IFormValues>();

  const methods = useForm<IFormValues>({
    defaultValues,
    resolver: yupResolver(signupSchema),
  });

  const {
    handleSubmit,
    formState: { isValid },
    watch,
    setError,
    clearErrors,
  } = methods;

  const onSubmit = (data: IFormValues) => {
    const { name, userEmail, password, passwordConfirm } = data;

    signUpMutation.mutate({
      name,
      userEmail,
      password: sha256(password),
      passwordConfirm: sha256(passwordConfirm),
    });
  };

  const onInvalid = (error: FieldErrors<IFormValues>) => {
    if (error.name) {
      enqueueSnackbar(error.name.message, { variant: 'error' });
    }
    if (error.userEmail) {
      enqueueSnackbar(error.userEmail.message, { variant: 'error' });
    }
    if (error.password) {
      enqueueSnackbar(error.password.message, { variant: 'error' });
    }
    if (error.passwordConfirm) {
      enqueueSnackbar(error.passwordConfirm.message, { variant: 'error' });
    }
  };

  const handleChangePasswordConfirm = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const password = watch('password');
    const passwordConfirm = watch('passwordConfirm');
    if (password !== e.target.value) {
      setError('passwordConfirm', {
        type: 'manual',
        message: '비밀번호가 일치하지 않습니다.',
      });
    } else {
      clearErrors('passwordConfirm');
    }
  };

  return <section className={styles.section}>편지지</section>;
};

export default WritePad;
