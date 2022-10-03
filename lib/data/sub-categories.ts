import { SubCategory } from '../db/schemas';

export type SubCategoriesPayload = {
  categoryName: string;
  subCategories: Pick<SubCategory, 'description' | 'id' | 'name' | 'unit'>[];
};
