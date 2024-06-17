import {
  UseQueryOptions,
  UseQueryResult,
  useQuery,
} from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { useParams } from 'react-router-dom';
import { ICapsuleBox } from 'src/types';
import { PATH_API } from '../../path';
import { axiosInstance } from '../../axios';
import { QUERY_KEY } from '../../queryKeys';

type Props = Omit<UseQueryOptions, 'queryKey'>;

interface Response extends ICapsuleBox {
  userName: string;
}

export const useGuestCapsuleBox = (params?: Props) => {
  const { capsuleBoxId } = useParams();

  return useQuery({
    queryKey: [QUERY_KEY.GUEST_CAPSULE_BOX],
    queryFn: async () => {
      const response = await axiosInstance.get(
        `${PATH_API.GUEST_CAPSULE_BOX}/${capsuleBoxId}`
      );
      return response.data;
    },
    // 계속 가지고 있을 거임
    gcTime: Infinity,
    staleTime: Infinity,
    enabled: !!capsuleBoxId,
    ...params,
  }) as UseQueryResult<Response, AxiosError>;
};
