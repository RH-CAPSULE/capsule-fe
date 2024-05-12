import React from 'react';
import { ThemeType } from 'src/types/theme';
import { Button } from 'src/components/button';
import { Link } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import { copyToClipboard } from 'src/utils/clipboard';
import { useAuthStore } from 'src/store/auth';
import { PATH } from 'src/routes/path';
import styles from './styles.module.scss';

// ----------------------------------------------------------------------

const getDomain = () => {
  const url = window.location.href;
  const urlObj = new URL(url);
  return urlObj.origin;
};

interface Props {
  theme: ThemeType;
}

// ----------------------------------------------------------------------

const HomeBottomButtons = ({ theme }: Props) => {
  const { enqueueSnackbar } = useSnackbar();
  const user = useAuthStore((state) => state.user);

  const handleCopy = () => {
    copyToClipboard(`${getDomain()}/${user?.id}`);
    enqueueSnackbar('링크가 복사되었습니다.', { variant: 'success' });
  };

  return (
    <section className={`${styles.section} ${styles.bottom}`}>
      <Link to={PATH.WRITE}>
        <Button theme={theme} size="large" full>
          나에게 캡슐 쓰기
        </Button>
      </Link>
      <Button theme={theme} size="large" full onClick={handleCopy}>
        공유하기
      </Button>
    </section>
  );
};

export default HomeBottomButtons;
