import type { NextApiRequest, NextApiResponse } from 'next';
import { supabase } from '@/lib/db/supabase';
import type { SubCategory } from '@/lib/db/schemas';
import { handleResponse } from '@/lib/api/handle-response';
import { APIResponse } from '@/lib/api/types';
import { EmissionsPayload } from '@/lib/data/emissions';
import { parseQueryParamToString } from '@/lib/api/parse-query-param-to-string';
import { calculateEmissions } from '@/lib/api/calculate-emissions';

type Data = APIResponse<EmissionsPayload>;

// This is a contrived example. The frontend could have all it needs to
// calculate the emissions (use value and emissions factor), but it's easier to
// imagine a future where this calculation is more complex and would possibly
// require more db tables, like regional values for emissions factors. So, for
// now, we'll handle this simple calculation on the backend.
const handler = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const { error: subCategoryIdQueryParamError, value: subCategoryId } =
    parseQueryParamToString(req.query, 'scid');

  if (subCategoryIdQueryParamError) {
    return handleResponse(res, null, {
      error: subCategoryIdQueryParamError,
      message: subCategoryIdQueryParamError.message,
      statusCode: 400
    });
  }

  const { error: useQueryParamError, value: use } = parseQueryParamToString(
    req.query,
    'use'
  );

  if (useQueryParamError) {
    return handleResponse(res, null, {
      error: useQueryParamError,
      message: useQueryParamError.message,
      statusCode: 400
    });
  }

  const { data, error } = await supabase
    .from<SubCategory>('sub_categories')
    .select('emissions_factor')
    .eq('id', subCategoryId);

  if (!Array.isArray(data) || data.length < 1) {
    const noMatchError = new Error('No matching sub category');

    return handleResponse(res, null, {
      error: noMatchError,
      message: noMatchError.message,
      statusCode: 404
    });
  }

  // The supabase ORM doesn't have a findOne
  const [{ emissions_factor }] = data;

  handleResponse(
    res,
    {
      emissions: calculateEmissions(Number(use), emissions_factor)
    },
    { error, message: error?.message }
  );
};

export default handler;
