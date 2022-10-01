import { NextApiRequest } from 'next';

export type QueryParams = NextApiRequest['query'];

export const composeQueryString = (queryParams: QueryParams) => {
  const stringParams: string[] = [];

  for (const paramName in queryParams) {
    const value = queryParams[paramName];

    if (value) {
      stringParams.push(
        `${encodeURIComponent(paramName)}=${encodeURIComponent(
          Array.isArray(value) ? value.join(',') : value
        )}`
      );
    }
  }

  const queryString = stringParams.join('&');

  // Account for an empty query due to all values equaling `undefined`
  return queryString ? `?${queryString}` : '';
};
