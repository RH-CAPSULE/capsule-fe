import React, { useRef, useState } from 'react';
import { FieldErrors, FormProvider, useForm } from 'react-hook-form';

// styles

import styles from './styles.module.scss';

// components
import { Button } from '../../components/button';
import { Letter as LetterComponent } from '../../components/letter';
import { Letters, LetterType } from '../../types/letter';

import LetterSelector from './LetterSelector';
import { useFormData } from '../../hooks/useFormData';

/**
 *  WritePad 사용자가 타임캡슐을 작성하는 페이지
 */

const WritePad = () => {
  const [type, setType] = useState<LetterType>('PRIMARY');

  const { onSubmit, onInvalid, handleSubmit, methods } = useFormData({
    type,
  });

  return (
    <section className={styles.section}>
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <LetterComponent type={type} />
        </form>
        <LetterSelector type={type} onTypeChange={setType} />
        <Button
          type="submit"
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
