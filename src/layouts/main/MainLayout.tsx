import { Outlet } from 'react-router-dom';
import styles from './styles.module.scss';

const MainLayout = () => (
  <div className={styles.mainLayout}>
    <main>
      <Outlet />
    </main>
  </div>
);

export default MainLayout;
