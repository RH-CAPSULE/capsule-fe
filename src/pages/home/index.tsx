import React from 'react';
import { Helmet } from 'react-helmet-async';
// layouts
import { Container } from 'src/components/container';
import { Header } from 'src/layouts/header';
// sections
import {
  HomeHeader,
  HomeCapsuleBox,
  HomeBottomButtons,
  HomeCapsuleBoxBlank,
} from 'src/sections/home';
import { useCapsuleBox } from 'src/apis/queries/capsule/capsule-box';
import { ICapsuleBox } from 'src/types/capsule';
import LoadingSuspense from 'src/components/loading-suspense';

const Home = () => {
  const { data: capsuleBox, isLoading } = useCapsuleBox<ICapsuleBox>();

  return (
    <LoadingSuspense isLoading={isLoading}>
      <Helmet>
        <title> Home | Capsule</title>
      </Helmet>
      <Header />
      <Container>
        <HomeHeader />
        {capsuleBox ? (
          <>
            <HomeCapsuleBox theme={capsuleBox.theme} capsuleBox={capsuleBox} />
            <HomeBottomButtons
              theme={capsuleBox?.theme!}
              capsuleBox={capsuleBox}
            />
          </>
        ) : (
          <HomeCapsuleBoxBlank />
        )}
      </Container>
    </LoadingSuspense>
  );
};
export default Home;
