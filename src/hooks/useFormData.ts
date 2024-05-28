import { enqueueSnackbar } from 'notistack';
import { useNavigate } from 'react-router-dom';
import { FieldErrors, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import React from 'react';
import { queryClient } from '../apis/queryClient';
import { QUERY_KEY } from '../apis/queryKeys';
import { PATH } from '../routes/path';
import { useMakeCapsule } from '../apis/queries/capsule/make-capsule';
import { useSearchParams } from '../utils/useSearchParam';

interface IFormValues {
  title: string;
  content: string;
  writer: string;
  fileInputRef?: React.RefObject<HTMLInputElement>;
  recodeRef?: React.RefObject<MediaRecorder | null>;
  audioChunks?: Blob[];
}

const defaultValues = {
  title: '',
  content: '',
  writer: '',
  fileInputRef: { current: null },
  recodeRef: { current: null },
  audioChunks: [],
};

interface props {
  type: string;
}

const letterSchema = Yup.object().shape({
  title: Yup.string().required('제목을 입력해주세요.'),
  content: Yup.string().required('내용을 입력해주세요.'),
  writer: Yup.string().required('작성자를 입력해주세요.'),
});

export const useFormData = ({ type }: props) => {
  const navigate = useNavigate();
  const makeCapsuleMutate = useMakeCapsule();

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

  const onInvalid = (error: FieldErrors<IFormValues>) => {
    if (error.content) {
      enqueueSnackbar(error.content.message, { variant: 'error' });
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
              color: type,
              title: data.title,
              content: data.content,
              writer: data.writer,
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

  return { onSubmit, onInvalid, handleSubmit, methods };
};
