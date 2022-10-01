import { useQuery } from '@tanstack/react-query';
import { CategoriesPayload } from '../data/categories';
import { http } from '../http';

export const getCategories= () => ({
  key: ['categories'],
  fetcher: async () => await http.get<CategoriesPayload>('/api/categories')
});

export const useCategories = () => {
  const { key, fetcher } = getCategories();

  return useQuery<CategoriesPayload, Error>(key, fetcher);
}