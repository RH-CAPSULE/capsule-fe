import { Helmet } from 'react-helmet-async';
import { Container } from 'src/components/container';
import { BackHeader } from 'src/layouts/header';
import { CapsuleDetailSection } from 'src/sections/capsule-list';

const CapsuleDetail = () => {
  return (
    <>
      <Helmet>
        <title> Capsule Detail | Capsule</title>
      </Helmet>
      <Container>
        <BackHeader />
        <CapsuleDetailSection />
      </Container>
    </>
  );
};

export default CapsuleDetail;
