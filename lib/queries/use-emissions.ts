import { useQuery } from '@tanstack/react-query';
import { EmissionsPayload } from '../data/emissions';
import { http } from '../http';

export const useEmissions = (subCategoryId: number, use: number) =>
  useQuery<EmissionsPayload, Error>(
    ['emissions', { subCategoryId, use }],
    async () =>
      await http.get<EmissionsPayload>(
        `/api/sub-categories/${subCategoryId}/emissions`,
        { use: String(use) }
      )
  );
