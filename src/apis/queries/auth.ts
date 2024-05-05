import { UseQueryOptions, useQuery } from '@tanstack/react-query';
import { PATH_API } from '../path';
import { axiosInstance } from '../axios';
import { QUERY_KEY } from '../queryKeys';

type Props = Omit<UseQueryOptions, 'queryKey'>;

export const useUserInfo = (params?: Props) => {
  return useQuery({
    queryKey: [QUERY_KEY.USER_INFO],
    queryFn: async () => {
      const response = await axiosInstance(PATH_API.MY_ACCOUNT);
      return response.data;
    },
    // 계속 가지고 있을 거임
    gcTime: Infinity,
    staleTime: Infinity,
    ...params,
  });
};
