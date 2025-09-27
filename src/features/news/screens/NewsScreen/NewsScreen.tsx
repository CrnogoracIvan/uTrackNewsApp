import React, { useEffect } from 'react';
import { FlatList, View } from 'react-native';
import { UtRegularLayout } from '../../../../components/UtRegularLayout/UtRegularLayout.tsx';
import { UtLoadingComponent } from '../../../../components/UtLoadingComponent/UtLoadingComponent.tsx';
import { SingleArticleCard } from '../../components/SingleArticleCard/SingleArticleCard.tsx';
import { UtItemNotFound } from '../../../../components/UtItemNotFound/UtItemNotFound.tsx';
import { FAB, useTheme } from 'react-native-paper';
import { createStyles } from './NewsScreen.styles.ts';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { TRootStackParamList } from '../../../../types.ts';
import { useNewsContext } from '../../context/NewsContextProvider.tsx';
import { useAuthContext } from '../../../auth/context/AuthContextProvider.tsx';
import { NewsHeader } from '../../components/NewsHeader/NewsHeader.tsx';

type TNavigationProps = NativeStackNavigationProp<
  TRootStackParamList,
  'NewArticle'
>;

export const NewsScreen = () => {
  const theme = useTheme();
  const styles = createStyles(theme);
  const Navigation = useNavigation<TNavigationProps>();

  const {
    areNewsLoading,
    filteredDataByCategory,
    filteredBySearch,
    isSearchVisible,
  } = useNewsContext();

  const { handleSetActiveUser } = useAuthContext();

  useEffect(() => {
    handleSetActiveUser();
  }, []);

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
        <NewsHeader />
        {filteredDataByCategory?.length === 0 ? (
          <UtItemNotFound
            text={'No articles found.'}
            iconName={'newspaper-remove'}
          />
        ) : (
          <FlatList
            showsVerticalScrollIndicator={false}
            data={isSearchVisible ? filteredBySearch : filteredDataByCategory}
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
    <UtRegularLayout>
      {areNewsLoading ? <UtLoadingComponent /> : renderNews()}
    </UtRegularLayout>
  );
};
