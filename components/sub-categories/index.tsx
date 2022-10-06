import { useHandleError } from '@/hooks/use-handle-error';
import { useSubCategories } from '@/lib/queries/use-sub-categories';
import { Box, Divider, SimpleGrid, Text } from '@chakra-ui/react';
import { SubCategory } from '@/components/sub-category';
import { SubCategoriesSkeleton } from '@/components/skeletons';
import { CalculationResults } from '@/components/calculation-results';
import { useEmissionsResults } from '@/contexts/emissions-results';
import { useEffect } from 'react';

export type CalculatorProps = {
  categoryId?: number;
};

export const SubCategories = ({ categoryId }: CalculatorProps) => {
  const { data, error, isLoading } = useSubCategories(categoryId);
  const {
    dispatch,
    state: { categories }
  } = useEmissionsResults();

  useHandleError(error);

  const showLoader =
    !!error ||
    isLoading ||
    !data ||
    !categoryId ||
    // Make sure the results have been initialized
    categories[categoryId]?.length < 1;

  useEffect(() => {
    // Initialize the results
    if (data && categoryId) {
      dispatch({
        type: 'add-results',
        payload: {
          categoryId,
          results: data.subCategories.map(r => ({
            emissions: 0,
            loading: false,
            name: r.name,
            subCategoryId: r.id,
            uses: ''
          }))
        }
      });
    }
  }, [categoryId, data, dispatch]);

  return (
    <Box borderRadius='lg' boxShadow='base' padding={4} width='full'>
      {categoryId ? (
        showLoader ? (
          <SubCategoriesSkeleton />
        ) : (
          <>
            <Text fontWeight='bold' fontSize='2xl' marginBottom='16px'>
              {data.categoryName}
            </Text>
            <Text fontSize='lg'>
              Please enter the amount <i>per year</i> of each that you use
            </Text>
            <SimpleGrid
              marginTop='16px'
              marginBottom='24px'
              minChildWidth='180px'
              spacing='32px'
            >
              {data.subCategories.map(props => (
                <SubCategory
                  key={props.id}
                  categoryId={categoryId}
                  {...props}
                />
              ))}
            </SimpleGrid>
            <Divider />
            <CalculationResults categoryId={categoryId} />
          </>
        )
      ) : (
        <Text fontWeight='bold' fontSize='2xl' marginBottom='144px'>
          Please select a category
        </Text>
      )}
    </Box>
  );
};
