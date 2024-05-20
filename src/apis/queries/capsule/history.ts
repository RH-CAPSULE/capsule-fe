import {
  InfiniteData,
  UseInfiniteQueryResult,
  useInfiniteQuery,
} from '@tanstack/react-query';
import { ICapsuleBox } from 'src/types';
import { PATH_API } from '../../path';
import { axiosInstance } from '../../axios';
import { QUERY_KEY } from '../../queryKeys';

interface ResponseType {
  prev: number | null;
  next: number | null;
  content: ICapsuleBox[];
}

export const useCapsuleHistory = (props?: any) => {
  return useInfiniteQuery({
    queryKey: [QUERY_KEY.HISTORY],
    queryFn: async ({ pageParam: page }) => {
      const response = await axiosInstance.get(PATH_API.HISTORY, {
        params: { page, size: 20 },
      });
      return response.data;
    },
    initialPageParam: 0,
    ...props,
    getNextPageParam: (lastData: any, _allData) => {
      return lastData?.next === null ? undefined : lastData?.next || 0;
    },
    // keepPreviousData: true,
  }) as UseInfiniteQueryResult<InfiniteData<ResponseType>, any>;
};
