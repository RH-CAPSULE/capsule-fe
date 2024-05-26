import {
  UseQueryOptions,
  UseQueryResult,
  useQuery,
} from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { PATH_API } from '../../path';
import { axiosInstance } from '../../axios';
import { QUERY_KEY } from '../../queryKeys';

type Props = {
  capsuleId?: string;
} & Omit<UseQueryOptions, 'queryKey'>;

export const useCapsuleDetail = <T>({ capsuleId, ...other }: Props) => {
  return useQuery({
    queryKey: [QUERY_KEY.CAPSULE_DETAIL, capsuleId],
    queryFn: async () => {
      const response = await axiosInstance.get(
        `${PATH_API.CAPSULE_DETAIL}/${capsuleId}`
      );
      return response.data;
    },
    // 계속 가지고 있을 거임
    gcTime: Infinity,
    staleTime: Infinity,
    enabled: !!capsuleId,
    ...other,
  }) as UseQueryResult<T, AxiosError>;
};
