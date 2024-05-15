import React, { useState } from 'react';
import { FieldErrors, FormProvider, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { enqueueSnackbar } from 'notistack';

// styles
import styles from './styles.module.scss';

// components
import { Button } from '../../components/button';
import { Letter } from '../../components/letter';
import { Letters, LetterType } from '../../types/letter';

/**
 *  WritePad 는 사용자가 타임캡슐을 작성하는 페이지입니다.
 * {
 *   "capsule": {
 *     "userId": 0,  -> 빠질 것임
 *     "capsuleBoxId": 0, -> 쿼리에서 가져오면 됨
 *     "color": "string",  -> 캡슐 색
 *     "title": "string",  -> to (유저 작성)
 *     "content": "string",
 *     "writer": "string"  -> from (유저 작성)
 *   },
 *   "image": "string",
 *   "audio": "string"
 * }
 */

interface IFormValues {
  content: string;
}

const defaultValues = {
  content: '',
};

const letterSchema = Yup.object().shape({
  content: Yup.string().required('편지 내용을 입력해주세요.'),
});

const WritePad = () => {
  const [type, setType] = useState<LetterType>('PRIMARY');
  const methods = useForm<IFormValues>({
    defaultValues,
    resolver: yupResolver(letterSchema),
  });

  const {
    handleSubmit,
    formState: { isValid },
  } = methods;

  const onSubmit = (data: IFormValues) => {
    console.log(data);
  };

  const handleTypeChange = (newType: LetterType) => {
    setType(newType);
  };

  const onInvalid = (error: FieldErrors<IFormValues>) => {
    if (error.content) {
      enqueueSnackbar(error.content.message, { variant: 'error' });
    }
  };

  const handleKeyPress = (
    event: React.KeyboardEvent<HTMLDivElement>,
    newType: LetterType
  ) => {
    if (event.key === 'Enter' || event.key === ' ') {
      handleTypeChange(newType);
    }
  };

  return (
    <section className={styles.section}>
      <FormProvider {...methods}>
        <Letter type={type} />
        <div className={styles.type}>
          <div
            className={styles.item}
            role="button"
            tabIndex={0}
            onClick={() => handleTypeChange(Letters.PRIMARY)}
            onKeyDown={(event) => handleKeyPress(event, Letters.PRIMARY)}
          >
            1
          </div>
          <div
            className={styles.item}
            role="button"
            tabIndex={0}
            onClick={() => handleTypeChange(Letters.BORDER)}
            onKeyDown={(event) => handleKeyPress(event, Letters.BORDER)}
          >
            2
          </div>
          <div
            className={styles.item}
            role="button"
            tabIndex={0}
            onClick={() => handleTypeChange(Letters.LETTER)}
            onKeyDown={(event) => handleKeyPress(event, Letters.LETTER)}
          >
            3
          </div>
        </div>
        <Button
          type="submit"
          size="large"
          full
          onClick={handleSubmit(onSubmit, onInvalid)}
          disabled
        >
          타임캡슐 만들기
        </Button>
      </FormProvider>
    </section>
  );
};

export default WritePad;
