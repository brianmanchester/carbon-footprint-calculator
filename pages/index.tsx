import { useEffect } from 'react';
import { useCategories } from '@/lib/queries/use-categories';
import type { NextPage } from 'next';
import { Heading } from '@chakra-ui/react';
import Head from 'next/head';
import Image from 'next/image';
import styles from '../styles/Home.module.css';
import { useNotifications } from 'contexts/notifications';
import { Categories } from '@/components/categories';

const Home: NextPage = () => {
  const { data, error, isLoading } = useCategories();
  const { add, remove } = useNotifications();

  // `add` and `remove` are stable and won't cause a re-effect
  useEffect(() => {
    let notificationId = '';

    if (error) {
      notificationId = add('error', error.message);
    }

    return () => {
      if (error) {
        remove(notificationId);
      }
    }
  }, [add, error, remove]);

  return (
    <>
      <Head>
        <title>Home</title>
      </Head>
      <div className={styles['logo-container']}>
        <Image src="/logo.png" alt="logo" width={128}  height={128} />
      </div>
      <Heading
        as='h1'
        bgGradient='linear(to-l, #7928CA, #FF0080)'
        bgClip='text'
        className={styles.heading}
        fontWeight='extrabold'
        size='2xl'
      >
        Calculate Your Carbon Footprint
      </Heading>
      {!error && <Categories data={data} isLoading={isLoading} />}
    </>
  );
};

export default Home;
