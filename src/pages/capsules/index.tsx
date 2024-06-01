import { Helmet } from 'react-helmet-async';
import { Container } from 'src/components/container';
import { BackHeader } from 'src/layouts/header';
import { CapsuleList } from 'src/sections/capsule-list';

const Capsules = () => {
  return (
    <>
      <Helmet>
        <title> Capsule List | Capsule</title>
      </Helmet>
      <BackHeader />
      <Container>
        <CapsuleList />
      </Container>
    </>
  );
};

export default Capsules;
