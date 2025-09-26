import { INewsCategory } from './types.ts';

export const NEWS_CATEGORIES: INewsCategory[] = [
  { value: 'all', label: 'All' },
  { value: 'tech', label: 'Tech' },
  { value: 'sports', label: 'Sports' },
  { value: 'business', label: 'Business' },
  { value: 'my', label: 'My News' },
];

export const STORAGE_KEYS = {
  ARTICLES: 'ARTICLES',
  ACTIVE_USER: 'ACTIVE_USER',
  REGISTERED_USERS: 'REGISTERED_USERS',
};
