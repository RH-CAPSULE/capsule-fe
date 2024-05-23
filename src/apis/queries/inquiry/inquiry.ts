import { UseMutationOptions, useMutation } from '@tanstack/react-query';
import { useSnackbar } from 'notistack';
import { QUERY_KEY } from 'src/apis/queryKeys';
import { PATH_API } from '../../path';
import { axiosInstance } from '../../axios';

export const useInquiry = <T>(
  options?: Omit<UseMutationOptions<any, any, T>, 'mutationKey'>
) => {
  const { enqueueSnackbar } = useSnackbar();

  return useMutation({
    mutationKey: [QUERY_KEY.INQUIRY],
    mutationFn: async (payload: T) => {
      const response = await axiosInstance.post(PATH_API.INQUIRY, payload);
      return response.data;
    },
    onSuccess: () => {
      enqueueSnackbar('문의가 성공적으로 전송되었습니다.', {
        variant: 'success',
      });
    },
    onError: (error) => {
      enqueueSnackbar(error?.message, { variant: 'error' });
    },
    ...options,
  });
};
