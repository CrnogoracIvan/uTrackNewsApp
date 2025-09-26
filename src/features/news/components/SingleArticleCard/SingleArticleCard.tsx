import React from 'react';
import { Image, Text, View } from 'react-native';
import { INewsArticle, TRootStackParamList } from '../../../../types';
import { createStyles } from './SingleArticleCard.styles.ts';
import { getFormattedDate } from '../../../../utils.ts';
import { useNavigation } from '@react-navigation/core';
import { Card } from 'react-native-paper';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { DeleteArticle } from '../DeleteArticle/DeleteArticle.tsx';
import { useAuthContext } from '../../../auth/context/AuthContextProvider.tsx';

interface SingleNewsCardProps {
  cardSize: 'small' | 'large';
  newsArticle: INewsArticle;
}
type TNavigationProps = NativeStackNavigationProp<
  TRootStackParamList,
  'Article'
>;

interface CardProps {
  article: INewsArticle;
}

export const SingleArticleCard: React.FC<SingleNewsCardProps> = ({
  newsArticle,
  cardSize,
}) => {
  const styles = createStyles();
  const Navigation = useNavigation<TNavigationProps>();

  const { activeUser } = useAuthContext();

  const { title, description, image_url, source, published_at, categories } =
    newsArticle;

  const isArticleMy = (article: INewsArticle) => {
    console.log(article);
    console.log(activeUser);

    return article.userId === activeUser?.id;
  };

  const handleCardPress = (article: INewsArticle) =>
    Navigation.navigate('Article', { article: article });

  const renderDescription = () => {
    if (!description) {
      return null;
    }
    if (cardSize === 'large')
      return <Text style={styles.description}>{description}</Text>;

    return (
      <Text numberOfLines={2} ellipsizeMode="tail" style={styles.description}>
        {description}
      </Text>
    );
  };

  const renderMetaData = () => {
    return (
      <View
        style={
          cardSize === 'large'
            ? styles.metaContainer
            : styles.smallMetaContainer
        }
      >
        <Text style={styles.source}>{source}</Text>
        <Text style={styles.date}>
          {getFormattedDate(published_at as unknown as Date)}
        </Text>
      </View>
    );
  };

  const renderCategories = () => {
    if (!categories || categories.length === 0) {
      return null;
    }
    return (
      <View style={styles.categoriesContainer}>
        {categories.map((category, index) => {
          if (category === 'my') {
            if (newsArticle.userId !== activeUser?.id) {
              return null;
            }
          }
          return (
            <View
              key={`cat-${index}`}
              style={
                category === 'my'
                  ? styles.myCategoryBadge
                  : styles.categoryBadge
              }
            >
              <Text
                style={
                  category === 'my'
                    ? styles.myCategoryText
                    : styles.categoryText
                }
              >
                {category}
              </Text>
            </View>
          );
        })}
      </View>
    );
  };

  const LargeCard = ({ article }: CardProps) => {
    return (
      <View>
        {isArticleMy(article) && <DeleteArticle article={article} />}
        {image_url ? (
          <Image source={{ uri: image_url }} style={styles.image} />
        ) : (
          <View style={styles.imagePlaceholder}>
            <Text style={styles.placeholderText}>No Image</Text>
          </View>
        )}

        <View style={styles.contentContainer}>
          <Text style={styles.title}>{title}</Text>
          {renderDescription()}
          {renderMetaData()}
          {renderCategories()}
        </View>
      </View>
    );
  };

  const SmallCard = ({ article }: CardProps) => (
    <View style={styles.smallContentContainer}>
      {isArticleMy(article) && <DeleteArticle article={article} />}
      <View style={styles.smallTextContentContainer}>
        <Text style={styles.title}>{title}</Text>
        {renderDescription()}
        {renderMetaData()}
        {renderCategories()}
      </View>
      {image_url ? (
        <Image source={{ uri: image_url }} style={styles.smallImage} />
      ) : (
        <View style={styles.smallImagePlaceholder}>
          <Text style={styles.placeholderText}>No Image</Text>
        </View>
      )}
    </View>
  );

  return (
    <Card
      style={styles.container}
      onPress={() => {
        handleCardPress(newsArticle);
      }}
    >
      {cardSize === 'large' ? (
        <LargeCard article={newsArticle} />
      ) : (
        <SmallCard article={newsArticle} />
      )}
    </Card>
  );
};
