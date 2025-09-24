import { INewsResponse } from '../../../types.ts';
import { NEWS_DATA_MOCK } from '../../../mockData.ts';

export const getNewsService = async (): Promise<INewsResponse> => {
  try {
    const response = await fetch(
      'https://api.thenewsapi.com/v1/news/all?api_token=pkcKShKCbaEW2zitVU8leXmXMEm3ihm86NblMzfI&language=en&&categories=bussines,tech,sports&limit=3',
    );
    console.log('response', response);

    const data: INewsResponse = response.ok
      ? await response.json()
      : NEWS_DATA_MOCK;
    return data;
  } catch (error) {
    console.error('Error fetching news:', error);
    return NEWS_DATA_MOCK;
  }
};
