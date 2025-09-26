import { StyleSheet } from 'react-native';
import { MD3Theme } from 'react-native-paper';

export const createStyles = (theme: MD3Theme) => {
  return StyleSheet.create({
    input: {
      marginBottom: 8,
    },
    list: {
      backgroundColor: theme.colors.background,
    },
  });
};
