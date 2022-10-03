import { NextApiRequest } from 'next';

export const parseQueryParamToStringArray = (
  query: NextApiRequest['query'],
  name: string
) => {
  const value = query[name];
  let error: Error | undefined;

  if (!Array.isArray(value)) {
    return { error: new Error('Invalid request'), value: [] };
  }

  return { error, value };
};
