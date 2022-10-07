import { Result } from '@/contexts/emissions-results/types';
import { Box, Grid, GridItem, Text } from '@chakra-ui/react';

export type TotalFootprintSumProps = {
  marginBottom?: string;
  results: Result[];
};

export const TotalFootprintSum = ({
  marginBottom,
  results
}: TotalFootprintSumProps) => {
  const total = results
    .map(r => r.emissions)
    .reduce((emissions, sum) => sum + emissions, 0);

  return (
    <Grid templateColumns='repeat(3, 1fr)' gap='32px'>
      <GridItem colStart={2}>
        <Box
          borderRadius='lg'
          boxShadow='base'
          marginBottom={marginBottom}
          padding={4}
          width='full'
        >
          <Text data-testid='total-per-year' fontWeight='bold' fontSize='lg'>
            Total per year: {total}
          </Text>
        </Box>
      </GridItem>
    </Grid>
  );
};
