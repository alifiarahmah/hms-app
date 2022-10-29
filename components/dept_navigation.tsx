import { Box, Button, Flex, IconButton } from '@chakra-ui/react';
import { BiFilter } from 'react-icons/bi';

const departements = [
  {
    name: 'All',
    value: 'all',
  },
  {
    name: 'Kesekjenan',
    value: 'kesekjenan',
  },
  {
    name: 'Medkominfo',
    value: 'medkominfo',
  },
  {
    name: 'Internal',
    value: 'internal',
  },
  {
    name: 'Kemasyarakatan',
    value: 'kemasyarakatan',
  },
  {
    name: 'Keprofesian',
    value: 'keprofesian',
  },
  {
    name: 'Organization Development',
    value: 'organization-development',
  },
  {
    name: 'ICEE',
    value: 'icee',
  },
  {
    name: 'SIBADES',
    value: 'sibades',
  },
];

const DeptNavigation = ({
  selectedDept,
  ascSort,
  setSelectedDept,
  setAscSort,
}: {
  selectedDept: string;
  ascSort: boolean;
  setSelectedDept: (value: string) => void;
  setAscSort: (value: boolean) => void;
}) => {
  return (
    <Flex
      flexDirection="row"
      bg="linear-gradient(180deg, #96B29E 23.68%, #F2E1CD 269.74%)"
      py={1}
      px={3}
      alignItems="center"
      fontFamily="Gurindam"
      overflowX="scroll"
      justifyContent="space-between"
      sx={{
        '&::-webkit-scrollbar': {
          display: 'none',
        },
      }}
    >
      <Box
        flexDirection="row"
        display="flex"
        alignItems="center"
        overflowX="scroll"
        css={{
          '&::-webkit-scrollbar': {
            width: '0',
            height: '0',
          },
        }}
      >
        {departements.map((departement) => (
          <Box key={departement.name}>
            <Button
              onClick={() => setSelectedDept(departement.value)}
              color="#175442"
              variant="link"
              mx={5}
              display="block"
            >
              {departement.name}
            </Button>
            {selectedDept === departement.value ? (
              <Box h={1} marginTop={1} bg="#175442" borderRadius="full" />
            ) : null}
          </Box>
        ))}
      </Box>
      <IconButton
        aria-label="sort"
        variant="ghost"
        color="#175442"
        size="lg"
        _hover={{ bg: 'transparent' }}
        transform={ascSort ? 'rotate(0deg)' : 'rotate(180deg)'}
        transition="transform 0.2s"
        onClick={() => setAscSort(!ascSort)}
      >
        <BiFilter size={35} />
      </IconButton>
    </Flex>
  );
};

export default DeptNavigation;
