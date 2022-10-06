export type Result = {
  emissions: number;
  loading: boolean;
  name: string;
  subCategoryId: number;
  uses: string;
};

export type Action =
  | {
      type: 'add-categories';
      payload: number[];
    }
  | {
      type: 'add-results';
      payload: { categoryId: number; results: Result[] };
    }
  | {
      type: 'update-result';
      payload: { categoryId: number; result: Result };
    };

export type EmissionsResults = {
  categories: {
    [categoryId: number]: Result[];
  };
};
