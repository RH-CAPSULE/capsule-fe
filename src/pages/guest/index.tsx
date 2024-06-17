import { Helmet } from 'react-helmet-async';
// layouts
import { Container } from 'src/components/container';
// sections
import { HomeCapsuleBox } from 'src/sections/home';
import LoadingSuspense from 'src/components/loading-suspense';
import { useGuestCapsuleBox } from 'src/apis/queries/guest';
import { GuestHeader, GuestBottomButtons } from 'src/sections/guest';

const GuestHome = () => {
  const { data: capsuleBox, isLoading, isError, error } = useGuestCapsuleBox();

  const renderContent = () => {
    if (isError && error?.message) {
      return <> {error.message} </>;
    }

    if (capsuleBox) {
      return (
        <>
          <GuestHeader />
          <HomeCapsuleBox theme={capsuleBox.theme} capsuleBox={capsuleBox} />
          <GuestBottomButtons />
        </>
      );
    }

    return <>캡슐함이 없습니다.</>;
  };

  return (
    <LoadingSuspense isLoading={isLoading}>
      <Helmet>
        <title> Home | Capsule</title>
      </Helmet>
      <Container>{renderContent()}</Container>
    </LoadingSuspense>
  );
};
export default GuestHome;
