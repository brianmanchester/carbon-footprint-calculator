import {
  Input,
  InputGroup,
  InputRightAddon,
  Text,
  Tooltip
} from '@chakra-ui/react';
import { useDebounce } from 'use-debounce';
import styles from '@/styles/SubCategory.module.css';
import { InfoIcon } from '@chakra-ui/icons';
import { useEmissionsResults } from '@/contexts/emissions-results';
import { ChangeEvent, useEffect, useState } from 'react';
import { useEmissions } from '@/lib/queries/use-emissions';
import { useHandleError } from '@/hooks/use-handle-error';

export type SubCategoryProps = {
  id: number;
  categoryId: number;
  description: string | null;
  name: string;
  unit: string;
};

export const SubCategory = ({
  id,
  categoryId,
  description,
  name,
  unit
}: SubCategoryProps) => {
  const {
    dispatch,
    state: { categories }
  } = useEmissionsResults();
  const [value, setValue] = useState(
    categories[categoryId]?.find(r => r.subCategoryId === id)?.uses || ''
  );
  const [debouncedValue] = useDebounce(value, 300);
  const { data, error, isFetching } = useEmissions(id, debouncedValue);

  useHandleError(error);

  const handleChange = ({
    target: { value: inputValue }
  }: ChangeEvent<HTMLInputElement>) => {
    setValue(inputValue);
  };

  // Only dynamic data is `data?.emissions`, `debouncedValue` and `isFetching`,
  // so this effect will only rerun when those change
  useEffect(() => {
    dispatch({
      type: 'update-result',
      payload: {
        categoryId,
        result: {
          emissions: data?.emissions || 0,
          loading: isFetching,
          name,
          subCategoryId: id,
          uses: debouncedValue
        }
      }
    });
  }, [
    categoryId,
    data?.emissions,
    debouncedValue,
    dispatch,
    id,
    isFetching,
    name
  ]);

  return (
    <div className={styles['input-container']}>
      <div className={styles.label}>
        <Text>{name}</Text>
        {description && (
          <Tooltip label={description}>
            <InfoIcon />
          </Tooltip>
        )}
      </div>
      <InputGroup>
        <Input
          disabled={isFetching}
          focusBorderColor='cyan.600'
          min='0'
          onChange={handleChange}
          type='number'
          value={value}
        />
        {/* The Chakra library uses this `children` prop */}
        {/* eslint-disable-next-line react/no-children-prop */}
        <InputRightAddon children={unit} />
      </InputGroup>
    </div>
  );
};
