import React from 'react';
import { Image, Text, View } from 'react-native';
import { INewsArticle } from '../../../../types';
import { createStyles } from './SingleArticleCard.styles.ts';
import { getFormattedDate } from '../../../../utils.ts';
import { useNavigation } from '@react-navigation/core';
import navigation from '../../../../constants/routes.ts';
import { Card } from 'react-native-paper';

interface SingleNewsCardProps {
  cardSize: 'small' | 'large';
  newsArticle: INewsArticle;
}

export const SingleArticleCard: React.FC<SingleNewsCardProps> = ({
  newsArticle,
  cardSize,
}) => {
  const styles = createStyles();
  const { title, description, image_url, source, published_at, categories } =
    newsArticle;

  const Navigation = useNavigation();

  const handleCardPress = (article: INewsArticle) =>
    // @ts-ignore
    Navigation.navigate(navigation.ARTICLE, { article: article });

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
        {categories.map((category, index) => (
          <View key={`cat-${index}`} style={styles.categoryBadge}>
            <Text style={styles.categoryText}>{category}</Text>
          </View>
        ))}
      </View>
    );
  };

  const renderLargeCard = () => (
    <>
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
    </>
  );

  const renderSmallCard = () => (
    <View style={styles.smallContentContainer}>
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
      {cardSize === 'large' ? renderLargeCard() : renderSmallCard()}
    </Card>
  );
};
