import { EmissionsResultsProvider, useEmissionsResults } from './index';
import { render, screen } from '@testing-library/react';
import { useEffect, useRef } from 'react';

describe('tests for emissions results context', () => {
  it('should add categories', () => {
    const AddCategories = () => {
      const {
        dispatch,
        state: { categories }
      } = useEmissionsResults();

      useEffect(() => {
        dispatch({ type: 'add-categories', payload: [1, 2] });
      }, [dispatch]);

      return (
        <div data-testid='categories'>{Object.keys(categories).toString()}</div>
      );
    };

    render(
      <EmissionsResultsProvider>
        <AddCategories />
      </EmissionsResultsProvider>
    );

    const categoriesDiv = screen.getByTestId('categories');

    expect(categoriesDiv.textContent).toEqual('1,2');
  });

  it('should add results', () => {
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
                emissions: 0,
                loading: false,
                name: 'one',
                subCategoryId: 1,
                uses: ''
              },
              {
                emissions: 0,
                loading: false,
                name: 'two',
                subCategoryId: 2,
                uses: ''
              }
            ]
          }
        });
      }, [categoryId, dispatch]);

      return (
        <div data-testid='results'>
          {categories[categoryId]?.[0]?.name}{' '}
          {categories[categoryId]?.[1]?.name}
        </div>
      );
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
          {categories[1] && categories[2] && <AddResults categoryId={1} />}
        </div>
      );
    };

    render(
      <EmissionsResultsProvider>
        <AddCategories />
      </EmissionsResultsProvider>
    );

    const resultsDiv = screen.getByTestId('results');

    expect(resultsDiv.textContent).toEqual('one two');
  });

  it('should update a result', () => {
    const UpdateResult = ({
      categoryId,
      subCategoryId
    }: {
      categoryId: number;
      subCategoryId: number;
    }) => {
      const {
        dispatch,
        state: { categories }
      } = useEmissionsResults();
      const prevResult = useRef(
        categories[categoryId]?.find(r => r.subCategoryId === subCategoryId)
          ?.uses
      );

      const updatedResult = categories[categoryId]?.find(
        r => r.subCategoryId === subCategoryId
      )?.uses;

      useEffect(() => {
        dispatch({
          type: 'update-result',
          payload: {
            categoryId,
            result: {
              emissions: 0,
              loading: false,
              name: 'one',
              subCategoryId,
              uses: '5'
            }
          }
        });
      }, [categoryId, dispatch, subCategoryId]);

      return (
        <>
          <div data-testid='prev-result'>{prevResult.current}</div>
          <div data-testid='updated-result'>{updatedResult}</div>
        </>
      );
    };

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
                emissions: 0,
                loading: false,
                name: 'one',
                subCategoryId: 1,
                uses: ''
              },
              {
                emissions: 0,
                loading: false,
                name: 'two',
                subCategoryId: 2,
                uses: ''
              }
            ]
          }
        });
      }, [categoryId, dispatch]);

      return (
        <div>
          {categories[categoryId]?.length > 0 && (
            <UpdateResult categoryId={categoryId} subCategoryId={1} />
          )}
        </div>
      );
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
          {categories[1] && categories[2] && <AddResults categoryId={1} />}
        </div>
      );
    };

    render(
      <EmissionsResultsProvider>
        <AddCategories />
      </EmissionsResultsProvider>
    );

    const prevResultDiv = screen.getByTestId('prev-result');
    const updatedResultDiv = screen.getByTestId('updated-result');

    expect(prevResultDiv.textContent).toEqual('');
    expect(updatedResultDiv.textContent).toEqual('5');
  });

  it('should throw an error when the context is used outside a provider', () => {
    const ShouldThrow = () => {
      const { state: _ } = useEmissionsResults();

      return <div>Error</div>;
    };

    expect(() => render(<ShouldThrow />)).toThrow(
      'useEmissionsResults must be used within a EmissionsResultsProvider'
    );
  });
});
