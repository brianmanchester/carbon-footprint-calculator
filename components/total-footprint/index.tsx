import { Box, Text } from '@chakra-ui/react';
import { Chart } from 'react-google-charts';
import { useEmissionsResults } from '@/contexts/emissions-results';
import { useMemo } from 'react';
import { Result } from '@/contexts/emissions-results/types';
import { TotalFootprintSum } from '../total-footprint-sum';

type Data = [string, number];

export const TotalFootprint = () => {
  const {
    state: { categories }
  } = useEmissionsResults();

  const { data, results } = useMemo<{ data: Data[]; results: Result[] }>(() => {
    const keys = Object.keys(categories);

    if (keys.length < 1) {
      return { data: [], results: [] };
    }

    let data: Data[] = [];
    let results: Result[] = [];

    for (const key of keys) {
      const keyAsNumber = Number(key);

      data = [
        ...data,
        ...(categories[keyAsNumber]?.map<Data>(r => [r.name, r.emissions]) ||
          [])
      ];

      results = [...results, ...(categories[keyAsNumber] || [])];
    }

    return { data, results };
  }, [categories]);

  return (
    <Box borderRadius='lg' boxShadow='base' padding={4} width='full'>
      {results.length > 0 ? (
        <>
          <Text fontWeight='bold' fontSize='2xl' marginBottom='16px'>
            Your total footprint (CO<sub>2</sub> per year)
          </Text>
          <TotalFootprintSum marginBottom='16px' results={results} />
          <Chart
            chartType='PieChart'
            width='100%'
            height={600}
            data={[['Category', 'Amount of emissions'], ...data]}
            options={{ pieHole: 0.4, is3D: false }}
          />
        </>
      ) : (
        <Text fontWeight='bold' fontSize='2xl' marginBottom='16px'>
          Select a category and enter data to see your total
        </Text>
      )}
    </Box>
  );
};
