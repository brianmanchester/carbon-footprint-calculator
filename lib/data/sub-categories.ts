import { SubCategory } from '../db/schemas';

export type SubCategoriesPayload = {
  categoryName: string;
  subCategories: SubCategory[];
};
