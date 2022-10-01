export type SubCategory = {
  id: number;
  name: string;
  created_at: string;
  category_id: number;
  unit: string;
  unit_description: string | null;
  emissions_factor: number;
}