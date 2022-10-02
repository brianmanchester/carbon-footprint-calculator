import type { NextApiRequest, NextApiResponse } from 'next';
import { supabase } from '@/lib/db/supabase';
import type { Category, SubCategory } from '@/lib/db/schemas';
import { handleResponse } from '@/lib/api/handle-response';
import { APIResponse } from '@/lib/api/types';
import { SubCategoriesPayload } from '@/lib/data/sub-categories';

type Data = APIResponse<SubCategoriesPayload>;

// The Supabase ORM does not seem to have a way to combine the two db reads
// below into one.
const handler = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const categoryId = req.query.categoryId;

  if (typeof categoryId !== 'string') {
    const error = new Error('Invalid request');

    return handleResponse(res, null, {
      error,
      message: error.message,
      statusCode: 400
    });
  }

  const { data: categories, error: categoryError } = await supabase
    .from<Category>('categories')
    .select('name')
    .eq('id', categoryId);

  if (categoryError) {
    handleResponse(res, null, {
      error: categoryError,
      message: categoryError.message
    });
  }

  if (!Array.isArray(categories) || categories.length < 1) {
    const error = new Error('No matching category');

    return handleResponse(res, null, {
      error,
      message: error.message
    });
  }

  const [{ name: categoryName }] = categories;

  const { data: subCategories, error } = await supabase
    .from<SubCategory>('sub_categories')
    .select('*')
    .eq('category_id', categoryId);

  return handleResponse(
    res,
    // @ts-ignore: Problem with supabase types
    { categoryName, subCategories },
    { error, message: error?.message }
  );
};

export default handler;
