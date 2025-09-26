import { StyleSheet } from 'react-native';
import { MD3Theme } from 'react-native-paper';

export const createStyles = (theme: MD3Theme) => {
  return StyleSheet.create({
    modalContainer: {
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: theme.colors.surfaceVariant,
      padding: 20,
      height: 200,
      width: 300,
      margin: 20,
      alignSelf: 'center',
      borderRadius: 10,
      gap: 16,
    },
    titleText: {
      fontWeight: 'bold',
      fontSize: 20,
      color: theme.colors.onSurface,
    },
    contentText: {
      textAlign: 'center',
      lineHeight: 22,
      color: theme.colors.onSurface,
    },
    contentTextBold: {
      fontWeight: 'bold',
      color: theme.colors.onSurface,
    },
    buttonContainer: {
      flexDirection: 'row',
      gap: 8,
    },
  });
};
