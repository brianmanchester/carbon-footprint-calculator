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
    .select('*');

  return handleResponse(res, data, { error, message: error?.message });
};

export default handler;
