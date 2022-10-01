import axios, { AxiosRequestConfig } from 'axios';
import { composeQueryString, QueryParams } from './compose-query-string';

export const get = async <TData>(
  url: string,
  query?: QueryParams,
  config?: AxiosRequestConfig
) => {
  try {
    if (query) {
      url = `${url}${composeQueryString(query)}`;
    }

    const { data } = await axios.get<TData>(url, config);

    return data;
  } catch (err) {
    // Throw for React-Query
    throw err;
  }
};
