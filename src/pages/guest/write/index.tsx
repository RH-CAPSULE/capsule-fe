import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Container } from 'src/components/container';
import { BackHeader } from 'src/layouts/header';
import { WritePad } from 'src/sections/write';

const GuestWrite = () => {
  return (
    <>
      <Helmet>
        <title> Write | Capsule</title>
      </Helmet>
      <BackHeader />
      <Container>
        <WritePad isGuest />
      </Container>
    </>
  );
};

export default GuestWrite;
