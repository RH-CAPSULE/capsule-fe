import {
  useQuery,
  UseQueryResult,
  useQueryClient,
  UseQueryOptions,
} from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { getUserId, isValidToken, setSession } from 'src/auth/utils';
import { ACCESS_TOKEN_KEY, REFRESH_TOKEN_KEY } from 'src/static';
import localStorageAvailable from 'src/utils/localStorageAvailable';
import { IUser } from 'src/types';
import { PATH_API } from '../../path';
import { axiosInstance } from '../../axios';
import { QUERY_KEY } from '../../queryKeys';

type Props = Omit<UseQueryOptions, 'queryKey'>;

export const useAuth = <T>(params?: Props) => {
  return useQuery({
    queryKey: [QUERY_KEY.USER_INFO],
    queryFn: async () => {
      if (!localStorageAvailable()) {
        throw new Error('Error! 인증 정보를 가져올 수 없음');
      }
      const accessToken = localStorage.getItem(ACCESS_TOKEN_KEY!);
      const refreshToken = localStorage.getItem(REFRESH_TOKEN_KEY!);

      if (!accessToken) {
        throw new Error('Error! Not found access token');
      }

      if (!refreshToken || !isValidToken(refreshToken)) {
        throw new Error('Error! refresh 토큰 만료');
      }

      if (!isValidToken(accessToken)) {
        // refresh access token
      }

      setSession({ accessToken, refreshToken });

      const response = await axiosInstance.get(PATH_API.USER_INFO);

      return {
        ...response.data,
        id: getUserId(),
      };
    },
    // 계속 가지고 있을 거임
    gcTime: Infinity,
    staleTime: Infinity,
    ...params,
  }) as UseQueryResult<T, AxiosError>;
};

//
export const useCachedUser = () => {
  const queryClient = useQueryClient();
  const user = queryClient.getQueryData<IUser>([QUERY_KEY.USER_INFO]);
  return { user };
};
