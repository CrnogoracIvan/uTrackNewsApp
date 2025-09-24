import { StyleSheet } from 'react-native';

export const createStyles = () => {
  return StyleSheet.create({
    container: {
      backgroundColor: '#fff',
      borderRadius: 8,
      marginVertical: 8,
      marginHorizontal: 16,
      overflow: 'hidden',
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 2,
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
    },
    placeholderText: {
      color: '#757575',
      fontWeight: '500',
    },
    contentContainer: {
      padding: 16,
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
      backgroundColor: '#f0f0f0',
      paddingHorizontal: 8,
      paddingVertical: 4,
      borderRadius: 4,
      marginRight: 6,
      marginBottom: 6,
    },
    categoryText: {
      fontSize: 10,
      color: '#666',
      textTransform: 'capitalize',
    },
  });
};
