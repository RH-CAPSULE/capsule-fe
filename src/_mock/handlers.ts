// eslint-disable-next-line import/no-extraneous-dependencies
import { http, HttpResponse } from 'msw';
import { sleep } from './utils';

export const handlers = [
  http.get('http://localhost:3000/test', async ({ request, params, cookies }) => {
    await sleep(2000);

    return HttpResponse.json(
      {
        message: 'Mocked response',
      },
      {
        status: 202,
        statusText: 'Mocked status',
      }
    );
  }),
];
