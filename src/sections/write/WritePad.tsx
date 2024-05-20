import React, { useRef, useState } from 'react';
import { FieldErrors, FormProvider, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { enqueueSnackbar } from 'notistack';

// styles
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { A11y } from 'swiper/modules';
import { Swiper as ISwiper } from 'swiper/types';
import styles from './styles.module.scss';

// components
import { Button } from '../../components/button';
import { Letter as LetterComponent } from '../../components/letter';
import { Letters, LetterType } from '../../types/letter';
import { QUERY_KEY } from '../../apis/queryKeys';
import { useMakeCapsule } from '../../apis/queries/capsule/make-capsule';
import { queryClient } from '../../apis/queryClient';
import { useSearchParams } from '../../utils/useSearchParam';
import { PATH } from '../../routes/path';
import LetterSelector from './LetterSelector';
import { useFormData } from '../../hooks/useFormData';

/**
 *  WritePad 사용자가 타임캡슐을 작성하는 페이지
 */

const WritePad = () => {
  const [type, setType] = useState<LetterType>('PRIMARY');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const [audioChunks, setAudioChunks] = useState<Blob[]>([]);

  const { onSubmit, onInvalid, handleSubmit, methods } = useFormData({
    type,
    fileInputRef,
    audioChunks,
  });

  return (
    <section className={styles.section}>
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <LetterComponent
            type={type}
            fileInputRef={fileInputRef}
            mediaRecorderRef={mediaRecorderRef}
            audioChunks={audioChunks}
            setAudioChunks={setAudioChunks}
          />
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
