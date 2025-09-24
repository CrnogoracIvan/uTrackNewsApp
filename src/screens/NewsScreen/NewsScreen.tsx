import React from 'react';
import { ActivityIndicator, Text, View } from 'react-native';
import { useGetNews } from '../../queries/useNewsQuery.ts';
import { RegularLayout } from '../../components/RegularLayout/RegularLayout.tsx';
import { NewsTabs } from '../../components/NewsTabs/NewsTabs.tsx';

export const NewsScreen = () => {
  const [activeTabIndex, setActiveTabIndex] = React.useState(0);
  const { data, isLoading } = useGetNews();

  console.log(data);

  const tabs = ['Tech', 'Sports', 'Business'];

  const renderSpinner = () => <ActivityIndicator size="large" />;
  const renderNews = () => {
    return (
      <View>
        <NewsTabs
          tabs={tabs}
          activeTabIndex={activeTabIndex}
          onTabPress={setActiveTabIndex}
        />
        {data?.data.map(item => (
          <Text key={item.uuid}>{item.title}</Text>
        ))}
      </View>
    );
  };
  return (
    <RegularLayout>{isLoading ? renderSpinner() : renderNews()}</RegularLayout>
  );
};
