import { StyleSheet, TextStyle } from 'react-native';
import { MD3Theme } from 'react-native-paper';

export const createStyles = (theme: MD3Theme) => {
  const categoryBadge = {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    marginRight: 6,
    marginBottom: 6,
  };

  const categoryText = {
    fontSize: 10,
    textTransform: 'capitalize',
  };

  return StyleSheet.create({
    container: {
      backgroundColor: theme.colors.surface,
      borderRadius: 8,
      marginVertical: 8,
      marginHorizontal: 8,
      shadowColor: theme.colors.outline,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 2,
      overflow: 'hidden',
    },
    image: {
      width: '100%',
      height: 200,
      resizeMode: 'cover',
    },
    imagePlaceholder: {
      width: '100%',
      height: 200,
      backgroundColor: theme.colors.surfaceVariant,
      justifyContent: 'center',
      alignItems: 'center',
      gap: 6,
    },
    smallImage: {
      width: 200,
      height: '100%',
      resizeMode: 'cover',
    },
    smallImagePlaceholder: {
      width: '45%',
      height: 200,
      backgroundColor: theme.colors.surfaceVariant,
      justifyContent: 'center',
      alignItems: 'center',
    },

    placeholderText: {
      color: theme.colors.onSurfaceVariant,
      fontWeight: '500',
    },
    contentContainer: {
      padding: 16,
    },
    smallContentContainer: {
      display: 'flex',
      flexDirection: 'row',
    },
    smallTextContentContainer: {
      padding: 16,
      width: '55%',
    },
    title: {
      fontSize: 18,
      fontWeight: 'bold',
      marginBottom: 8,
      color: theme.colors.onSurface,
    },
    description: {
      fontSize: 14,
      color: theme.colors.onSurfaceVariant,
      marginBottom: 12,
      lineHeight: 20,
    },
    metaContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: 8,
    },
    smallMetaContainer: {
      flexDirection: 'column',
      gap: 6,
      marginBottom: 8,
    },
    source: {
      fontSize: 12,
      color: theme.colors.outline,
      fontWeight: '500',
    },
    date: {
      fontSize: 12,
      color: theme.colors.outline,
    },
    categoriesContainer: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      marginTop: 4,
    },
    categoryBadge: {
      ...categoryBadge,
      backgroundColor: theme.colors.surfaceVariant,
    },
    myCategoryBadge: {
      ...categoryBadge,
      backgroundColor: theme.colors.primary,
      color: theme.colors.onPrimary,
    },
    categoryText: {
      ...categoryText,
      color: theme.colors.onSurfaceVariant,
    } as TextStyle,

    myCategoryText: {
      ...categoryText,
      color: theme.colors.onPrimary,
    } as TextStyle,

    editTrigger: {
      position: 'absolute',
      top: 8,
      right: 48,
      zIndex: 10,
      backgroundColor: theme.colors.primary,
      borderRadius: 4,
      padding: 2,
    },
  });
};
