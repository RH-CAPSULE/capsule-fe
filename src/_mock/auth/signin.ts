// eslint-disable-next-line import/no-extraneous-dependencies
import { http, HttpResponse } from 'msw';
import { sleep } from '../utils';
import { API_DOMAIN } from '../../static';

export const signInHandler = http.post(
  `${API_DOMAIN}/auth/signin`,
  async ({ request, params, cookies }) => {
    // const { email, password } = (await request.json()) as any;

    await sleep(1000);

    return HttpResponse.json(
      {
        accessToken:
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwiaWQiOiLrsJXrj4TrpZzsnZjsiojtjbzthqDtgbAiLCJpYXQiOjE1MTYyMzkwMjJ9.j9YVMqzebeAsKhNuTTTFTRuFMndbZ1tNmod3-duDbZo',
        refreshToken:
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwiaWQiOiLrsJXrj4TrpZzsnZjsiojtjbzthqDtgbAiLCJpYXQiOjE1MTYyMzkwMjJ9.j9YVMqzebeAsKhNuTTTFTRuFMndbZ1tNmod3-duDbZo',
      },
      {
        status: 200,
        statusText: 'Mocked status',
      }
    );
  }
);
