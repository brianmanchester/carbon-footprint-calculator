import type { NextPage } from 'next';
import { Heading } from '@chakra-ui/react';
import Head from 'next/head';
import Image from 'next/image';
import { Categories } from '@/components/categories';
import styles from '@/styles/Home.module.css';

const Home: NextPage = () => (
  <>
    <Head>
      <title>Home</title>
    </Head>
    <div className={styles['logo-container']}>
      <Image src='/logo.png' alt='logo' width={128} height={128} />
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
    <div className={styles['categories-container']}>
      <Categories />
    </div>
  </>
);

export default Home;
