import React from 'react';
import {
  IconHistory,
  IconHome,
  IconLogout,
  IconMail,
  IconMenu,
} from 'src/assets/icons';
import { Drawer } from 'src/components/drawer';
import { Link, useLocation } from 'react-router-dom';
import { useAuthStore } from 'src/store/auth';
import { PATH } from 'src/routes/path';
import { useSignOut } from 'src/apis/queries/auth/sign-out';
import { onConfirm } from 'src/utils/rha-alert';
import styles from './styles.module.scss';

const NavMenu = () => {
  const user = useAuthStore((state) => state.user);

  const { pathname } = useLocation();

  const [open, setOpen] = React.useState(false);

  const signOutMutation = useSignOut();

  const isActive = (path: string) => {
    if (pathname.endsWith('/')) {
      return pathname.slice(0, -1) === path;
    }
    return pathname === path;
  };

  const activeClassName = (path: string) => {
    return isActive(path) ? styles.active : '';
  };

  const onClose = () => setOpen(false);

  const handleSignOut = async () => {
    if (!(await onConfirm('로그아웃 하시겠습니까?'))) return;
    signOutMutation.mutate();
  };

  React.useEffect(() => {
    if (open) {
      onClose();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  return (
    <>
      <IconMenu onClick={() => setOpen(true)} />
      <Drawer open={open} onClose={onClose}>
        <nav className={styles.navMobile}>
          <div className={styles.userInfo}>
            <p>{user?.userName}</p>
            <p>{user?.userEmail}</p>
          </div>
          <div className={styles.divider} />
          <ul>
            <li className={activeClassName(PATH.HOME)}>
              <Link to={PATH.HOME}>
                <IconHome />홈
              </Link>
            </li>
            <li className={activeClassName(PATH.HISTORY)}>
              <Link to={PATH.HISTORY}>
                <IconHistory />
                캡슐 내역
              </Link>
            </li>
            <li className={activeClassName(PATH.INQUIRY)}>
              <Link to={PATH.INQUIRY}>
                <IconMail />
                문의하기
              </Link>
            </li>
            <li>
              <Link to="" onClick={handleSignOut}>
                <IconLogout />
                로그아웃
              </Link>
            </li>
          </ul>
          {/* <p className={styles.copyright}>copyright © 2024 dochi</p> */}
        </nav>
      </Drawer>
    </>
  );
};

export default NavMenu;
