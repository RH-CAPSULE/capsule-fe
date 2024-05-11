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

const Home = () => {
  const { data: capsuleBox, isLoading } = useCapsuleBox<ICapsuleBox>();

  const renderContent = () => {
    if (isLoading) {
      return <p>Loading ...</p>;
    }

    if (capsuleBox) {
      return (
        <>
          <HomeCapsuleBox theme={capsuleBox.theme} capsuleBox={capsuleBox} />
          <HomeBottomButtons theme={capsuleBox?.theme!} />
        </>
      );
    }

    return <HomeCapsuleBoxBlank />;
  };

  return (
    <>
      <Helmet>
        <title> Home | Capsule</title>
      </Helmet>
      <Header />
      <Container>
        <HomeHeader />

        {renderContent()}
      </Container>
    </>
  );
};
export default Home;
