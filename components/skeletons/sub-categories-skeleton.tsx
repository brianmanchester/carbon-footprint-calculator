import { Divider, SimpleGrid, Skeleton } from '@chakra-ui/react';
import { ResultsSkeleton } from './results-skeleton';

export const SubCategoriesSkeleton = () => (
  <>
    <Skeleton
      borderRadius='lg'
      width='200px'
      height='36px'
      marginBottom='16px'
    />
    <Skeleton
      borderRadius='lg'
      width='360px'
      height='27px'
      marginBottom='16px'
    />
    <SimpleGrid
      marginTop='16px'
      marginBottom='24px'
      minChildWidth='180px'
      spacing='32px'
    >
      {[...Array(6)].map((_, i) => (
        <Skeleton
          borderRadius='lg'
          key={`loader-${i}`}
          height='72px'
          width='100%'
        />
      ))}
    </SimpleGrid>
    <Divider />
    <ResultsSkeleton />
  </>
);
