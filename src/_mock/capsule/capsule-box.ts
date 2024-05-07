import { http, HttpResponse } from 'msw';
import { PATH_API } from 'src/apis/path';
import { sleep } from '../utils';
import { API_DOMAIN } from '../../static';

export const capsuleBoxHandler = http.get(
  `${API_DOMAIN}${PATH_API.CAPSULE_BOX}`,
  async ({ request, params, cookies }) => {
    await sleep(1000);

    return HttpResponse.json(
      {
        capsuleBoxId: 1,
        theme: 'PURPLE',
        openedAt: new Date(2024, 7, 31).toISOString(),
        closedAt: new Date(2024, 6, 30).toISOString(),
        capsules: ['#aabbcc', '#ddeeff'],
      },
      {
        status: 200,
        statusText: 'Mocked status',
      }
    );
  }
);
