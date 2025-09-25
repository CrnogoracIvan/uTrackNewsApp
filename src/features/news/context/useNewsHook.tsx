import React, { useMemo } from 'react';
import { useGetNews } from '../queries/useNewsQuery.ts';
import { NEWS_CATEGORIES } from '../../../constants/tabs.ts';

export const useNewsHook = () => {
  const [activeTabIndex, setActiveTabIndex] = React.useState(0);
  const [newArticleTitle, setNewArticleTitle] = React.useState('');
  const [newArticleDescription, setNewArticleDescription] = React.useState('');
  const [newArticleImage, setNewArticleImage] = React.useState(null);
  const [newArticleSource, setNewArticleSource] = React.useState('');
  const [newArticleCategories, setNewArticleCategories] = React.useState('');

  const { data, isLoading } = useGetNews();

  const filteredDataByCategory = useMemo(() => {
    if (!data) return [];
    if (activeTabIndex === 0) {
      return data.data;
    }
    return data.data.filter(item =>
      item.categories.some(
        category => category === NEWS_CATEGORIES[activeTabIndex].value,
      ),
    );
  }, [activeTabIndex, data]);

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
  };
};
