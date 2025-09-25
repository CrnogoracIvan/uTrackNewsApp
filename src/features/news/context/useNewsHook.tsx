import React, { useEffect, useMemo } from 'react';
import { useGetNews } from '../queries/useNewsQuery.ts';
import { NEWS_CATEGORIES } from '../../../constants/tabs.ts';
import { INewsArticle } from '../../../types.ts';
import uuid from 'react-native-uuid';

export const useNewsHook = () => {
  const [allData, setAllData] = React.useState<INewsArticle[]>([]);
  const [activeTabIndex, setActiveTabIndex] = React.useState(0);
  const [newArticleTitle, setNewArticleTitle] = React.useState('');
  const [newArticleDescription, setNewArticleDescription] = React.useState('');
  const [newArticleImage, setNewArticleImage] = React.useState(undefined);
  const [newArticleSource, setNewArticleSource] = React.useState('');
  const [newArticleCategories, setNewArticleCategories] = React.useState<
    string[]
  >(['']);

  const { data, isLoading } = useGetNews();

  const newArticle = useMemo<INewsArticle>(() => {
    return {
      uuid: '',
      title: newArticleTitle,
      description: newArticleDescription,
      url: newArticleSource,
      image_url: newArticleImage?.url,
      published_at: '',
      source: newArticleSource,
      categories: newArticleCategories,
    };
  }, [
    newArticleCategories,
    newArticleDescription,
    newArticleImage,
    newArticleSource,
    newArticleTitle,
  ]);

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
    setAllData([...allData, newArticleData]);
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
  };
};
