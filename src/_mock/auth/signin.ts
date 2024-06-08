import { http, HttpResponse } from 'msw';
import { PATH_API } from 'src/apis/path';
import { sleep } from '../utils';
import { API_DOMAIN } from '../../static';

export const signInHandler = http.post(
  `${API_DOMAIN}${PATH_API.SIGN_IN}`,
  async ({ request, params, cookies }) => {
    // const { email, password-init } = (await request.json()) as any;

    await sleep(1000);

    return HttpResponse.json(
      {
        accessToken:
          'eyJhbGciOiJIUzI1NiJ9.eyJpZCI6IuuwleuPhOulnOydmOyKiO2NvO2GoO2BsCIsImlhdCI6MTcxNDkwMDExMiwiZXhwIjoxOTE0OTAzNzEyfQ._P5nsbxyq0g7UCKMQT3h20bJVXTOLLNJ6Su7E6EX5fY',
        refreshToken:
          'eyJhbGciOiJIUzI1NiJ9.eyJpZCI6IuuwleuPhOulnOydmOyKiO2NvO2GoO2BsCIsImlhdCI6MTcxNDkwMDExMiwiZXhwIjoxOTE0OTAzNzEyfQ._P5nsbxyq0g7UCKMQT3h20bJVXTOLLNJ6Su7E6EX5fY',
      },
      {
        status: 200,
        statusText: 'Mocked status',
      }
    );
  }
);
