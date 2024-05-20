import React, { useRef, useState } from 'react';
import { FieldErrors, FormProvider, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { enqueueSnackbar } from 'notistack';

// styles
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import styles from './styles.module.scss';

// components
import { Button } from '../../components/button';
import { Letter } from '../../components/letter';
import { Letters, LetterType } from '../../types/letter';
import { useMakeCapsuleBox } from '../../apis/queries/capsule';
import { formatISODate } from '../../utils/date';
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
    console.log(data);
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

      console.log(formData.get('capsule'));

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
          <Letter
            type={type}
            fileInputRef={fileInputRef}
            mediaRecorderRef={mediaRecorderRef}
            audioChunks={audioChunks}
            setAudioChunks={setAudioChunks}
          />
        </form>

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
        >
          타임캡슐 만들기
        </Button>
      </FormProvider>
    </section>
  );
};

export default WritePad;
