import { StyleSheet } from 'react-native';
import { MD3Theme } from 'react-native-paper';

export const createStyles = (theme: MD3Theme) => {
  return StyleSheet.create({
    container: {
      flex: 1,
      height: '100%',
      backgroundColor: theme.colors.background,
    },
    loaderContainer: {
      height: '100%',
    },
  });
};
