import { Heading, Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react';
import Layout from 'components/layout';
import MadingItem from 'components/mading/mading-item';

const Mading = () => {
  return (
    <Layout>
      <Heading>Mading</Heading>
      <Tabs variant="soft-rounded" colorScheme="green" my={10}>
        <TabList>
          <Tab>BPH</Tab>
          <Tab>Medkominfo</Tab>
          <Tab>BSO</Tab>
        </TabList>

        <TabPanels>
          {Array.from({ length: 5 }).map((_, i) => (
            <TabPanel key={i}>
              {Array.from({ length: 5 }).map((_, i) => (
                <MadingItem key={i} id={i.toString()} />
              ))}
            </TabPanel>
          ))}
        </TabPanels>
      </Tabs>
      <section></section>
    </Layout>
  );
};

export default Mading;
