import { Result } from '@/contexts/emissions-results/types';
import { render, screen } from '@testing-library/react';
import { TotalFootprintSum } from '.';

describe('tests for TotalFootprintSum component', () => {
  it('should display the correct total', () => {
    const results: Result[] = [
      {
        emissions: 12,
        loading: false,
        name: 'test-one',
        subCategoryId: 1,
        uses: '3'
      },
      {
        emissions: 14,
        loading: false,
        name: 'test-two',
        subCategoryId: 1,
        uses: '4.3'
      }
    ];

    render(<TotalFootprintSum results={results} />);

    const totalPerYearEl = screen.getByTestId('total-per-year');
    expect(totalPerYearEl.textContent).toEqual('Total per year: 26')
  });
});
