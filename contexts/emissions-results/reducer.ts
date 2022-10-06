import { Action, EmissionsResults, Result } from './types';

export const initialState: EmissionsResults = { categories: {} };

type EmissionsResultsReducer = (
  state: typeof initialState,
  action: Action
) => EmissionsResults;

export const emissionsResultsReducer: EmissionsResultsReducer = (
  state,
  { payload, type }
) => {
  switch (type) {
    // Only allow new categories. Do not replace/update categories that already
    // exist.
    case 'add-categories': {
      const newCategories: { [categoryId: number]: Result[] } = {};

      for (const categoryId of payload) {
        const categoryExists = !!state.categories[categoryId];

        if (!categoryExists) {
          newCategories[categoryId] = [];
        }
      }

      return {
        categories: {
          ...state.categories,
          ...newCategories
        }
      };
    }

    // Only allow new results. Do not replace/update results that already exist.
    case 'add-results': {
      const resultsToAdd = [];

      for (const result of payload.results) {
        const resultExists = state.categories[payload.categoryId].some(
          r => r.subCategoryId === result.subCategoryId
        );

        if (!resultExists) {
          resultsToAdd.push(result);
        }
      }

      return {
        categories: {
          ...state.categories,
          [payload.categoryId]: [
            ...state.categories[payload.categoryId],
            ...resultsToAdd
          ]
        }
      };
    }

    case 'update-result':
      // Make a copy so as not to mutate the current results
      const results = [...state.categories[payload.categoryId]];
      const resultIdx = state.categories[payload.categoryId].findIndex(
        r => r.subCategoryId === payload.result.subCategoryId
      );

      // Do nothing if there's no matching result
      if (resultIdx < 0) {
        return state;
      }

      results.splice(resultIdx, 1, payload.result);

      return {
        categories: {
          ...state.categories,
          [payload.categoryId]: results
        }
      };

    default:
      throw new Error(`Invalid action type: ${type}`);
  }
};
