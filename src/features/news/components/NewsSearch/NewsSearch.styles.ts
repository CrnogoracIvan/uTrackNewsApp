import { StyleSheet } from 'react-native';

export const createStyles = () => {
  return StyleSheet.create({
    container: {
      alignItems: 'center',
      justifyContent: 'space-between',
      width: '100%',
      height: 60,
      flexDirection: 'row',
      gap: 6,
      marginVertical: 2,
      zIndex: 2,
    },

    input: {
      width: '90%',
      fontSize: 16,
    },
  });
};
