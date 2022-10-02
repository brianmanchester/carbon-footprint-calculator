import { Heading } from '@chakra-ui/react';
import styles from '@/styles/PageContainer.module.css';

export type PageContainerProps = {
  children: React.ReactNode;
  title: string;
};

export const PageContainer = ({ children, title }: PageContainerProps) => (
  <>
    <Heading className={styles.heading} as='h1' fontWeight='extrabold' size='lg'>
      {title}
    </Heading>
    <div className={styles['page-container']}>{children}</div>
  </>
);
