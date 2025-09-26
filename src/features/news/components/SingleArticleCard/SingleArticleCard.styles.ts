import { StyleSheet, TextStyle } from 'react-native';

export const createStyles = () => {
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
      backgroundColor: '#fff',
      borderRadius: 8,
      marginVertical: 8,
      marginHorizontal: 8,
      shadowColor: '#000',
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
      backgroundColor: '#e0e0e0',
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
      backgroundColor: '#e0e0e0',
      justifyContent: 'center',
      alignItems: 'center',
    },

    placeholderText: {
      color: '#757575',
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
      color: '#333',
    },
    description: {
      fontSize: 14,
      color: '#666',
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
      color: '#888',
      fontWeight: '500',
    },
    date: {
      fontSize: 12,
      color: '#888',
    },
    categoriesContainer: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      marginTop: 4,
    },
    categoryBadge: {
      ...categoryBadge,
      backgroundColor: '#f0f0f0',
    },
    myCategoryBadge: {
      ...categoryBadge,
      backgroundColor: 'red',
      color: 'white',
    },
    categoryText: {
      ...categoryText,
      color: '#666',
    } as TextStyle,

    myCategoryText: {
      ...categoryText,
      color: '#fff',
    } as TextStyle,
  });
};
