import { Grid, GridItem, SimpleGrid, Skeleton } from '@chakra-ui/react';

export const ResultsSkeleton = () => (
  <>
    <Skeleton borderRadius='lg' width='200px' height='36px' marginTop='16px' />
    <SimpleGrid
      marginBottom='16px'
      marginTop='16px'
      minChildWidth='180px'
      spacing='32px'
    >
      {[...Array(6)].map((_, i) => (
        <Skeleton
          borderRadius='lg'
          key={`loader-${i}`}
          height='118px'
          width='100%'
        />
      ))}
    </SimpleGrid>
    <Grid templateColumns='repeat(3, 1fr)' gap='32px'>
      <GridItem colStart={2}>
        <Skeleton borderRadius='lg' height='59px' width='100%' />
      </GridItem>
    </Grid>
  </>
);