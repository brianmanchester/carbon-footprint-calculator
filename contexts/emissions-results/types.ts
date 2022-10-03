export type Action =
  | {
      type: 'add-field';
      payload: { id: number; name: string; emissions?: number };
    }
  | {
      type: 'update-field-emissions';
      payload: { id: number; emissions: number };
    };

export type EmissionsResults = {
  [key: number]: { name: string; emissions: number };
};
