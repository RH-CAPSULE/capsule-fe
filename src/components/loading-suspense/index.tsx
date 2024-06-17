import React from 'react';
import LoadingEnd from './LoadingEnd';

interface Props {
  isLoading: boolean;
  children: React.ReactNode;
}

const LoadingSuspense = ({ isLoading, children }: Props) => {
  const [minimumLoadingTimePassed, setMinimumLoadingTimePassed] =
    React.useState(false);

  React.useEffect(() => {
    // isLoading이 true일 때만 실행
    if (!isLoading) {
      setMinimumLoadingTimePassed(true);
      return;
    }

    const timer = setTimeout(() => {
      setMinimumLoadingTimePassed(true);
    }, 1000); // 최소 1초간 스플래시 띄움

    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (isLoading || !minimumLoadingTimePassed) {
    // 로딩 중이거나 최소 로딩 시간이 지나지 않은 경우
    return <LoadingEnd />;
  }

  return <> {children} </>;
};

export default LoadingSuspense;
