import React, { useEffect, useCallback } from 'react';
import localStorageAvailable from 'src/utils/localStorageAvailable';
import { ACCESS_TOKEN_KEY, REFRESH_TOKEN_KEY } from 'src/static';
import { axiosInstance } from 'src/apis/axios';
import { useAuthStore } from 'src/store/auth';
import { PATH_API } from 'src/apis/path';
import { getUserId, isValidToken, setSession } from './utils';

interface Props {
  children: React.ReactNode;
}

export const AuthProvider = ({ children }: Props) => {
  const { setUser, setIsLoggedIn, setIsInitialized } = useAuthStore(
    (state) => state
  );

  const initialize = useCallback(async () => {
    try {
      if (!localStorageAvailable()) {
        throw new Error('Error! 인증 정보를 가져올 수 없음');
      }
      const accessToken = localStorage.getItem(ACCESS_TOKEN_KEY!);
      const refreshToken = localStorage.getItem(REFRESH_TOKEN_KEY!);

      if (!accessToken || !isValidToken(accessToken)) {
        throw new Error('Error! access 토큰 만료');
      }

      if (!refreshToken || !isValidToken(refreshToken)) {
        throw new Error('Error! refresh 토큰 만료');
      }

      setSession({ accessToken, refreshToken });

      const response = await axiosInstance.get(PATH_API.USER_INFO);

      const user = {
        ...response.data,
        id: getUserId(),
      };

      setUser(user);
      setIsLoggedIn(true);
      setIsInitialized(true);
    } catch {
      setIsLoggedIn(false);
      setIsInitialized(true);
    }
  }, [setUser, setIsLoggedIn, setIsInitialized]);

  useEffect(() => {
    initialize();
  }, [initialize]);

  return <> {children} </>;
};
