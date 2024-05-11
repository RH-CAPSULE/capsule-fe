import { http, HttpResponse } from 'msw';
import { PATH_API } from 'src/apis/path';
import { sleep } from '../utils';
import { API_DOMAIN } from '../../static';

export const userInfoHandler = http.get(
  `${API_DOMAIN}${PATH_API.USER_INFO}`,
  async ({ request, params, cookies }) => {
    await sleep(3000);

    return HttpResponse.json(
      {
        userName: '김민륜',
        userEmail: 'dmd77@gmail.com',
      },
      {
        status: 200,
        statusText: 'Mocked status',
      }
    );
  }
);
