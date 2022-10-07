export type Measurement = 'lbs' | 'kg';

export type SubCategory = {
  id: number;
  name: string;
  created_at: string;
  category_id: number;
  unit: string;
  description: string | null;
  emissions_factor: number;
  measurement: Measurement;
};
