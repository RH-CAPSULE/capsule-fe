import { UseMutationOptions, useMutation } from '@tanstack/react-query';
import { useSnackbar } from 'notistack';
import { PATH_API } from '../../path';
import { axiosInstance } from '../../axios';
import { PATH } from '../../../routes/path';

interface Payload {
  userEmail: string;
  password: string;
}

export const usePasswordInit = (
  options?: Omit<UseMutationOptions<any, any, Payload>, 'mutationKey'>
) => {
  const { enqueueSnackbar } = useSnackbar();

  return useMutation({
    mutationFn: async (payload: Payload) => {
      const response = await axiosInstance.post(
        PATH_API.PASSWORD_RESET,
        payload
      );
      return response.data;
    },
    onSuccess: () => {
      enqueueSnackbar('비밀번호가 재설정되었습니다.', { variant: 'success' });
      navigate(PATH.LOGIN);
    },
    onError: (error) => {
      enqueueSnackbar(error?.message, { variant: 'error' });
    },
    ...options,
  });
};
