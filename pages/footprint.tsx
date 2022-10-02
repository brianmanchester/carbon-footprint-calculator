import type { NextPage } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { Heading } from '@chakra-ui/react';
import styles from '@/styles/Footprint.module.css';
import { Categories, CATEGORY_QUERY_PARAM } from '@/components/categories';
import { Calculator } from '@/components/calculator';

const Uses: NextPage = () => {
  const { query } = useRouter();
  const categoryQueryParam = query[CATEGORY_QUERY_PARAM];

  let categoryId: number | undefined;

  if (typeof categoryQueryParam === 'string') {
    categoryId = Number(categoryQueryParam)
  }

  return (
    <>
      <Head>
        <title>Uses</title>
      </Head>
      <Heading as='h1' fontWeight='extrabold' size='lg'>
        Your Carbon Footprint
      </Heading>
      <div className={styles['footprint-container']}>
        <Categories />
        <Calculator categoryId={Number(categoryId)} />
      </div>
    </>
  );
}

export default Uses;