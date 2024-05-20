import React from 'react';
import { ThemeType } from 'src/types/theme';
import { Button } from 'src/components/button';
import { Link } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import { copyToClipboard } from 'src/utils/clipboard';
import { PATH } from 'src/routes/path';
import { useCachedUser } from 'src/apis/queries/auth/user-info';
import styles from './styles.module.scss';
import { ICapsuleBox } from '../../types';

// ----------------------------------------------------------------------

const getDomain = () => {
  const url = window.location.href;
  const urlObj = new URL(url);
  return urlObj.origin;
};

interface Props {
  theme: ThemeType;
  capsuleBox?: ICapsuleBox;
}

// ----------------------------------------------------------------------

const HomeBottomButtons = ({ theme, capsuleBox }: Props) => {
  const { enqueueSnackbar } = useSnackbar();
  const { user } = useCachedUser();
  const { capsuleBoxId } = capsuleBox || {};

  const handleCopy = () => {
    copyToClipboard(`${getDomain()}/${user?.id}`);
    enqueueSnackbar('링크가 복사되었습니다.', { variant: 'success' });
  };

  return (
    <section className={`${styles.section} ${styles.bottom}`}>
      <Link to={`${PATH.WRITE}?id=${capsuleBoxId}`}>
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
