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
  relevance_score?: number | null;
  keywords?: string;
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

export interface IUser {
  name: string;
  email: string;
  password: string;
}

export type TRootStackParamList = {
  Auth: undefined;
  Register: undefined;
  News: undefined;
  Article: { article: INewsArticle };
  NewArticle: undefined;
};
