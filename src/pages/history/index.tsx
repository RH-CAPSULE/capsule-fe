import { Helmet } from 'react-helmet-async';
import { Container } from 'src/components/container';
import { Header } from 'src/layouts/header';
import { HistoryList } from 'src/sections/history';

const History = () => {
  return (
    <>
      <Helmet>
        <title> History | Capsule</title>
      </Helmet>
      <Header />
      <Container>
        <HistoryList />
      </Container>
    </>
  );
};

export default History;
