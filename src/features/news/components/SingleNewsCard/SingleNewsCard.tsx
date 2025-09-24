import React from 'react';
import { Image, Text, View } from 'react-native';
import { INewsArticle } from '../../../../types';
import { createStyles } from './SingleNewsCard.styles.ts';

interface SingleNewsCardProps {
  newsArticle: INewsArticle;
}

export const SingleNewsCard: React.FC<SingleNewsCardProps> = ({
  newsArticle,
}) => {
  const styles = createStyles();
  const {
    title,
    description,
    snippet,
    image_url,
    source,
    published_at,
    categories,
  } = newsArticle;

  // Format the date
  const formattedDate = new Date(published_at).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });

  return (
    <View style={styles.container}>
      {image_url ? (
        <Image source={{ uri: image_url }} style={styles.image} />
      ) : (
        <View style={styles.imagePlaceholder}>
          <Text style={styles.placeholderText}>No Image</Text>
        </View>
      )}

      <View style={styles.contentContainer}>
        <Text style={styles.title}>{title}</Text>

        {description && <Text style={styles.description}>{description}</Text>}

        {snippet && !description && (
          <Text style={styles.description}>{snippet}</Text>
        )}

        <View style={styles.metaContainer}>
          <Text style={styles.source}>{source}</Text>
          <Text style={styles.date}>{formattedDate}</Text>
        </View>

        {categories && categories.length > 0 && (
          <View style={styles.categoriesContainer}>
            {categories.map((category, index) => (
              <View key={`cat-${index}`} style={styles.categoryBadge}>
                <Text style={styles.categoryText}>{category}</Text>
              </View>
            ))}
          </View>
        )}
      </View>
    </View>
  );
};
