import React from 'react';
import { Helmet } from 'react-helmet-async';
import { ICapsuleBox } from 'src/types/capsule';
// layouts
import { Container } from 'src/components/container';
import { BackHeader } from 'src/layouts/header';
// sections
import { useCapsuleBox } from 'src/apis/queries/capsule/capsule-box';
import { WritePad } from 'src/sections/write';
import { HomeHeader } from '../../sections/home';

const WritePage = () => {
  const { data: capsuleBox } = useCapsuleBox<ICapsuleBox>();

  return (
    <>
      <Helmet>
        <title> Home | Capsule</title>
      </Helmet>
      <BackHeader />
      <Container>
        <WritePad />
      </Container>
    </>
  );
};

export default WritePage;
