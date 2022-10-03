import type { NextApiRequest, NextApiResponse } from 'next';
import { supabase } from '@/lib/db/supabase';
import type { Category } from '@/lib/db/schemas';
import { handleResponse } from '@/lib/api/handle-response';
import { APIResponse } from '@/lib/api/types';
import { CategoriesPayload } from '@/lib/data/categories';

type Data = APIResponse<CategoriesPayload>;

const handler = async (_req: NextApiRequest, res: NextApiResponse<Data>) => {
  const { data, error } = await supabase
    .from<Category>('categories')
    .select('id, name')
    .order('name');

  if (!Array.isArray(data) || data.length < 1) {
    const noMatchError = new Error('No matching category');

    return handleResponse(res, null, {
      error: noMatchError,
      message: noMatchError.message,
      statusCode: 404
    });
  }

  handleResponse(res, data, { error, message: error?.message });
};

export default handler;
