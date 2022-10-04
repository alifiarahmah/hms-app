import { Button, ButtonGroup, Stack } from '@chakra-ui/react';
import InfoItem from 'components/info/info-item';
import Layout from 'components/layout';

const Mading = () => {
  return (
    <Layout title="Informasi">
      <ButtonGroup py={5} display={{ base: 'none', lg: 'block' }}>
        <Button>Kesekjenan</Button>
        <Button>Medkominfo</Button>
        <Button>Internal</Button>
        <Button>Kemasyarakatan</Button>
        <Button>Keprofesian</Button>
        <Button>Organization Development</Button>
      </ButtonGroup>
      <Stack gap={5}>
        <InfoItem id="1" />
        <InfoItem id="1" />
        <InfoItem id="1" />
        <InfoItem id="1" />
      </Stack>
    </Layout>
  );
};

export default Mading;
