import React, { useEffect, useCallback } from 'react';
import { getTokens, isValidToken, setSession } from './utils';
import { axiosInstance } from '../apis/axios';
import { useAuthStore } from '../store';
import { PATH_API } from '../apis/path';

interface Props {
  children: React.ReactNode;
}

export const AuthProvider = ({ children }: Props) => {
  const { setUser, setIsLoggedIn, setIsInitialized } = useAuthStore(
    (state) => state
  );

  const initialize = useCallback(async () => {
    try {
      const { accessToken, refreshToken } = getTokens();

      if (accessToken && isValidToken(accessToken)) {
        setSession(accessToken);

        const response = await axiosInstance.get(PATH_API.MY_ACCOUNT);

        setUser(response.data);
        setIsLoggedIn(true);
        setIsInitialized(true);
      } else {
        throw new Error('Error! 인증 정보 없음');
      }
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
