import Image from 'next/image';
import { Highlight, Link} from '@chakra-ui/react';
import { ExternalLinkIcon } from '@chakra-ui/icons'
import styles from '@/styles/Layout.module.css';

export type LayoutProps = {
  children: React.ReactNode;
};

export const Layout = ({ children }: LayoutProps) => (
  <>
    <div className={styles.topbar}>
      <div className={styles['logo-slogan']}>
        <Image
          src='/logo.png'
          alt='Emissions calculator logo'
          width={32}
          height={32}
        />
        <span>
          <Highlight
            styles={{ px: '2', py: '1', rounded: 'full', bg: 'teal.100' }}
            query='Your'
          >
            Reduce Your Carbon Footprint
          </Highlight>
        </span>
      </div>
      <Link
        className={styles['code-link']}
        href='https://github.com/brianmanchester/carbon-footprint-calculator'
        isExternal
        color='teal.500'
      >
        <span>View on GitHub</span>
        <ExternalLinkIcon mx='2' />
      </Link>
    </div>
    <main className={styles.container}>{children}</main>
  </>
);
