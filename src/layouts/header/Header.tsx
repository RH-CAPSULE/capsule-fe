import styles from './styles.module.scss';
import NavMenu from './NavMenu';
import NoticeButton from './NoticeButton';

const Header = () => {
  return (
    <header className={styles.header}>
      <NoticeButton />
      <NavMenu />
    </header>
  );
};

export default Header;
