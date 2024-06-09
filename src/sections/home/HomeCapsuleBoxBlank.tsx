import { IconCapsuleBoxBlank } from 'src/assets/icons';
import { useMakeCapsuleStore } from 'src/store/capsule';
import styles from './styles.module.scss';
import MakeCapsuleModal from './MakeCapsuleModal';

const HomeCapsuleBoxBlank = () => {
  const setIsMakeModalOpen = useMakeCapsuleStore(
    (state) => state.setIsMakeModalOpen
  );

  return (
    <section className={styles.section}>
      <IconCapsuleBoxBlank onClick={() => setIsMakeModalOpen(true)} />
      <MakeCapsuleModal />
    </section>
  );
};

export default HomeCapsuleBoxBlank;
