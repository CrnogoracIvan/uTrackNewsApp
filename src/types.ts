export interface INewsArticle {
  uuid: string;
  title: string;
  description: string;
  url: string;
  image_url: string;
  published_at: string;
  source: string;
  categories: string[];
  language?: string;
  snippet?: string;
  relevance_score?: number;
  isMyArticle?: boolean;
}

export interface INewsResponse {
  meta: {
    found: number;
    returned: number;
    limit: number;
    page: number;
  };
  data: INewsArticle[];
}

export interface INewsCategory {
  value: string;
  label: string;
}

export type TRootStackParamList = {
  Auth: undefined;
  News: undefined;
  Article: { article: INewsArticle };
  NewArticle: undefined;
};
