import { Heading } from '@chakra-ui/react';
import Layout from 'components/layout';
import Calendar from 'react-calendar';
// import 'react-calendar/dist/Calendar.css';

const Index = () => {
  return (
    <Layout>
      <Calendar />
      <Heading mt={5}>Upcoming events</Heading>
    </Layout>
  );
};

export default Index;
