import { StyleSheet } from 'react-native';
import { MD3Theme } from 'react-native-paper';

export const createStyles = (theme: MD3Theme) =>
  StyleSheet.create({
    screenContainer: {
      flex: 1,
      // justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: theme.colors.background,
      gap: 60,
      marginTop: 120,
    },

    inputContainer: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      width: 320,
    },
    input: {
      marginTop: 18,
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

    loginButtonText: {
      fontWeight: 'bold',
      fontSize: 16,
    },

    logo: {
      width: 240,
      height: 80,
    },
  });
