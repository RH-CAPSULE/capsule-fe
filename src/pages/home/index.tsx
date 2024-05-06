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
} from 'src/sections/home';
import { useCapsuleBox } from 'src/apis/queries/capsule/capsule-box';
import { ICapsuleBox } from 'src/types/capsule';

const Home = () => {
  const { data: capsuleBox } = useCapsuleBox<ICapsuleBox>();

  return (
    <>
      <Helmet>
        <title> Home | Capsule</title>
      </Helmet>
      <Header />
      <Container>
        <HomeHeader />

        <HomeCapsuleBox theme={capsuleBox?.theme!} capsuleBox={capsuleBox} />

        <HomeBottomButtons theme={capsuleBox?.theme!} />
      </Container>
    </>
  );
};
export default Home;
