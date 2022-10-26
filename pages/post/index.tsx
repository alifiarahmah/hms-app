import { Heading } from '@chakra-ui/react';
import Loading from 'components/loading';
import Navbar from 'components/navbar';
import { useRouter } from 'next/router';

const Post = () => {
  const router = useRouter();

  if (!router.isReady) {
    return <Loading />;
  }

  return (
    <>
      <Navbar />
      <Heading>Post</Heading>
    </>
  );
};

export default Post;
