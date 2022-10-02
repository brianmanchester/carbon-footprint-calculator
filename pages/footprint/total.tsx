import type { NextPage } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { Categories, CATEGORY_QUERY_PARAM } from '@/components/categories';
import { PageContainer } from '@/components/page-container';
import { TotalFootprint } from '@/components/total-footprint';

const Total: NextPage = () => {
  const { query } = useRouter();
  const categoryQueryParam = query[CATEGORY_QUERY_PARAM];

  let categoryId: string | undefined;

  if (typeof categoryQueryParam === 'string') {
    categoryId = categoryQueryParam;
  }

  return (
    <>
      <Head>
        <title>Total footprint</title>
      </Head>
      <PageContainer title='Your Total Footprint'>
        <Categories showTotalLink={false} />
        <TotalFootprint />
      </PageContainer>
    </>
  );
};

export default Total;
