import { InfiniteData, useQueryClient } from '@tanstack/react-query';
import React from 'react';
import { FormProvider } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import { useCapsuleDetail } from 'src/apis/queries/capsule';
import { QUERY_KEY } from 'src/apis/queryKeys';
import { Letter as LetterComponent } from 'src/components/letter';
import { useFormData } from 'src/hooks/useFormData';
import { ICapsule } from 'src/types';

interface ResponseType {
  prev: number | null;
  next: number | null;
  content: ICapsule[];
}

const useCachedCapsule = () => {
  const { id: capsuleId } = useParams();
  const queryClient = useQueryClient();

  const list = queryClient.getQueryData<InfiniteData<ResponseType>>([
    QUERY_KEY.CAPSULE_LIST,
  ]);

  let cachedCapsule: ICapsule | null = null;

  list?.pages.forEach((group, i) => {
    group.content.forEach((capsule) => {
      if (String(capsule.capsuleId) === capsuleId) {
        cachedCapsule = capsule;
      }
    });
  });

  return cachedCapsule;
};

const CapsuleDetailSection = () => {
  const { id: capsuleId } = useParams();
  const cachedCapsule = useCachedCapsule();

  const { data } = useCapsuleDetail<ICapsule>({
    capsuleId,
    enabled: !!capsuleId || !!cachedCapsule,
  });

  const capsule = data || cachedCapsule;

  // 고쳐야댐
  const fileInputRef = React.useRef<HTMLInputElement>(null);
  const mediaRecorderRef = React.useRef<MediaRecorder | null>(null);
  const [audioChunks, setAudioChunks] = React.useState<Blob[]>([]);

  const { onSubmit, onInvalid, handleSubmit, methods } = useFormData({
    type: capsule?.theme || 'PRIMARY',
    fileInputRef,
    audioChunks,
  });

  if (!capsule) {
    return null;
  }

  return (
    <div>
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <LetterComponent
            type={capsule.theme}
            fileInputRef={fileInputRef}
            mediaRecorderRef={mediaRecorderRef}
            audioChunks={audioChunks}
            setAudioChunks={setAudioChunks}
          />
        </form>
      </FormProvider>
    </div>
  );
};

export default CapsuleDetailSection;
