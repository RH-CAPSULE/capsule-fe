import React from 'react';
import { ThemeType } from 'src/types/theme';
import { Button } from 'src/components/button';
import { Link } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import { copyToClipboard } from 'src/utils/clipboard';
import { PATH } from 'src/routes/path';
import { useCachedUser } from 'src/apis/queries/auth/user-info';
import { isFuture, isPast } from 'date-fns';
import { useMakeCapsuleStore } from 'src/store/capsule';
import styles from './styles.module.scss';
import { ICapsuleBox } from '../../types';
import MakeCapsuleModal from './MakeCapsuleModal';

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
  const setIsMakeModalOpen = useMakeCapsuleStore(
    (state) => state.setIsMakeModalOpen
  );

  const { capsuleBoxId, hasMyCapsule, closedAt, openedAt } = capsuleBox || {};

  const handleCopy = () => {
    copyToClipboard(`${getDomain()}/${user?.id}`);
    enqueueSnackbar('링크가 복사되었습니다.', { variant: 'success' });
  };

  const isOpened = openedAt && isPast(new Date(openedAt));
  const isClosed = closedAt && isPast(new Date(closedAt)) && !isOpened;
  const isWritable = closedAt && isFuture(new Date(closedAt));

  if (isWritable) {
    return (
      <section className={`${styles.section} ${styles.bottom}`}>
        <Link to={`${PATH.WRITE}?id=${capsuleBoxId}`}>
          <Button theme={theme} size="large" full disabled={hasMyCapsule}>
            {hasMyCapsule
              ? '이미 캡슐함을 작성하셨습니다.'
              : '나에게 캡슐 쓰기'}
          </Button>
        </Link>
        <Button theme={theme} size="large" full onClick={handleCopy}>
          공유하기
        </Button>
      </section>
    );
  }

  if (isClosed) {
    return (
      <section className={`${styles.section} ${styles.bottom}`}>
        <Button theme={theme} size="large" full disabled>
          캡슐함 개봉까지 D-
          {Math.ceil(
            (new Date(openedAt!).getTime() - Date.now()) / (1000 * 60 * 60 * 24)
          )}
        </Button>
      </section>
    );
  }

  if (isOpened) {
    return (
      <section className={`${styles.section} ${styles.bottom}`}>
        <Link to={`${PATH.CAPSULE_LIST}/${capsuleBoxId}`}>
          <Button theme={theme} size="large" full>
            캡슐함 열기
          </Button>
        </Link>
        <Button
          theme={theme}
          size="large"
          full
          onClick={() => setIsMakeModalOpen(true)}
        >
          새 캡슐함 만들러 가기
        </Button>
        <MakeCapsuleModal />
      </section>
    );
  }

  return null;
};

export default HomeBottomButtons;
