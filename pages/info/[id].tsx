import Layout from 'components/layout';

import { InfoItemProps } from 'components/info/info-item';

const Index = ({ id }: InfoItemProps) => {
  return (
    <Layout title="title">
      <div>id: {id}</div>
    </Layout>
  );
};

export default Index;
