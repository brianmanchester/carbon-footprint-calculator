import { useQuery } from '@tanstack/react-query';
import { SubCategoriesPayload } from '../data/sub-categories';
import { http } from '../http';

export const useSubCategories = (categoryId?: string) =>
  useQuery<SubCategoriesPayload, Error>(
    ['sub-categories', { categoryId }],
    async () =>
      await http.get<SubCategoriesPayload>(
        `/api/categories/${categoryId}/sub-categories`
      ),
    { enabled: !!categoryId }
  );
