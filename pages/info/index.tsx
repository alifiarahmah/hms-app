import { Button, ButtonGroup, Stack } from '@chakra-ui/react';
import InfoItem from 'components/info/info-item';
import Layout from 'components/layout';
import Loading from 'components/loading';
import { useEffect, useState } from 'react';
import { IPost } from 'types/post';

const Posts = () => {
  const [posts, setPosts] = useState<Array<IPost> | null>(null);

  useEffect(() => {
    fetch('/api/admin/post')
      .then((res) => res.json())
      .then((data) => {
        setPosts(data.data.reverse());
      })
      .catch((err) => {
        console.log(err);
      });
  });

  if (!posts) {
    return (
      <Layout>
        <Loading />
      </Layout>
    );
  }
  return (
    <Layout title="Informasi">
      <ButtonGroup py={5} display={{ base: 'none', lg: 'block' }}>
        <Button>Kesekjenan</Button>
        <Button>Medkominfo</Button>
        <Button>Internal</Button>
        <Button>Kemasyarakatan</Button>
        <Button>Keprofesian</Button>
        <Button>Organization Development</Button>
        <Button>ICEE</Button>
        <Button>SIBADES</Button>
      </ButtonGroup>
      <Stack gap={5} w="100%">
        {posts.map((post: IPost) => {
          return (
            <InfoItem
              key={post.id}
              id={post.id}
              title={post.title}
              createdAt={post.createdAt}
              updatedAt={post.updatedAt}
              content={post.content}
            />
          );
        })}
      </Stack>
    </Layout>
  );
};

export default Posts;
