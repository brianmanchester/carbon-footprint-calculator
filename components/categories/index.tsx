import { useCategories } from '@/lib/queries/use-categories';
import { Box, Divider, Text } from '@chakra-ui/react';
import { LinkButton } from '../link-button';
import styles from '@/styles/Categories.module.css';
import { useHandleError } from '@/hooks/use-handle-error';
import { CategoriesSkeleton } from '@/components/skeletons';
import { useEffect } from 'react';
import { useEmissionsResults } from '@/contexts/emissions-results';

export const CATEGORY_QUERY_PARAM = 'category';

export type CategoriesProps = {
  showTotalLink?: boolean;
};

export const Categories = ({ showTotalLink = true }: CategoriesProps) => {
  const { data, error, isLoading } = useCategories();
  const { dispatch } = useEmissionsResults();

  useHandleError(error);

  const showLoader = !!error || isLoading || !data;

  useEffect(() => {
    if (data) {
      dispatch({ type: 'add-categories', payload: data.map(c => c.id) });
    }
  }, [data, dispatch]);

  return (
    <Box
      className={styles['link-group']}
      borderRadius='lg'
      boxShadow='base'
      padding={4}
      minWidth='xs'
    >
      {showLoader ? (
        <CategoriesSkeleton />
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
          {showTotalLink && (
            <>
              <Divider />
              <LinkButton
                className={styles['category-link']}
                href={`/footprint/total`}
                backgroundColor='cyan.600'
                borderRadius='lg'
                textAlign='center'
                textColor='white'
                fontWeight='bold'
                _hover={{
                  backgroundColor: 'cyan.800'
                }}
              >
                Total footprint
              </LinkButton>
            </>
          )}
        </>
      )}
    </Box>
  );
};
