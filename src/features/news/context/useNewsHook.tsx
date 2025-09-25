import { useGetNews } from '../queries/useNewsQuery.ts';
import React, { useMemo } from 'react';
import { NEWS_TABS } from '../../../constants/tabs.ts';

export const useNewsHook = () => {
  const [activeTabIndex, setActiveTabIndex] = React.useState(0);

  const { data, isLoading } = useGetNews();

  const filteredDataByCategory = useMemo(() => {
    if (!data) return [];
    if (activeTabIndex === 0) {
      return data.data;
    }
    return data.data.filter(item =>
      item.categories.some(
        category => category === NEWS_TABS[activeTabIndex].toLowerCase(),
      ),
    );
  }, [activeTabIndex, data]);

  return {
    filteredDataByCategory,
    isLoading,
    activeTabIndex,
    setActiveTabIndex,
  };
};
