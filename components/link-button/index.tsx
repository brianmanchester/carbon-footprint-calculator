import NextLink, { LinkProps as NextLinkProps } from 'next/link';
import { Link, LinkProps } from '@chakra-ui/react';

export type LinkButtonProps = Pick<
  NextLinkProps,
  'href' | 'onClick' | 'prefetch' | 'replace' | 'shallow'
> &
  LinkProps;

export const LinkButton = ({
  children,
  href,
  onClick,
  prefetch,
  replace,
  shallow,
  ...props
}: LinkButtonProps) => (
  <NextLink
    href={href}
    onClick={onClick}
    passHref
    prefetch={prefetch}
    replace={replace}
    shallow={shallow}
  >
    <Link style={{ textDecoration: 'none' }} {...props}>
      {children}
    </Link>
  </NextLink>
);
