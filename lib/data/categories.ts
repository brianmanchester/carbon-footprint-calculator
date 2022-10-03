import { Category } from "../db/schemas";

export type CategoriesPayload = Pick<Category, 'id' | 'name'>[];