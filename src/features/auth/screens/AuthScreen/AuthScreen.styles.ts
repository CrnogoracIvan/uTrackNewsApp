import { StyleSheet } from 'react-native';
import { MD3Theme } from 'react-native-paper';

export const createStyles = (theme: MD3Theme) =>
  StyleSheet.create({
    mainContainer: {
      display: 'flex',
      flex: 1,
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      gap: 60,
    },
    inputContainer: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      gap: 6,
      width: 320,
    },
    input: {
      marginBottom: 8,
      // You can use theme properties here
      backgroundColor: theme.colors.background,
    },
    errorMessageText: {
      color: theme.colors.error,
    },

    buttonContainer: {
      width: 240,
    },

    button: {
      marginTop: 10,
      backgroundColor: theme.colors.primary,
      padding: 10,
      borderRadius: theme.roundness,
    },

    logo: {
      width: 240,
      height: 80,
    },
  });
