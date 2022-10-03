import { NextApiRequest } from 'next';

export const parseQueryParamToString = (
  query: NextApiRequest['query'],
  name: string
) => {
  const value = query[name];
  let error: Error | undefined;

  if (typeof value !== 'string') {
    return { error: new Error('Invalid request'), value: '' };
  }

  return { error, value };
};
