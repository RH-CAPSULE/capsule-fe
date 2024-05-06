import React from 'react';
import { Theme } from 'src/types/theme';
import { CapsuleBox } from 'src/components/capsule-box';
import { ICapsuleBox } from 'src/types/capsule';
import { formatDate } from 'src/utils/date';
import styles from './styles.module.scss';

interface Props {
  theme?: Theme;
  capsuleBox?: ICapsuleBox;
}

const HomeCapsuleBox = ({ theme, capsuleBox }: Props) => {
  const { closedAt, openedAt, capsules } = capsuleBox || {};

  return (
    <section className={styles.section}>
      <CapsuleBox
        theme={theme!}
        closedAt={formatDate(closedAt)}
        openedAt={formatDate(openedAt)}
        capsules={capsules || []}
      />
    </section>
  );
};

export default HomeCapsuleBox;
