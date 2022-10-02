import { useHandleError } from '@/hooks/use-handle-error';
import { useSubCategories } from '@/lib/queries/use-sub-categories';
import { Box, SimpleGrid, Skeleton, Text } from '@chakra-ui/react';
import { SubCategory } from '@/components/sub-category';

export type CalculatorProps = {
  categoryId?: string;
};

export const Calculator = ({ categoryId }: CalculatorProps) => {
  const { data, error, isLoading } = useSubCategories(categoryId);
  console.log('data: ', data);

  useHandleError(error);

  const showLoader = !!error || isLoading || !data;

  return (
    <Box borderRadius='lg' boxShadow='base' padding={4} width='full'>
      {categoryId ? (
        showLoader ? (
          <>
            <Skeleton borderRadius='lg' width='200px' height='36px' />
            <Skeleton borderRadius='lg' height='56px' width='100%' />
            <Skeleton borderRadius='lg' height='56px' width='100%' />
          </>
        ) : (
          <>
            <Text fontWeight='bold' fontSize='2xl' marginBottom='16px'>
              {data.categoryName}
            </Text>
            <SimpleGrid minChildWidth='160px' spacing="32px">
              {data.subCategories.map(props => (
                <SubCategory key={props.id} {...props} />
              ))}
            </SimpleGrid>
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
