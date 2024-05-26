import { InfiniteData, useQueryClient } from '@tanstack/react-query';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import { useCapsuleDetail } from 'src/apis/queries/capsule';
import { QUERY_KEY } from 'src/apis/queryKeys';
import { FormProvider } from 'src/components/hook-form';
import { LetterView } from 'src/components/letter';
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

  const capsule = cachedCapsule || data;

  const methods = useForm({ defaultValues: capsule || {} });

  React.useEffect(() => {
    if (capsule) {
      methods.reset(capsule);
    }
  }, [capsule, methods]);

  if (!capsule) {
    return null;
  }

  return (
    <div>
      <FormProvider methods={methods}>
        <LetterView />
      </FormProvider>
    </div>
  );
};

export default CapsuleDetailSection;
