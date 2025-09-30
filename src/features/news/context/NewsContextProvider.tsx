import React, { useContext, useEffect, useMemo, useState } from 'react';
import { INewsArticle } from '../../../types.ts';
import { useGetNews } from '../queries/useNewsQuery.ts';
import { useAuthContext } from '../../auth/context/AuthContextProvider.tsx';
import { NEWS_CATEGORIES } from '../../../constants.ts';
import {
  filterMyArticles,
  getArticlesFromStorage,
  setArticlesToStorage,
} from '../../../utils.ts';
import uuid from 'react-native-uuid';

interface IProps {
  children: React.ReactNode;
}

interface INewArticleData {
  title: string;
  description: string;
  image: any;
  source: string;
  categories: string[];
  published_at: string;
  userId: string;
  uuid: string;
}

const initialArticleData: INewArticleData = {
  title: '',
  description: '',
  image: null,
  source: '',
  categories: [],
  published_at: '',
  userId: '',
  uuid: '',
};

const useNewsHook = () => {
  const [allData, setAllData] = useState<INewsArticle[]>([]);
  const [activeTabIndex, setActiveTabIndex] = useState(0);
  const [articleData, setArticleData] =
    useState<INewArticleData>(initialArticleData);

  const [isSearchVisible, setIsSearchVisible] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState('');

  const [isMockDataUsed, setMockDataUsed] = useState(true);

  const { data, isLoading, refetch, isRefetching } = useGetNews(isMockDataUsed);
  const { activeUser } = useAuthContext();

  const newArticle = useMemo<INewsArticle>(() => {
    return {
      uuid: articleData.uuid || '',
      title: articleData.title,
      description: articleData.description,
      url: articleData.source,
      // @ts-ignore
      image_url: articleData?.image?.uri || articleData.image_url,
      published_at: articleData.published_at || '',
      source: articleData.source,
      categories: [...articleData.categories],
      userId: articleData.userId || '',
    };
  }, [articleData]);

  const toggleMockDataUsage = () => {
    setMockDataUsed(prevState => !prevState);
  };

  const handleSetNewArticleTitle = (title: string) => {
    setArticleData(prevState => ({
      ...prevState,
      title,
    }));
  };

  const handleSetNewArticleDescription = (description: string) => {
    setArticleData(prevState => ({
      ...prevState,
      description,
    }));
  };

  const handleSetNewArticleSource = (source: string) => {
    setArticleData(prevState => ({
      ...prevState,
      source,
    }));
  };

  const handleSetNewArticleCategories = (categories: string[]) => {
    setArticleData(prevState => ({
      ...prevState,
      categories,
    }));
  };

  const handleSetNewArticleImage = (image: any) => {
    setArticleData(prevState => ({
      ...prevState,
      image,
    }));
  };

  const isAddNewArticleButtonDisabled =
    articleData.title.length === 0 ||
    articleData.categories.length === 0 ||
    articleData.description.length === 0 ||
    articleData.source.length === 0;

  const filteredDataByCategory = useMemo(() => {
    if (allData.length === 0) return [];
    if (activeTabIndex === 0) {
      return allData;
    }
    return allData.filter(item => {
      if (NEWS_CATEGORIES[activeTabIndex].value === 'my') {
        return (
          item.categories.includes(NEWS_CATEGORIES[activeTabIndex].value) &&
          item.userId === activeUser.id
        );
      }
      return item.categories.includes(NEWS_CATEGORIES[activeTabIndex].value);
    });
  }, [activeTabIndex, allData, activeUser]);

  const filteredBySearch = useMemo(() => {
    const filteredData = allData.filter(item => {
      return (
        item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.source.toLowerCase().includes(searchTerm.toLowerCase())
      );
    });
    if (filteredData.length) {
      return filteredData;
    }
    return allData;
  }, [allData, searchTerm]);

  const handleAddArticle = async () => {
    const newArticleData = {
      ...newArticle,
      uuid: uuid.v4(),
      published_at: new Date().toISOString(),
      userId: activeUser.id,
      categories: [...articleData.categories, 'my'],
    };
    const newArticles = [newArticleData, ...allData];
    setAllData(newArticles);

    const myArticleData = filterMyArticles(newArticles);
    setArticlesToStorage(myArticleData);
    handleClearNewArticleForm();
  };

  const handleEditArticle = (articleForEditing: INewsArticle) => {
    const existingArticleIndex = allData.findIndex(
      allDataArticle => allDataArticle.uuid === articleForEditing.uuid,
    );
    if (existingArticleIndex !== -1) {
      const newArticles = [...allData];
      newArticles[existingArticleIndex] = newArticle;
      setAllData(newArticles);

      const myArticleData = filterMyArticles(newArticles);
      setArticlesToStorage(myArticleData);
    }
  };

  const handleDeleteArticle = (articleUuid: string) => {
    const newArticleData = allData.filter(
      newsArticle => newsArticle.uuid !== articleUuid,
    );
    setAllData(newArticleData);
    const myArticleData = filterMyArticles(newArticleData);
    setArticlesToStorage(myArticleData);
  };

  const handleClearNewArticleForm = () => {
    setArticleData(initialArticleData);
  };

  const handleSearchToggle = () => {
    setIsSearchVisible(prevState => !prevState);
    setActiveTabIndex(0);
  };

  const handleClearSearch = () => {
    setSearchTerm('');
    setIsSearchVisible(false);
  };

  useEffect(() => {
    const newsDataSetup = async () => {
      let tempData: INewsArticle[] = [];
      const dataFromStorage = await getArticlesFromStorage();
      if (dataFromStorage) {
        tempData = [...dataFromStorage];
      }
      if (data?.data) {
        tempData = [...tempData, ...data?.data];
      }
      setAllData(tempData);
    };
    newsDataSetup();
  }, [data?.data]);

  return {
    isMockDataUsed,
    toggleMockDataUsage,

    activeTabIndex,
    setActiveTabIndex,
    isSearchVisible,
    handleSearchToggle,
    searchTerm,
    setSearchTerm,
    handleClearSearch,
    filteredBySearch,

    areNewsLoading: isLoading,
    areNewsRefetching: isRefetching,
    refetchNews: refetch,
    filteredDataByCategory,
    isAddNewArticleButtonDisabled,

    articleData,
    setArticleData,
    handleSetNewArticleTitle,
    handleSetNewArticleDescription,
    handleSetNewArticleSource,
    handleSetNewArticleCategories,
    handleSetNewArticleImage,

    handleAddArticle,
    handleEditArticle,
    handleClearNewArticleForm,
    handleDeleteArticle,
  };
};

const NewsContext = React.createContext<any>(null);

export const NewsContextProvider = ({ children }: IProps) => {
  const newsContextValue = useNewsHook();
  return (
    <NewsContext.Provider value={newsContextValue}>
      {children}
    </NewsContext.Provider>
  );
};

export const useNewsContext = () => {
  const context = useContext(NewsContext);
  if (!context) {
    throw new Error('useNewsContext must be used within a NewsContextProvider');
  }
  return context;
};
