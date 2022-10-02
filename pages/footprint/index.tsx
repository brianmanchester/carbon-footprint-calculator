import type { NextPage } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { Categories, CATEGORY_QUERY_PARAM } from '@/components/categories';
import { Calculator } from '@/components/calculator';
import { PageContainer } from '@/components/page-container';

const Footprint: NextPage = () => {
  const { query } = useRouter();
  const categoryQueryParam = query[CATEGORY_QUERY_PARAM];

  let categoryId: string | undefined;

  if (typeof categoryQueryParam === 'string') {
    categoryId = categoryQueryParam;
  }

  return (
    <>
      <Head>
        <title>Footprint</title>
      </Head>
      <PageContainer title='Your Carbon Footprint'>
        <Categories />
        <Calculator categoryId={categoryId} />
      </PageContainer>
    </>
  );
};

export default Footprint;
