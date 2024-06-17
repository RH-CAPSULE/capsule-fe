import React from 'react';
import LoadingScreen from 'src/pages/splash';

interface Props {
  isLoading: boolean;
  children: React.ReactNode;
}

const LoadingSuspense = ({ isLoading, children }: Props) => {
  if (isLoading) {
    return <LoadingScreen />;
  }

  return <> {children} </>;
};

export default LoadingSuspense;
