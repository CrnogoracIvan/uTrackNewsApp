import { useQuery } from '@tanstack/react-query';
import { getNewsService } from '../services/newsServices';
import { INewsResponse } from '../types';

/**
 * React Query hook for fetching news data
 * @param options Optional configuration for the query
 * @returns Query result containing news data, loading state, and error state
 */
export const useGetNews = () => {
  return useQuery<INewsResponse, Error>({
    queryKey: ['news'],
    queryFn: getNewsService,
  });
};
