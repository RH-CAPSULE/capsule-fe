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

/**
 *  WritePad 는 사용자가 타임캡슐을 작성하는 페이지입니다.
 * {
 *   "capsule": {
 *     "userId": 0,
 *     "capsuleBoxId": 0,
 *     "color": "string",
 *     "title": "string",
 *     "content": "string",
 *     "writer": "string"
 *   },
 *   "image": "string",
 *   "audio": "string"
 * }
 */

interface IFormValues {
  content: string;
}

export type LetterType = 'PRIMARY' | 'LETTER' | 'BORDER';

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
            onClick={() => handleTypeChange('PRIMARY')}
            onKeyDown={(event) => handleKeyPress(event, 'PRIMARY')}
          >
            1
          </div>
          <div
            className={styles.item}
            role="button"
            tabIndex={0}
            onClick={() => handleTypeChange('BORDER')}
            onKeyDown={(event) => handleKeyPress(event, 'BORDER')}
          >
            2
          </div>
          <div
            className={styles.item}
            role="button"
            tabIndex={0}
            onClick={() => handleTypeChange('LETTER')}
            onKeyDown={(event) => handleKeyPress(event, 'LETTER')}
          >
            3
          </div>
        </div>
        <Button
          type="submit"
          theme="GRAY"
          size="large"
          full
          onClick={handleSubmit(onSubmit, onInvalid)}
        >
          타임캡슐 만들기
        </Button>
      </FormProvider>
    </section>
  );
};

export default WritePad;
