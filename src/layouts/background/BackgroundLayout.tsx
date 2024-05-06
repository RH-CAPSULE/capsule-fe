import { Outlet } from 'react-router-dom';
import styles from './styles.module.scss';

const BackgroundLayout = () => (
  <div className={styles.backgroundLayout}>
    <Outlet />
  </div>
);

export default BackgroundLayout;
