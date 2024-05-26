import React from 'react';
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import { useCapsuleDetail } from 'src/apis/queries/capsule';
import { FormProvider } from 'src/components/hook-form';
import { LetterView } from 'src/components/letter';
import { ICapsule } from 'src/types';

const CapsuleDetailSection = () => {
  const { id: capsuleId } = useParams();

  const { data: capsule } = useCapsuleDetail<ICapsule>({
    capsuleId,
    enabled: !!capsuleId,
  });

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
