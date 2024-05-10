import React from 'react';
import { Helmet } from 'react-helmet-async';
// layouts
import { Container } from 'src/components/container';
import { Header } from 'src/layouts/header';
// sections
import { WritePad } from 'src/sections/write';
import { useCapsuleBox } from 'src/apis/queries/capsule/capsule-box';
import { ICapsuleBox } from 'src/types/capsule';

const WritePage = () => {
  const { data: capsuleBox } = useCapsuleBox<ICapsuleBox>();

  return (
    <>
      <Helmet>
        <title> Home | Capsule</title>
      </Helmet>
      <Header />
      <Container>
        <WritePad />
      </Container>
    </>
  );
};
export default WritePage;
