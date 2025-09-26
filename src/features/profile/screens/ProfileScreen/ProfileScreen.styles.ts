import { StyleSheet } from 'react-native';
import { MD3Theme } from 'react-native-paper';

export const createStyles = (theme: MD3Theme) => {
  return StyleSheet.create({
    container: {
      gap: 60,
    },
    buttonContainer: {
      gap: 12,
      justifyContent: 'center',
      alignItems: 'center',
    },
    button: {
      width: 300,
    },
    row: {
      flexDirection: 'row',
      marginVertical: 8,
      alignItems: 'flex-end',
    },
    labelText: {
      minWidth: 60,
      fontSize: 16,
      fontStyle: 'italic',
    },
    infoText: {
      minWidth: 80,
      fontSize: 20,
      color: theme.colors.primary,
      fontWeight: 'bold',
    },
  });
};
