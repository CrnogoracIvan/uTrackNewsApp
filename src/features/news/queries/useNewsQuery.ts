import { useQuery } from '@tanstack/react-query';
import { getNewsService } from '../services/newsServices.ts';
import { INewsResponse } from '../../../types.ts';
import { getNewsMock } from '../../../mockData.ts';

/**
 * React Query hook for fetching news data
 * @param options Optional configuration for the query
 * @returns Query result containing news data, loading state, and error state
 */
export const useGetNews = (useMock: boolean) => {
  return useQuery<INewsResponse, Error>({
    queryKey: ['news'],
    queryFn: useMock ? getNewsMock : getNewsService,
  });
};
