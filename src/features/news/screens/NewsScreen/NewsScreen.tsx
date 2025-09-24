import React, { useMemo } from 'react';
import { FlatList, View } from 'react-native';
import { useGetNews } from '../../queries/useNewsQuery.ts';
import { RegularLayout } from '../../../../components/RegularLayout/RegularLayout.tsx';
import { NewsTabs } from '../../components/NewsTabs/NewsTabs.tsx';
import { NEWS_TABS } from '../../../../constants/tabs.ts';
import { LoadingComponent } from '../../../../components/LoadingComponent/LoadingComponent.tsx';
import { SingleArticleCard } from '../../components/SingleArticleCard/SingleArticleCard.tsx';
import { NoArticlesFound } from '../../components/NoArticlesFound/NoArticlesFound.tsx';

export const NewsScreen = () => {
  const [activeTabIndex, setActiveTabIndex] = React.useState(0);
  const { data, isLoading } = useGetNews();

  const filterDataByCategory = useMemo(() => {
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

  const renderNews = () => {
    return (
      <View style={{ flex: 1 }}>
        <NewsTabs
          tabs={NEWS_TABS}
          activeTabIndex={activeTabIndex}
          onTabPress={setActiveTabIndex}
        />
        {filterDataByCategory?.length === 0 ? (
          <NoArticlesFound />
        ) : (
          <FlatList
            showsVerticalScrollIndicator={false}
            data={filterDataByCategory}
            renderItem={({ item, index }) => (
              <SingleArticleCard
                cardSize={index === 0 ? 'large' : 'small'}
                newsArticle={item}
                key={`news-${item.uuid}`}
              />
            )}
            contentContainerStyle={{ paddingBottom: 80, paddingTop: 16 }}
            keyExtractor={item => `news-${item.uuid}`}
          />
        )}
      </View>
    );
  };
  return (
    <RegularLayout>
      {isLoading ? <LoadingComponent /> : renderNews()}
    </RegularLayout>
  );
};
