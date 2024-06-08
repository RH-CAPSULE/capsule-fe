// routes
import { handleAlert } from 'react-handle-alert';
import { axiosInstance } from 'src/apis/axios';
import { ACCESS_TOKEN_KEY, REFRESH_TOKEN_KEY } from 'src/static';
import { PATH_API } from 'src/apis/path';
import { IToken } from './types';
// utils

// ----------------------------------------------------------------------

function jwtDecode(token: string) {
  const base64Url = token.split('.')[1];
  const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  const jsonPayload = decodeURIComponent(
    window
      .atob(base64)
      .split('')
      .map((c) => `%${`00${c.charCodeAt(0).toString(16)}`.slice(-2)}`)
      .join('')
  );

  return JSON.parse(jsonPayload);
}

// ----------------------------------------------------------------------

export const isValidToken = (accessToken: string) => {
  if (!accessToken) {
    return false;
  }

  const decoded = jwtDecode(accessToken);

  const currentTime = Date.now() / 1000;

  return decoded.exp > currentTime;
};

// ----------------------------------------------------------------------

const tokenRefresh = async () => {
  const refreshToken = localStorage.getItem(REFRESH_TOKEN_KEY!);
  if (refreshToken) {
    try {
      const response = await axiosInstance.post(PATH_API.TOKEN_REISSUE, {
        refreshToken,
      });

      const newAccessToken = response.data.accessToken;
      localStorage.setItem(ACCESS_TOKEN_KEY!, newAccessToken);

      axiosInstance.defaults.headers.common.Authorization = `Bearer ${newAccessToken}`;

      const { exp } = jwtDecode(newAccessToken);
      tokenExpired(exp);

      return newAccessToken;
    } catch {
      handleAlert('로그인이 만료되었습니다.');

      localStorage.removeItem(ACCESS_TOKEN_KEY!);
      localStorage.removeItem(REFRESH_TOKEN_KEY!);

      window.location.reload();
    }
  }
};

export const tokenExpired = (exp: number) => {
  // eslint-disable-next-line prefer-const
  let expiredTimer;

  const currentTime = Date.now();

  // 만료 되기 5분 전에 토큰 갱신
  // Test token expires after 10s
  const timeLeft = exp * 1000 - currentTime;

  clearTimeout(expiredTimer);

  // 1일보다 많이 남으면 실행하지 않음
  if (timeLeft >= 86400000) {
    return;
  }

  expiredTimer = setTimeout(() => {
    tokenRefresh();
  }, timeLeft);
};

// ----------------------------------------------------------------------

export const setSession = (token: IToken) => {
  const { accessToken, refreshToken } = token;
  if (accessToken && refreshToken) {
    localStorage.setItem(ACCESS_TOKEN_KEY!, accessToken);
    localStorage.setItem(REFRESH_TOKEN_KEY!, refreshToken);

    axiosInstance.defaults.headers.common.Authorization = `Bearer ${accessToken}`;

    const { exp } = jwtDecode(accessToken);
    tokenExpired(exp);
  } else {
    localStorage.removeItem(ACCESS_TOKEN_KEY!);

    delete axiosInstance.defaults.headers.common.Authorization;
  }
};

// ----------------------------------------------------------------------

export const removeSession = () => {
  localStorage.removeItem(ACCESS_TOKEN_KEY!);
  localStorage.removeItem(REFRESH_TOKEN_KEY!);

  delete axiosInstance.defaults.headers.common.Authorization;
};

// ----------------------------------------------------------------------

export const getUserId = () => {
  const accessToken = localStorage.getItem(ACCESS_TOKEN_KEY!);
  if (!accessToken) {
    return '';
  }

  const { id } = jwtDecode(accessToken);

  return id;
};
