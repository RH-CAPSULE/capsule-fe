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

/**
 *  WritePad 는 사용자가 타임캡슐을 작성하는 페이지입니다.
 * {
 *   "capsule": {
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
  title: string;
  content: string;
  writer: string;
}

const defaultValues = {
  title: '',
  content: '',
  writer: '',
};

const letterSchema = Yup.object().shape({
  title: Yup.string().required('제목을 입력해주세요.'),
  content: Yup.string().required('내용을 입력해주세요.'),
  writer: Yup.string().required('작성자를 입력해주세요.'),
});

const Letter = [Letters.PRIMARY, Letters.LETTER, Letters.BORDER];

const WritePad = () => {
  const [type, setType] = useState<LetterType>('PRIMARY');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const [audioChunks, setAudioChunks] = useState<Blob[]>([]);
  const navigate = useNavigate();

  const searchParams = useSearchParams();
  const capsuleBoxId = searchParams.get('id');

  const methods = useForm<IFormValues>({
    defaultValues,
    resolver: yupResolver(letterSchema),
  });

  const {
    handleSubmit,
    formState: { isValid },
  } = methods;

  const makeCapsuleMutate = useMakeCapsule();

  const onSubmit = async (data: IFormValues) => {
    try {
      const formData = new FormData();

      formData.append(
        'capsule',
        new Blob(
          [
            JSON.stringify({
              capsuleBoxId,
              color: type,
              title: data.title,
              content: data.content,
              writer: data.writer,
            }),
          ],
          { type: 'application/json' }
        )
      );

      if (fileInputRef.current?.files?.[0]) {
        formData.append('image', fileInputRef.current.files[0]);
      }

      if (audioChunks.length > 0) {
        const audioBlob = new Blob(audioChunks, { type: 'audio/wav' });
        formData.append('audio', audioBlob);
      }

      makeCapsuleMutate.mutate(formData, {
        onSuccess: () => {
          enqueueSnackbar('캡슐함이 생성되었습니다.', { variant: 'success' });
          queryClient.invalidateQueries({ queryKey: [QUERY_KEY.MAKE_CAPSULE] });
          navigate(PATH.HOME);
        },
      });
    } catch (error) {
      console.error('Error submitting form:', error);
    }
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
        <form onSubmit={handleSubmit(onSubmit)}>
          <LetterComponent
            type={type}
            fileInputRef={fileInputRef}
            mediaRecorderRef={mediaRecorderRef}
            audioChunks={audioChunks}
            setAudioChunks={setAudioChunks}
          />
        </form>
        <div className={styles.body}>
          <Swiper
            initialSlide={0}
            modules={[A11y]}
            pagination={{
              type: 'bullets',
              clickable: true,
            }}
            spaceBetween={15}
            className="swiperCapsule"
            onSlideChange={(swiper: ISwiper) =>
              setType(Letter[swiper.activeIndex])
            }
          >
            {Letter.map((value, index) => (
              <SwiperSlide key={value} className="slideStyle">
                <div
                  className={styles.item}
                  role="button"
                  tabIndex={index}
                  onClick={() => handleTypeChange(Letter[index])}
                  onKeyDown={(event) => handleKeyPress(event, Letter[index])}
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
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
