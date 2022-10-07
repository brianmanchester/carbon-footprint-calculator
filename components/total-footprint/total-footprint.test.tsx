import {
  EmissionsResultsProvider,
  useEmissionsResults
} from '@/contexts/emissions-results';
import { render, screen } from '@testing-library/react';
import { useEffect } from 'react';
import { TotalFootprint } from './index';

describe('tests for TotalFootprint component', () => {
  it('should show the correct total emissions', () => {
    const AddResults = ({ categoryId }: { categoryId: number }) => {
      const {
        dispatch,
        state: { categories }
      } = useEmissionsResults();

      useEffect(() => {
        dispatch({
          type: 'add-results',
          payload: {
            categoryId,
            results: [
              {
                emissions: 14,
                loading: false,
                name: 'one',
                subCategoryId: 1,
                uses: ''
              },
              {
                emissions: 17,
                loading: false,
                name: 'two',
                subCategoryId: 2,
                uses: ''
              }
            ]
          }
        });
      }, [categoryId, dispatch]);

      return null;
    };

    const AddCategories = () => {
      const {
        dispatch,
        state: { categories }
      } = useEmissionsResults();

      useEffect(() => {
        dispatch({ type: 'add-categories', payload: [1, 2] });
      }, [dispatch]);

      return (
        <div>
          {categories[1] && categories[2] && (
            <>
              <AddResults categoryId={1} />
              <AddResults categoryId={2} />
              {categories[1]?.length > 0 && categories[2]?.length > 0 && (
                <TotalFootprint />
              )}
            </>
          )}
        </div>
      );
    };

    render(
      <EmissionsResultsProvider>
        <AddCategories />
      </EmissionsResultsProvider>
    );

    const totalFootprintEl = screen.getByTestId('total-per-year');

    expect(totalFootprintEl.textContent).toEqual('Total per year: 62');
  });
});
