import React from 'react';
import { Helmet } from 'react-helmet-async';
import { CapsuleBox } from 'src/components/capsule-box';
import { Theme } from 'src/types/theme';
import { Button } from 'src/components/button';
import { Container } from 'src/components/container';
import { Header } from 'src/layouts/header';

const Home = () => {
  const theme = Theme.AQUA;
  return (
    <>
      <Helmet>
        <title> Home | Capsule</title>
      </Helmet>
      <Header />
      <Container>
        <h1>박도륜님의 캡슐함</h1>
        <CapsuleBox
          open
          theme={theme}
          closedAt="2024-05-06"
          openedAt="2024-05-06"
        />
        <Button theme={theme}>캡슐 쓰기</Button>
      </Container>
    </>
  );
};
export default Home;
