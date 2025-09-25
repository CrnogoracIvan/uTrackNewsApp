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
      categories: newArticleCategories,
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
    newArticleSource.length === 0 ||
    newArticleImage === null;

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

  const handleAddingArticleSourceUrl = (sourceUrl: string) => {
    if (['http://', 'https://'].includes(sourceUrl)) {
      return sourceUrl;
    }
    return `https://${sourceUrl}`;
  };

  const handleAddArticle = () => {
    const newArticleData = {
      ...newArticle,
      uuid: uuid.v4(),
      published_at: new Date().toISOString(),
      source: handleAddingArticleSourceUrl(newArticleSource),
    };
    setAllData([newArticleData, ...allData]);
    handleClearNewArticle();
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
  };
};
