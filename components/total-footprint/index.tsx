import { Box, Text } from '@chakra-ui/react';

export const TotalFootprint = () => {
  return (
    <Box borderRadius='lg' boxShadow='base' padding={4} width='full'>
      <Text fontWeight='bold' fontSize='2xl' marginBottom='16px'>
        Select a category and enter data to see your total
      </Text>
    </Box>
  );
};
