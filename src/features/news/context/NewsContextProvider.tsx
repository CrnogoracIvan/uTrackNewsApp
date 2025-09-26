import React, { useContext, useEffect, useMemo, useState } from 'react';
import { INewsArticle } from '../../../types.ts';
import { useGetNews } from '../queries/useNewsQuery.ts';
import { useAuthContext } from '../../auth/context/AuthContextProvider.tsx';
import { NEWS_CATEGORIES } from '../../../constants.ts';
import {
  filterMyArticles,
  getActiveUserFromStorage,
  getArticlesFromStorage,
  setArticlesToStorage,
} from '../../../utils.ts';
import uuid from 'react-native-uuid';

interface IProps {
  children: React.ReactNode;
}
const useNewsHook = () => {
  const [allData, setAllData] = useState<INewsArticle[]>([]);
  const [activeTabIndex, setActiveTabIndex] = useState(0);
  const [newArticleTitle, setNewArticleTitle] = useState('');
  const [newArticleDescription, setNewArticleDescription] = useState('');
  const [newArticleImage, setNewArticleImage] = useState(null);
  const [newArticleSource, setNewArticleSource] = useState('');
  const [newArticleCategories, setNewArticleCategories] = useState<string[]>(
    [],
  );

  const { data, isLoading } = useGetNews();
  const { activeUser } = useAuthContext();

  const newArticle = useMemo<INewsArticle>(() => {
    return {
      uuid: '',
      title: newArticleTitle,
      description: newArticleDescription,
      url: newArticleSource,
      // @ts-ignore
      image_url: newArticleImage?.uri,
      published_at: '',
      source: newArticleSource,
      categories: [...newArticleCategories, 'my'],
    };
  }, [
    newArticleCategories,
    newArticleDescription,
    newArticleImage,
    newArticleSource,
    newArticleTitle,
  ]);
  const isAddNewArticleButtonDisabled =
    newArticleTitle.length === 0 ||
    newArticleCategories.length === 0 ||
    newArticleDescription.length === 0 ||
    newArticleSource.length === 0;

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

  const handleAddArticle = async () => {
    const activeUser = await getActiveUserFromStorage();
    const newArticleData = {
      ...newArticle,
      uuid: uuid.v4(),
      published_at: new Date().toISOString(),
      userId: activeUser.id,
    };
    const newArticles = [newArticleData, ...allData];
    setAllData(newArticles);

    const myArticleData = filterMyArticles(newArticles);
    setArticlesToStorage(myArticleData);
    handleClearNewArticleForm();
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
    setNewArticleTitle('');
    setNewArticleDescription('');
    setNewArticleImage(null);
    setNewArticleSource('');
    setNewArticleCategories([]);
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
    activeTabIndex,
    setActiveTabIndex,

    areNewsLoading: isLoading,
    filteredDataByCategory,
    isAddNewArticleButtonDisabled,

    newArticleTitle,
    setNewArticleTitle,
    newArticleDescription,
    setNewArticleDescription,
    newArticleImage,
    setNewArticleImage,
    newArticleSource,
    setNewArticleSource,
    newArticleCategories,
    setNewArticleCategories,

    handleAddArticle,
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
