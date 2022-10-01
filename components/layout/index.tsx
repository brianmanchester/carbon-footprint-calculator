import Image from 'next/image';
import {
  Alert,
  AlertIcon,
  CloseButton,
  Highlight,
  Link,
  Stack
} from '@chakra-ui/react';
import { ExternalLinkIcon } from '@chakra-ui/icons';
import styles from '@/styles/Layout.module.css';
import { useNotifications } from 'contexts/notifications';

export type LayoutProps = {
  children: React.ReactNode;
};

export const Layout = ({ children }: LayoutProps) => {
  const { notifications, remove } = useNotifications();

  const handleCloseNotification = (id: string) => {
    remove(id);
  };

  return (
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
      {notifications.length > 0 && (
        <div className={styles.notifications}>
          <Stack spacing={3}>
            {notifications.map(({ id, message, type }) => (
              <Alert className={styles.alert} key={id} status={type}>
                <div className={styles.alert}>
                  <AlertIcon />
                  <span>{message}</span>
                </div>
                <CloseButton
                  onClick={() => handleCloseNotification(id)}
                  size='sm'
                />
              </Alert>
            ))}
          </Stack>
        </div>
      )}
      <main className={styles.container}>{children}</main>
    </>
  );
};
