import { createContext, Dispatch, useContext, useReducer } from 'react';
import { Action, EmissionsResults as Results } from './types';
import { emissionsResultsReducer, initialState } from './reducer';

type EmissionsResults = {
  state: Results;
  dispatch: Dispatch<Action>;
};

const EmissionsResultsContext = createContext<EmissionsResults | undefined>(
  undefined
);

const EmissionsResultsProvider = ({
  children
}: {
  children: React.ReactNode;
}) => {
  const [state, dispatch] = useReducer(emissionsResultsReducer, initialState);

  return (
    <EmissionsResultsContext.Provider value={{ dispatch, state }}>
      {children}
    </EmissionsResultsContext.Provider>
  );
};

const useEmissionsResults = () => {
  const context = useContext(EmissionsResultsContext);

  if (context === undefined) {
    throw new Error(
      'useEmissionsResults must be used within a EmissionsResultsProvider'
    );
  }

  return context;
};

export { EmissionsResultsProvider, useEmissionsResults };
