import { SubCategory as SubCategoryType } from '@/lib/db/schemas';
import { Input, Text } from '@chakra-ui/react';
import styles from '@/styles/SubCategory.module.css'
import { InfoIcon } from '@chakra-ui/icons';

export type SubCategoryProps = SubCategoryType;

export const SubCategory = ({
  name,
  unit,
  unit_description
}: SubCategoryProps) => {

  return (
    <div className={styles['input-container']}>
      <div className={styles.label}>
        <Text>{name}</Text>
        <InfoIcon />
      </div>
      <Input focusBorderColor='cyan.600' type='number' />
    </div>
  );
};
