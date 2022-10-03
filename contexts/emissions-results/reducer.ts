import { Action, EmissionsResults } from './types';

export const initialState: EmissionsResults = {};

type EmissionsResultsReducer = (
  state: typeof initialState,
  action: Action
) => EmissionsResults;

export const emissionsResultsReducer: EmissionsResultsReducer = (
  state,
  { payload, type }
) => {
  switch (type) {
    case 'add-field':
      return {
        ...state,
        [payload.id]: { name: payload.name, emissions: payload.emissions || 0 }
      };
    case 'update-field-emissions':
      return {
        ...state,
        [payload.id]: { ...state[payload.id], emissions: payload.emissions }
      };
    default:
      throw new Error(`Invalid action type: ${type}`);
  }
};
