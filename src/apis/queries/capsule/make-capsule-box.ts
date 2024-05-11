import { UseMutationOptions, useMutation } from '@tanstack/react-query';
import { useSnackbar } from 'notistack';
import { QUERY_KEY } from 'src/apis/queryKeys';
import { PATH_API } from '../../path';
import { axiosInstance } from '../../axios';

export const useMakeCapsuleBox = <T>(
  options?: Omit<UseMutationOptions<any, any, T>, 'mutationKey'>
) => {
  const { enqueueSnackbar } = useSnackbar();

  return useMutation({
    mutationKey: [QUERY_KEY.MAKE_CAPSULE_BOX],
    mutationFn: async (payload: T) => {
      const response = await axiosInstance.post(
        PATH_API.MAKE_CAPSULE_BOX,
        payload
      );
      return response.data;
    },
    onError: (error) => {
      enqueueSnackbar(error.message, { variant: 'error' });
    },
    ...options,
  });
};
