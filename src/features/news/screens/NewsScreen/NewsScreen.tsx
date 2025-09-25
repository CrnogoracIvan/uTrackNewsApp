import React, { useMemo } from 'react';
import { FlatList, View } from 'react-native';
import { useGetNews } from '../../queries/useNewsQuery.ts';
import { RegularLayout } from '../../../../components/RegularLayout/RegularLayout.tsx';
import { NewsTabs } from '../../components/NewsTabs/NewsTabs.tsx';
import { NEWS_TABS } from '../../../../constants/tabs.ts';
import { LoadingComponent } from '../../../../components/LoadingComponent/LoadingComponent.tsx';
import { SingleArticleCard } from '../../components/SingleArticleCard/SingleArticleCard.tsx';
import { NoArticlesFound } from '../../components/NoArticlesFound/NoArticlesFound.tsx';
import { FAB } from 'react-native-paper';
import { createStyles } from './NewsScreen.styles.ts';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { TRootStackParamList } from '../../../../types.ts';

type TNavigationProps = NativeStackNavigationProp<
  TRootStackParamList,
  'NewArticle'
>;

export const NewsScreen = () => {
  const Navigation = useNavigation<TNavigationProps>();
  const [activeTabIndex, setActiveTabIndex] = React.useState(0);
  const { data, isLoading } = useGetNews();
  const styles = createStyles();

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

  const renderFab = () => (
    <FAB
      style={styles.fab}
      icon="plus"
      color="white"
      onPress={() => {
        Navigation.navigate('NewArticle');
      }}
    />
  );

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
        {renderFab()}
      </View>
    );
  };
  return (
    <RegularLayout>
      {isLoading ? <LoadingComponent /> : renderNews()}
    </RegularLayout>
  );
};
