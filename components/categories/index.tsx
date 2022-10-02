import { useCategories } from '@/lib/queries/use-categories';
import { Box, Skeleton, Text } from '@chakra-ui/react';
import { LinkButton } from '../link-button';
import styles from '@/styles/Categories.module.css';
import { useHandleError } from '@/hooks/use-handle-error';

export const CATEGORY_QUERY_PARAM = 'category';

export const Categories = () => {
  const { data, error, isLoading } = useCategories();

  useHandleError(error);

  const showLoader = !!error || isLoading || !data;

  return (
    <Box
      className={styles['link-group']}
      borderRadius='lg'
      boxShadow='base'
      padding={4}
      minWidth='xs'
    >
      {showLoader ? (
        <>
          <Skeleton borderRadius='lg' width='200px' height='36px' />
          <Skeleton borderRadius='lg' height='56px' width='100%' />
          <Skeleton borderRadius='lg' height='56px' width='100%' />
        </>
      ) : (
        <>
          <Text fontWeight='bold' fontSize='2xl'>
            Select a Category
          </Text>
          {data.map(({ id, name }) => (
            <LinkButton
              className={styles['category-link']}
              href={`/footprint?${CATEGORY_QUERY_PARAM}=${id}`}
              key={id}
              backgroundColor='cyan.600'
              borderRadius='lg'
              textAlign='center'
              textColor='white'
              fontWeight='bold'
              _hover={{
                backgroundColor: 'cyan.800'
              }}
            >
              {name}
            </LinkButton>
          ))}
        </>
      )}
    </Box>
  );
};
