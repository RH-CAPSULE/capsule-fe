import { UseMutationOptions, useMutation } from '@tanstack/react-query';
import { useSnackbar } from 'notistack';
import { useNavigate } from 'react-router-dom';
import { PATH } from 'src/routes/path';
import { addCapsuleHistory } from 'src/utils/localStoregeWriteHandler';
import { axiosInstance } from '../../axios';
import { PATH_API } from '../../path';
import { useGuestCapsuleBox } from './capsule-box';

export const useMakeGuestCapsule = <T>(
  options?: Omit<UseMutationOptions<any, any, T>, 'mutationKey'>
) => {
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const { data } = useGuestCapsuleBox();
  const { capsuleBoxId } = data || {};

  return useMutation({
    mutationFn: async (payload: T) => {
      const response = await axiosInstance.post(PATH_API.GUEST_WRITE, payload);
      return response.data;
    },
    onSuccess: () => {
      enqueueSnackbar('캡슐이 생성되었습니다.', {
        variant: 'success',
      });
      // 작성한 기록 남기기
      addCapsuleHistory(capsuleBoxId!);

      // navigate replace
      navigate(`${PATH.GUEST_HOME}/${capsuleBoxId}`, { replace: true });
    },
    onError: (error) => {
      enqueueSnackbar(error?.message, { variant: 'error' });
    },
    ...options,
  });
};
