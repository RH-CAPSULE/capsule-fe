import React from 'react';
// styles
import { Container } from 'src/components/container';
import { Helmet } from 'react-helmet-async';
import { Navigate, useSearchParams } from 'react-router-dom';
import { PATH } from 'src/routes/path';
import { useOAuthSignIn } from 'src/apis/queries/auth';
import { NameChange } from 'src/sections/oauth-loading';
import { setSession } from 'src/auth/utils';
import styles from './styles.module.scss';

interface Response {
  accessToken: string;
  refreshToken: string;
  isFirstSignIn: boolean;
}

const OAuthLoading = () => {
  const [searchParams] = useSearchParams();
  const code = searchParams.get('code');
  const { data, isLoading, isError } = useOAuthSignIn<Response>({
    provider: 'google',
    code,
    enabled: !!code,
  });

  const renderContent = () => {
    if (isLoading) {
      return <p>로그인 중...</p>;
    }

    if (!code || !data || isError) {
      return <Navigate to={PATH.LOGIN} />;
    }

    const token = {
      accessToken: data.accessToken,
      refreshToken: data.refreshToken,
    };

    // 닉네임 설정 페이지
    if (data?.isFirstSignIn) {
      return <NameChange token={token} />;
    }

    setSession(token);

    return <Navigate to={PATH.HOME} />;
  };

  return (
    <div className={styles.layout}>
      <Helmet>
        <title> Loading... | Capsule</title>
      </Helmet>
      <Container>{renderContent()}</Container>
    </div>
  );
};

export default OAuthLoading;
