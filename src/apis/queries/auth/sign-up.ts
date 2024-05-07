import { UseMutationOptions, useMutation } from '@tanstack/react-query';
import { useAuthStore } from 'src/store';
import { useSnackbar } from 'notistack';
import { setSession } from 'src/auth/utils';
import { PATH_API } from '../../path';
import { axiosInstance } from '../../axios';
import { QUERY_KEY } from '../../queryKeys';

export const useSignUp = <T>(
  options?: Omit<UseMutationOptions<any, any, T>, 'mutationKey'>
) => {
  const { enqueueSnackbar } = useSnackbar();
  const setIsSignUp = useAuthStore((state) => state.setIsSignUp);

  return useMutation({
    mutationKey: [QUERY_KEY.SIGN_UP],
    mutationFn: async (payload: T) => {
      const response = await axiosInstance.post(PATH_API.SIGN_UP, payload);
      return response.data;
    },
    onSuccess: (data) => {
      setSession(data);
      setIsSignUp(true);
    },
    onError: (error) => {
      enqueueSnackbar(error.message, { variant: 'error' });
    },
    ...options,
  });
};
