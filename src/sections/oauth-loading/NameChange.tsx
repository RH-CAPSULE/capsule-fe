import { yupResolver } from '@hookform/resolvers/yup';
import React from 'react';
import { useForm } from 'react-hook-form';
import { usePatchUser } from 'src/apis/queries/auth/patch-user';
import * as Yup from 'yup';
import { Button } from 'src/components/button';
import { FormProvider, RHFInput } from 'src/components/hook-form';
import { Capsule } from 'src/components/capsule';
import { setSession } from 'src/auth/utils';
import { IToken } from 'src/auth/types';
import { useNavigate } from 'react-router-dom';
import { PATH } from 'src/routes/path';
import styles from './styles.module.scss';

// ----------------------------------------------------------------------

interface IFormValues {
  userName: string;
}

const patchUserSchema = Yup.object().shape({
  userName: Yup.string()
    .required('이름을 입력해주세요.')
    .max(12, '이름은 12자 이하여야 합니다.'),
});

const defaultValues = {
  userName: '',
};

// ----------------------------------------------------------------------

const NameChange = ({ token }: { token: IToken }) => {
  const navigate = useNavigate();

  const nameChangeMutation = usePatchUser<IFormValues>();

  const methods = useForm<IFormValues>({
    defaultValues,
    resolver: yupResolver(patchUserSchema),
    mode: 'onChange',
  });

  const {
    handleSubmit,
    formState: { isValid },
  } = methods;

  const onSubmit = (data: IFormValues) => {
    nameChangeMutation.mutate(data, {
      onSuccess: () => {
        setSession(token);
        navigate(PATH.HOME);
      },
    });
  };

  return (
    <>
      <section className={styles.section}>
        <h1>닉네임 설정</h1>
        <Capsule className={styles.capsule} />
      </section>
      <section className={styles.section}>
        <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
          <RHFInput
            type="text"
            name="userName"
            placeholder="닉네임을 입력해주세요."
          />
          <Button
            type="submit"
            disabled={!isValid}
            loading={nameChangeMutation.isPending}
          >
            닉네임 설정
          </Button>
        </FormProvider>
      </section>
    </>
  );
};

export default NameChange;
