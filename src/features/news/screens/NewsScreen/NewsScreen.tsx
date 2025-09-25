import React from 'react';
import { FlatList, View } from 'react-native';
import { RegularLayout } from '../../../../components/RegularLayout/RegularLayout.tsx';
import { NewsTabs } from '../../components/NewsTabs/NewsTabs.tsx';
import { NEWS_CATEGORIES } from '../../../../constants.ts';
import { LoadingComponent } from '../../../../components/LoadingComponent/LoadingComponent.tsx';
import { SingleArticleCard } from '../../components/SingleArticleCard/SingleArticleCard.tsx';
import { NoArticlesFound } from '../../components/NoArticlesFound/NoArticlesFound.tsx';
import { FAB } from 'react-native-paper';
import { createStyles } from './NewsScreen.styles.ts';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { TRootStackParamList } from '../../../../types.ts';
import { useNewsContext } from '../../context/NewsContextProvider.tsx';

type TNavigationProps = NativeStackNavigationProp<
  TRootStackParamList,
  'NewArticle'
>;

export const NewsScreen = () => {
  const styles = createStyles();
  const Navigation = useNavigation<TNavigationProps>();

  const {
    activeTabIndex,
    setActiveTabIndex,
    areNewsLoading,
    filteredDataByCategory,
  } = useNewsContext();

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
          tabs={NEWS_CATEGORIES}
          activeTabIndex={activeTabIndex}
          onTabPress={setActiveTabIndex}
        />
        {filteredDataByCategory?.length === 0 ? (
          <NoArticlesFound />
        ) : (
          <FlatList
            showsVerticalScrollIndicator={false}
            data={filteredDataByCategory}
            renderItem={({ item, index }) => (
              <SingleArticleCard
                cardSize={index === 0 ? 'large' : 'small'}
                newsArticle={item}
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
      {areNewsLoading ? <LoadingComponent /> : renderNews()}
    </RegularLayout>
  );
};
