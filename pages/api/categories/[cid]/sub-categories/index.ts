import type { NextApiRequest, NextApiResponse } from 'next';
import { supabase } from '@/lib/db/supabase';
import type { Category, SubCategory } from '@/lib/db/schemas';
import { handleResponse } from '@/lib/api/handle-response';
import { APIResponse } from '@/lib/api/types';
import { SubCategoriesPayload } from '@/lib/data/sub-categories';
import { parseQueryParamToString } from '@/lib/api/parse-query-param-to-string';

type Data = APIResponse<SubCategoriesPayload>;

// The Supabase ORM does not seem to have a way to combine the two db reads
// below into one.
const handler = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const { error: categoryIdQueryParamError, value: categoryId } =
    parseQueryParamToString(req.query, 'cid');

  if (categoryIdQueryParamError) {
    return handleResponse(res, null, {
      error: categoryIdQueryParamError,
      message: categoryIdQueryParamError.message,
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
    const noMatchingCategoryError = new Error('No matching category');

    return handleResponse(res, null, {
      error: noMatchingCategoryError,
      message: noMatchingCategoryError.message,
      statusCode: 404
    });
  }

  // The supabase ORM doesn't have a findOne
  const [{ name: categoryName }] = categories;

  const { data: subCategories, error: subCategoriesError } = await supabase
    .from<SubCategory>('sub_categories')
    .select('description, id, name, unit')
    .eq('category_id', categoryId);

  if (!Array.isArray(subCategories) || subCategories.length < 1) {
    const noMatchingSubCategoriesError = new Error(
      'No matching sub categories'
    );

    return handleResponse(res, null, {
      error: noMatchingSubCategoriesError,
      message: noMatchingSubCategoriesError.message,
      statusCode: 404
    });
  }

  handleResponse(
    res,
    { categoryName, subCategories },
    { error: subCategoriesError, message: subCategoriesError?.message }
  );
};

export default handler;
