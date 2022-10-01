import { PostgrestError } from '@supabase/supabase-js';
import type { NextApiResponse } from 'next';
import { APIResponse } from '../types';

type ErrorDetails = {
  error?: PostgrestError | Error | null;
  message?: string;
  statusCode?: number;
};

export const handleResponse = <TData>(
  res: NextApiResponse<APIResponse<TData>>,
  data: TData | null,
  err?: ErrorDetails
) => {
  if (data === null || err?.error) {
    res.status(err?.statusCode || 500).send({
      message: err?.message || 'An error occurred'
    });
  } else {
    res.status(200).json(data);
  }
};
