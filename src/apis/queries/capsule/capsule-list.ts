import {
  InfiniteData,
  UseInfiniteQueryOptions,
  UseInfiniteQueryResult,
  useInfiniteQuery,
} from '@tanstack/react-query';
import { ICapsule } from 'src/types';
import { PATH_API } from '../../path';
import { axiosInstance } from '../../axios';
import { QUERY_KEY } from '../../queryKeys';

interface ResponseType {
  prev: number | null;
  next: number | null;
  content: ICapsule[];
}

type Props = {
  capsuleBoxId?: string;
} & Omit<
  UseInfiniteQueryOptions,
  'queryKey' | 'initialPageParam' | 'getNextPageParam'
>;

export const useCapsuleList = ({ capsuleBoxId, ...other }: Props) => {
  return useInfiniteQuery({
    queryKey: [QUERY_KEY.CAPSULE_LIST],
    queryFn: async ({ pageParam: page }) => {
      const response = await axiosInstance.get(
        `${PATH_API.CAPSULE_LIST}/${capsuleBoxId}`,
        {
          params: { page, size: 20 },
        }
      );
      return response.data;
    },
    ...other,
    initialPageParam: 0,
    getNextPageParam: (lastData: any, _allData) => {
      return lastData?.next === null ? undefined : lastData?.next || 0;
    },
    // keepPreviousData: true,
  }) as UseInfiniteQueryResult<InfiniteData<ResponseType>, any>;
};
