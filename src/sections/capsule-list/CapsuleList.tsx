import React from 'react';
import { useInView } from 'react-intersection-observer';
import { useNavigate, useParams } from 'react-router-dom';
import { useCapsuleList } from 'src/apis/queries/capsule/capsule-list';
import { Capsule } from 'src/components/capsule';
import { PATH } from 'src/routes/path';
import { ICapsule } from 'src/types';
import styles from './styles.module.scss';

const getRandomRotation = () => {
  return `${Math.floor(Math.random() * 360)}deg`;
};

const CapsuleComponent = ({ title, capsuleId, ...other }: ICapsule & any) => {
  const [rotation] = React.useState(getRandomRotation());

  return (
    <div className={styles.capsule}>
      <div style={{ transform: `rotate(${rotation})` }}>
        <Capsule {...other} width="6rem" />
      </div>
      <p>{title}</p>
    </div>
  );
};

const CapsuleList = () => {
  const { id: capsuleBoxId } = useParams();

  const { ref, inView } = useInView();
  const {
    data,
    isLoading,
    isFetched,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
  } = useCapsuleList({ capsuleBoxId, enabled: !!capsuleBoxId });

  const navigate = useNavigate();

  const isNotData = !isLoading && !data?.pages[0]?.content?.length;

  React.useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, fetchNextPage]);

  return (
    <>
      {isNotData && <>받은 캡슐이 없습니다.</>}
      <div className={styles.list}>
        {isFetched &&
          data?.pages.map((group, i) => (
            <React.Fragment key={i}>
              {group.content.map((capsule) => (
                <CapsuleComponent
                  onClick={() =>
                    navigate(`${PATH.CAPSULE_DETAIL}/${capsule.capsuleId}`)
                  }
                  key={capsule.capsuleId}
                  {...capsule}
                />
              ))}
            </React.Fragment>
          ))}
      </div>
      <div style={{ width: '100%' }} ref={ref}>
        {isFetchingNextPage && <p>Loading ...</p>}
      </div>
    </>
  );
};

export default CapsuleList;
