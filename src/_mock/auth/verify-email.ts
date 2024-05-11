import { http, HttpResponse } from 'msw';
import { PATH_API } from 'src/apis/path';
import { sleep } from '../utils';
import { API_DOMAIN } from '../../static';

export const verifyEmailHandler = http.post(
  `${API_DOMAIN}${PATH_API.VERIFY_EMAIL}`,
  async ({ request, params, cookies }) => {
    await sleep(1000);

    return HttpResponse.json(
      {},
      {
        status: 200,
        statusText: 'Mocked status',
      }
    );
  }
);
