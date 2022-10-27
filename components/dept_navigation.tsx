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
	setSelectedDept,
}: {
	selectedDept: string;
	setSelectedDept: (value: string) => void;
}) => {
  return (
    <Flex
      flexDirection="row"
      bg="linear-gradient(180deg, #96B29E 23.68%, #F2E1CD 269.74%)"
      py={1}
      alignItems="center"
      fontFamily="Gurindam"
      overflowX="scroll"
      sx={{
        '&::-webkit-scrollbar': {
          display: 'none',
        },
      }}
    >
      {departements.map((departement) => (
        <Box key="">
          <Button onClick={() => setSelectedDept(departement.value)} color="#175442" variant="link" mx={5} display="block">
            {departement.name}
          </Button>
        </Box>
      ))}
      <IconButton aria-label="sort" variant="ghost" color="#175442" size="lg">
        <BiFilter />
      </IconButton>
    </Flex>
  );
};

export default DeptNavigation;
