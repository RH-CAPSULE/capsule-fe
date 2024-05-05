import { Outlet } from 'react-router-dom';
import styles from './styles.module.scss';
import backgroundImage from '../../assets/images/background.png';

const MainLayout = () => (
  <div
    className={styles.mainLayout}
    style={{
      backgroundImage: `url(${backgroundImage})`,
    }}
  >
    <main>
      <Outlet />
    </main>
  </div>
);

export default MainLayout;
