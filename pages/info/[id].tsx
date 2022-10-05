import Layout from 'components/layout';
import { IPost } from 'types/post';

const Index = ({ id }: IPost) => {
  return (
    <Layout title="title">
      <div>id: {id}</div>
    </Layout>
  );
};

export default Index;
