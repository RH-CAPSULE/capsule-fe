import React from 'react';
import { useCapsuleHistory } from 'src/apis/queries/capsule/history';
import { CapsuleBox } from 'src/components/capsule-box';
import { px } from 'src/utils/styles';
import { useInView } from 'react-intersection-observer';
import { formatDate } from 'src/utils/date';
import { useNavigate } from 'react-router-dom';
import { PATH } from 'src/routes/path';
import styles from './styles.module.scss';

const HistoryList = () => {
  const { ref, inView } = useInView();
  const {
    data,
    isFetched,
    hasNextPage,
    isFetchingNextPage,
    //
    fetchNextPage,
  } = useCapsuleHistory();

  const navigate = useNavigate();

  const isNotData = !data;

  React.useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, fetchNextPage]);
  return (
    <>
      {isNotData && <>캡슐함이 없습니다.</>}
      <div className={styles.list}>
        {isFetched &&
          data?.pages.map((group, i) => (
            <React.Fragment key={i}>
              {group.content.map((capsuleBox) => (
                <CapsuleBox
                  onClick={() =>
                    navigate(`${PATH.HISTORY}/${capsuleBox.capsuleBoxId}`)
                  }
                  style={{ fontSize: px(10) }}
                  key={capsuleBox.capsuleBoxId}
                  theme={capsuleBox.theme}
                  closedAt={formatDate(capsuleBox.closedAt)}
                  openedAt={formatDate(capsuleBox.openedAt)}
                  capsules={capsuleBox.capsules}
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

export default HistoryList;
