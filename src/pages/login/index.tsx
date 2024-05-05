import React from 'react';
import { useForm } from 'react-hook-form';
import { FormProvider, RHFInput } from 'src/components/hook-form';
import { Button } from 'src/components/button';
import { Capsule } from 'src/components/capsule';
import { useSnackbar } from 'notistack';
import { IconGoogle } from 'src/assets/icons';
import { Link } from 'react-router-dom';
import { PATH } from 'src/routes/path';
import styles from './styles.module.scss';

/**
 * Login과 회원가입 페이지는 레이아웃을 따로 사용.
 */

const defaultValues = {
  email: '',
  password: '',
};

const LoginPage = () => {
  const { enqueueSnackbar } = useSnackbar();

  const methods = useForm({
    defaultValues,
  });

  const { handleSubmit } = methods;

  const onSubmit = (data: any) => {
    const { email, password } = data;
    if (!email) {
      enqueueSnackbar('이메일을 입력해주세요.', { variant: 'error' });
      return;
    }
    if (!password) {
      enqueueSnackbar('비밀번호를 입력해주세요.', { variant: 'error' });
      return;
    }
    console.log(data);
  };

  return (
    <div className={styles.layout}>
      <main>
        <section>
          <h1>적어줘 타임캡슐!</h1>
          <Capsule className={styles.capsule} />
        </section>
        <section className={styles.formSection}>
          <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
            <RHFInput name="email" placeholder="이메일" inputMode="email" />
            <RHFInput type="password" name="password" placeholder="비밀번호" />

            <p className={styles.description}>
              * 비밀번호는 특수문자, 숫자를 포함하여
              <br />
              8자리 이상이어야 합니다.
            </p>

            <Button type="submit">로그인</Button>
          </FormProvider>
        </section>
        <section>
          <div className={styles.authOptions}>
            <Link to={PATH.PASSWORD_INIT}>비밀번호 재설정</Link>
            <span aria-label="divider" />
            <Link to={PATH.SIGN_UP}>회원가입</Link>
          </div>
          <div className={styles.or}>또는</div>
        </section>
        <section>
          <Button className={styles.socialLoginButton}>
            <IconGoogle />
            Sign in with Google
          </Button>
        </section>
      </main>
    </div>
  );
};
export default LoginPage;
