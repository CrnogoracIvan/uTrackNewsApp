import React, { useEffect, useMemo } from 'react';
import { useGetNews } from '../queries/useNewsQuery.ts';
import { NEWS_CATEGORIES } from '../../../constants.ts';
import { INewsArticle } from '../../../types.ts';
import uuid from 'react-native-uuid';
import {
  getArticlesFromStorage,
  setArticlesToStorage,
} from '../../../utils.ts';

export const useNewsHook = () => {
  const [allData, setAllData] = React.useState<INewsArticle[]>([]);
  const [activeTabIndex, setActiveTabIndex] = React.useState(0);
  const [newArticleTitle, setNewArticleTitle] = React.useState('');
  const [newArticleDescription, setNewArticleDescription] = React.useState('');
  const [newArticleImage, setNewArticleImage] = React.useState(null);
  const [newArticleSource, setNewArticleSource] = React.useState('');
  const [newArticleCategories, setNewArticleCategories] = React.useState<
    string[]
  >([]);

  const { data, isLoading } = useGetNews();

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
    if (allData.length === 0) return allData;
    if (activeTabIndex === 0) {
      return allData;
    }
    return allData.filter(item =>
      item.categories.some(
        category => category === NEWS_CATEGORIES[activeTabIndex].value,
      ),
    );
  }, [activeTabIndex, allData]);

  const handleAddArticle = () => {
    const newArticleData = {
      ...newArticle,
      uuid: uuid.v4(),
      published_at: new Date().toISOString(),
    };
    const newArticles = [newArticleData, ...allData];
    setAllData(newArticles);

    const myArticleData = newArticles.filter(item =>
      item.categories.includes('my'),
    );
    setArticlesToStorage(myArticleData);
    handleClearNewArticle();
  };

  const handleDeleteArticle = (articleUuid: string) => {
    const newArticleData = allData.filter(
      newsArticle => newsArticle.uuid !== articleUuid,
    );
    setAllData(newArticleData);
  };

  const handleClearNewArticle = () => {
    setNewArticleTitle('');
    setNewArticleDescription('');
    setNewArticleImage(null);
    setNewArticleSource('');
    setNewArticleCategories([]);
  };

  useEffect(() => {
    if (!data?.data) {
      return;
    }
    setAllData(data.data || []);
  }, [data]);

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
    handleClearNewArticle,
    handleDeleteArticle,
  };
};
