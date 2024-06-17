import { Button } from 'src/components/button';
import { Link, useNavigate } from 'react-router-dom';
import { PATH } from 'src/routes/path';
import { useGuestCapsuleBox } from 'src/apis/queries/guest';
import { isWriteCapsule } from 'src/utils/localStoregeWriteHandler';
import styles from './styles.module.scss';

// ----------------------------------------------------------------------

const GuestBottomButtons = () => {
  const navigate = useNavigate();

  const { data } = useGuestCapsuleBox();

  const { userName, theme, capsuleBoxId } = data || {};

  const isWrite = isWriteCapsule(capsuleBoxId!);

  return (
    <section className={`${styles.section} ${styles.bottom}`}>
      <Link to={`${PATH.GUEST_WRITE}?id=${capsuleBoxId}`}>
        <Button theme={theme} size="large" full disabled={isWrite}>
          {isWrite
            ? '이미 캡슐을 작성하셨습니다.'
            : `${userName}님에게 캡슐 쓰기`}
        </Button>
      </Link>
      <Button
        theme={theme}
        size="large"
        full
        onClick={() => navigate(PATH.LOGIN)}
      >
        내 캡슐함 만들러 가기
      </Button>
    </section>
  );
};

export default GuestBottomButtons;
