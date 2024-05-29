import {
  UseMutationOptions,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';
import { useSnackbar } from 'notistack';
import { removeSession } from 'src/auth/utils';
import { useNavigate } from 'react-router-dom';
import { PATH } from 'src/routes/path';
import { PATH_API } from '../../path';
import { axiosInstance } from '../../axios';
import { QUERY_KEY } from '../../queryKeys';

export const useResign = (
  options?: Omit<UseMutationOptions, 'mutationKey'>
) => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { enqueueSnackbar } = useSnackbar();

  return useMutation({
    mutationKey: [QUERY_KEY.USER_RESIGN],
    mutationFn: async () => {
      const response = await axiosInstance.delete(PATH_API.USER_RESIGN);
      return response.data;
    },
    onSuccess: () => {
      removeSession();
      queryClient.clear();
      navigate(PATH.LOGIN);
    },
    onError: (error) => {
      enqueueSnackbar(error?.message, { variant: 'error' });
    },
    ...options,
  });
};
