export interface INewsArticle {
  uuid: string;
  title: string;
  description: string;
  snippet: string;
  url: string;
  image_url: string;
  language: string;
  published_at: string;
  source: string;
  categories: string[];
  relevance_score: number;
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
