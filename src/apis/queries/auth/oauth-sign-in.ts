import {
  UseQueryOptions,
  UseQueryResult,
  useQuery,
} from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { axiosInstance } from '../../axios';
import { QUERY_KEY } from '../../queryKeys';

interface Props extends Omit<UseQueryOptions, 'queryKey'> {
  provider: 'google' | 'kakao';
  code: string | null;
}

export const useOAuthSignIn = <T>({ provider, code, ...options }: Props) => {
  return useQuery({
    queryKey: [QUERY_KEY.SIGN_IN],
    queryFn: async () => {
      const response = await axiosInstance.post(`/oauth/${provider}/sign-in`, {
        code,
        // TODO: delete this param
        redirectUri: `${window.location.origin}/oauth-loading`,
      });

      return response.data;
    },
    ...options,
  }) as UseQueryResult<T, AxiosError>;
};
