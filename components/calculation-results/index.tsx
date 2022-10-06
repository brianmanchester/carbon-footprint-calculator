import { useEmissionsResults } from '@/contexts/emissions-results';
import { SimpleGrid, Text } from '@chakra-ui/react';
import { useMemo } from 'react';
import { ResultsSkeleton } from '../skeletons/results-skeleton';
import { CalculationResult } from './result';
import { TotalFootprintSum } from '@/components/total-footprint-sum';

export type CalculationResultsProps = {
  categoryId: number;
};

export const CalculationResults = ({ categoryId }: CalculationResultsProps) => {
  const {
    state: { categories }
  } = useEmissionsResults();

  const results = categories[categoryId];

  const isLoading = useMemo<boolean>(
    () => results.some(r => r.loading),
    [results]
  );

  if (isLoading) {
    return <ResultsSkeleton />;
  }

  return (
    <>
      <Text fontWeight='bold' fontSize='2xl' marginTop='16px'>
        Please select a category
      </Text>
      <SimpleGrid
        marginBottom='16px'
        marginTop='16px'
        minChildWidth='180px'
        spacing='32px'
      >
        {results.map(({ emissions, name }, i) => (
          <CalculationResult
            emissions={emissions}
            key={`name-${i}`}
            label={name}
          />
        ))}
      </SimpleGrid>
      <TotalFootprintSum results={results} />
    </>
  );
};
