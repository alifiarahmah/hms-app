import Layout from 'components/layout';
import { useSession } from 'next-auth/react';

const Index = () => {
  const session = useSession();
  return <Layout>session: {JSON.stringify(session)}</Layout>;
};

export default Index;
