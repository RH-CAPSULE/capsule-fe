import { UseMutationOptions, useMutation } from '@tanstack/react-query';
import { useSnackbar } from 'notistack';
import { EmailVerifyPurpose } from 'src/types/auth';
import { PATH_API } from '../../path';
import { axiosInstance } from '../../axios';

interface Payload {
  userEmail: string;
  purpose: EmailVerifyPurpose;
}

export const useSendEmail = (
  options?: Omit<UseMutationOptions<any, any, Payload>, 'mutationKey'>
) => {
  const { enqueueSnackbar } = useSnackbar();

  return useMutation({
    mutationFn: async (payload: Payload) => {
      const response = await axiosInstance.post(PATH_API.SEND_EMAIL, payload);
      return response.data;
    },
    onError: (error) => {
      enqueueSnackbar(error?.message, { variant: 'error' });
    },
    ...options,
  });
};
