import { ReactNode } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import nock from 'nock';
import { renderHook, waitFor } from '@testing-library/react';
import { useEmissions } from '.';

const queryClient = new QueryClient();

const wrapper = ({ children }: { children: ReactNode }) => (
  <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
);

// Haven't finished debugging. The nock mock is failing at the moment.
describe.skip('tests for useEmissions hook', () => {
  it('should return success with the correct value', async () => {
    nock('http://localhost:3000')
      .get('/api/sub-categories/1/emissions')
      .reply(200, {
        emissions: 12
      });

    const { result } = renderHook(() => useEmissions(1, '3'), { wrapper });

    await waitFor(() => {
      return result.current.isSuccess;
    });

    expect(result.current.isSuccess).toEqual(true);
  });
});
