import { UseMutationOptions, useMutation } from '@tanstack/react-query';
import { useAuthStore } from 'src/store/auth';
import { useSnackbar } from 'notistack';
import { removeSession } from 'src/auth/utils';
import { useNavigate } from 'react-router-dom';
import { PATH } from 'src/routes/path';
import { PATH_API } from '../../path';
import { axiosInstance } from '../../axios';
import { QUERY_KEY } from '../../queryKeys';

export const useSignOut = (
  options?: Omit<UseMutationOptions, 'mutationKey'>
) => {
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const setIsLoggedIn = useAuthStore((state) => state.setIsLoggedIn);

  return useMutation({
    mutationKey: [QUERY_KEY.SIGN_IN],
    mutationFn: async () => {
      const response = await axiosInstance.delete(PATH_API.SIGN_OUT);
      return response.data;
    },
    onSuccess: () => {
      removeSession();
      setIsLoggedIn(false);
      navigate(PATH.LOGIN);
    },
    onError: (error) => {
      enqueueSnackbar(error.message, { variant: 'error' });
    },
    ...options,
  });
};
