import { Helmet } from 'react-helmet-async';
// layouts
import { Container } from 'src/components/container';
import { BackHeader } from 'src/layouts/header';
// sections
import { WritePad } from 'src/sections/write';

const WritePage = () => {
  return (
    <>
      <Helmet>
        <title> Write | Capsule</title>
      </Helmet>
      <BackHeader />
      <Container>
        <WritePad />
      </Container>
    </>
  );
};

export default WritePage;
