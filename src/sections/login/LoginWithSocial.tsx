import { IconGoogle } from 'src/assets/icons';
import { Button } from 'src/components/button';
import { axiosInstance } from 'src/apis/axios';
import { PATH } from 'src/routes/path';
import styles from './styles.module.scss';

const LoginWithSocial = () => {
  const handleLogin = async () => {
    const provider = 'google';

    const urlResponse = await axiosInstance.get(
      `/oauth/${provider}/sign-in-uri`,
      {
        params: {
          'redirect-uri': `${window.location.origin}${PATH.OAUTH_LOADING}`,
        },
      }
    );
    const { signInUri } = urlResponse.data;

    // google sign in
    window.location.href = signInUri;
  };

  return (
    <section className={styles.section}>
      <Button className={styles.socialLoginButton} onClick={handleLogin}>
        <IconGoogle />
        Sign in with Google
      </Button>
    </section>
  );
};

export default LoginWithSocial;
