import { INewsResponse } from '../types.ts';

export const getNewsService = async (): Promise<INewsResponse> => {
  try {
    const response = await fetch(
      'https://api.thenewsapi.com/v1/news/all?api_token=pkcKShKCbaEW2zitVU8leXmXMEm3ihm86NblMzfI&language=en&limit=6',
    );

    if (!response.ok) {
      throw new Error(
        `Failed to fetch news: ${response.status} ${response.statusText}`,
      );
    }

    const data: INewsResponse = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching news:', error);
    throw error;
  }
};
