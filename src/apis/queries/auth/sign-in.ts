import { UseMutationOptions, useMutation } from '@tanstack/react-query';
import { useAuthStore } from 'src/store/auth';
import { useSnackbar } from 'notistack';
import { setSession } from 'src/auth/utils';
import { PATH_API } from '../../path';
import { axiosInstance } from '../../axios';
import { QUERY_KEY } from '../../queryKeys';

export const useSignIn = <T>(
  options?: Omit<UseMutationOptions<any, any, T>, 'mutationKey'>
) => {
  const { enqueueSnackbar } = useSnackbar();
  const setIsLoggedIn = useAuthStore((state) => state.setIsLoggedIn);

  return useMutation({
    mutationKey: [QUERY_KEY.SIGN_IN],
    mutationFn: async (payload: T) => {
      const response = await axiosInstance.post(PATH_API.SIGN_IN, payload);
      return response.data;
    },
    onSuccess: (data) => {
      setSession(data);
      setIsLoggedIn(true);
    },
    onError: (error) => {
      enqueueSnackbar(error.message, { variant: 'error' });
    },
    ...options,
  });
};
