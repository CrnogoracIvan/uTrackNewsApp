import { StyleSheet } from 'react-native';
import { MD3Theme } from 'react-native-paper';

export const createStyles = (theme: MD3Theme) =>
  StyleSheet.create({
    fab: {
      position: 'absolute',
      margin: 16,
      right: 0,
      bottom: 20,
      backgroundColor: theme.colors.primary,
    },
    newsContainer: {
      paddingBottom: 80,
      paddingTop: 16,
    },
    refreshControl: {
      color: theme.colors.primary,
    },
  });
