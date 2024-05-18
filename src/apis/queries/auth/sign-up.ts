import { UseMutationOptions, useMutation } from '@tanstack/react-query';
import { useSnackbar } from 'notistack';
import { useNavigate } from 'react-router-dom';
import { PATH } from 'src/routes/path';
import { PATH_API } from '../../path';
import { axiosInstance } from '../../axios';
import { QUERY_KEY } from '../../queryKeys';

export const useSignUp = <T>(
  options?: Omit<UseMutationOptions<any, any, T>, 'mutationKey'>
) => {
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();

  return useMutation({
    mutationKey: [QUERY_KEY.SIGN_UP],
    mutationFn: async (payload: T) => {
      const response = await axiosInstance.post(PATH_API.SIGN_UP, payload);
      return response.data;
    },
    onSuccess: () => {
      enqueueSnackbar('회원가입이 완료되었습니다.', { variant: 'success' });
      navigate(PATH.LOGIN);
    },
    onError: (error) => {
      enqueueSnackbar(error?.message, { variant: 'error' });
    },
    ...options,
  });
};
