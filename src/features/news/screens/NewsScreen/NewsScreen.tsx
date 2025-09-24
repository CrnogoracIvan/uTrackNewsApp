import React, { useMemo } from 'react';
import { ActivityIndicator, Text, View } from 'react-native';
import { useGetNews } from '../../queries/useNewsQuery.ts';
import { RegularLayout } from '../../../../components/RegularLayout/RegularLayout.tsx';
import { NewsTabs } from '../../components/NewsTabs/NewsTabs.tsx';
import { NEWS_TABS } from '../../../../constants/tabs.ts';

export const NewsScreen = () => {
  const [activeTabIndex, setActiveTabIndex] = React.useState(0);
  const { data, isLoading } = useGetNews();

  const filterDataByCategory = useMemo(() => {
    if (!data) return [];
    if (activeTabIndex === 0) {
      return data.data;
    }
    return data.data.filter(
      item => item.categories[0] === NEWS_TABS[activeTabIndex].toLowerCase(),
    );
  }, [activeTabIndex, data]);

  const renderSpinner = () => <ActivityIndicator size="large" />;
  const renderEmptyScreen = () => <Text>No news found</Text>;

  const renderNews = () => {
    return (
      <View>
        <NewsTabs
          tabs={NEWS_TABS}
          activeTabIndex={activeTabIndex}
          onTabPress={setActiveTabIndex}
        />
        {filterDataByCategory?.length === 0 && renderEmptyScreen()}
        {filterDataByCategory?.map(item => (
          <Text key={item.uuid}>{item.title}</Text>
        ))}
      </View>
    );
  };
  return (
    <RegularLayout>{isLoading ? renderSpinner() : renderNews()}</RegularLayout>
  );
};
