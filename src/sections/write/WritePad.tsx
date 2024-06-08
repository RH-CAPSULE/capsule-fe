import React, { useRef, useState } from 'react';
import { FieldErrors, FormProvider, useForm } from 'react-hook-form';
import * as Yup from 'yup';

// components
import { Button } from 'src/components/button';
import { Letter as LetterComponent } from 'src/components/letter';
import { LetterType } from 'src/types/letter';

import { yupResolver } from '@hookform/resolvers/yup';
import { enqueueSnackbar } from 'notistack';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useMakeCapsule } from 'src/apis/queries/capsule';
import { queryClient } from 'src/apis/queryClient';
import { QUERY_KEY } from 'src/apis/queryKeys';
import { PATH } from 'src/routes/path';
import { Modal } from 'src/components/modal';
import { Capsule } from 'src/components/capsule';
import styles from './styles.module.scss';
// styles
import LetterSelector from './LetterSelector';

interface IFormValues {
  title: string;
  content: string;
  writer: string;
  color: string;
  audioChunks?: Blob[];
  recodeRef?: React.RefObject<MediaRecorder | null>;
  /*
   * react hook form 버그 발견
   * 타입 직접 적용하면 setValue에서 타입체킹 무한루프 발생.
   * 나중에 확인 예정
   */
  fileInputRef?: any;
  audioButtonRef?: any;
}
// fileInputRef?: React.RefObject<HTMLInputElement>;
// audioButtonRef?: React.RefObject<HTMLButtonElement>;

const defaultValues = {
  title: '',
  content: '',
  writer: '',
  color: '#F53C40',
  fileInputRef: { current: null },
  recodeRef: { current: null },
  audioChunks: [],
  audioButtonRef: { current: null },
};

const letterSchema = Yup.object().shape({
  title: Yup.string().required('제목을 입력해주세요.'),
  content: Yup.string().required('내용을 입력해주세요.'),
  writer: Yup.string().required('작성자를 입력해주세요.'),
  color: Yup.string().required('색상을 선택해주세요.'),
});

/**
 *  WritePad 사용자가 타임캡슐을 작성하는 페이지
 */
const WritePad = () => {
  const [type, setType] = useState<LetterType>('PRIMARY');
  const [colorSelectorOpen, setColorSelectorOpen] = useState(false);
  const colorSelectorRef = useRef<HTMLInputElement>(null);

  const navigate = useNavigate();
  const makeCapsuleMutate = useMakeCapsule();

  const [searchParams] = useSearchParams();
  const capsuleBoxId = searchParams.get('id');

  const methods = useForm<IFormValues>({
    defaultValues,
    resolver: yupResolver(letterSchema),
  });

  const { watch, setValue, handleSubmit } = methods;

  const onInValid = (error: FieldErrors<IFormValues>) => {
    if (error.title) {
      enqueueSnackbar(error.title.message, { variant: 'error' });
      return;
    }
    if (error.content) {
      enqueueSnackbar(error.content.message, { variant: 'error' });
      return;
    }
    if (error.writer) {
      enqueueSnackbar(error.writer.message, { variant: 'error' });
    }
  };

  const onSubmit = async (data: IFormValues) => {
    try {
      const formData = new FormData();

      formData.append(
        'capsule',
        new Blob(
          [
            JSON.stringify({
              capsuleBoxId,
              theme: type,
              title: data.title,
              content: data.content,
              writer: data.writer,
              color: data.color,
            }),
          ],
          { type: 'application/json' }
        )
      );

      if (data.fileInputRef?.current?.files?.[0]) {
        formData.append('image', data.fileInputRef.current.files[0]);
      }

      if (data.audioChunks?.length && data.audioChunks.length > 0) {
        const audioBlob = new Blob(data.audioChunks, { type: 'audio/wav' });
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

  const values = watch();

  return (
    <section className={styles.section}>
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit, onInValid)}>
          <LetterComponent type={type} />
        </form>
        <LetterSelector type={type} onTypeChange={setType} />
        <Button size="large" full onClick={() => setColorSelectorOpen(true)}>
          타임캡슐 만들기
        </Button>

        {/* Color selector modal */}
        <Modal
          className={styles.colorSelector}
          open={colorSelectorOpen}
          onClose={() => setColorSelectorOpen(false)}
        >
          <Modal.Title className={styles.colorSelectorTitle}>
            캡슐 색상을 선택해주세요.
          </Modal.Title>
          <Modal.Content className={styles.colorSelectorContent}>
            <Capsule
              color={values.color}
              onClick={() => colorSelectorRef?.current?.showPicker()}
            />
            <input
              type="color"
              value={values.color}
              onChange={(e) => setValue('color', e.target.value as any)}
              ref={colorSelectorRef}
            />
          </Modal.Content>
          <Modal.Action>
            <Button
              size="large"
              full
              loading={makeCapsuleMutate.isPending}
              onClick={handleSubmit(onSubmit, onInValid)}
            >
              타임캡슐 만들기
            </Button>
          </Modal.Action>
        </Modal>
      </FormProvider>
    </section>
  );
};

export default WritePad;
