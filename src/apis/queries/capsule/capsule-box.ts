import {
  UseQueryOptions,
  UseQueryResult,
  useQuery,
} from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { PATH_API } from '../../path';
import { axiosInstance } from '../../axios';
import { QUERY_KEY } from '../../queryKeys';

type Props = Omit<UseQueryOptions, 'queryKey'>;

export const useCapsuleBox = <T>(params?: Props) => {
  return useQuery({
    queryKey: [QUERY_KEY.CAPSULE_BOX],
    queryFn: async () => {
      const response = await axiosInstance.get(PATH_API.CAPSULE_BOX);
      return response.data;
    },
    // 계속 가지고 있을 거임
    gcTime: Infinity,
    staleTime: Infinity,
    ...params,
  }) as UseQueryResult<T, AxiosError>;
};
