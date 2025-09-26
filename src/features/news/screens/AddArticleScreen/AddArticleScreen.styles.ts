import { StyleSheet } from 'react-native';
import { MD3Theme } from 'react-native-paper';

export const createStyles = (theme: MD3Theme) => {
  return StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: 'column',
      justifyContent: 'space-between',
      paddingBottom: 40,
    },
    form: {
      gap: 8,
    },

    imageContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    image: { width: '100%', height: 200 },

    chooseImage: {
      alignItems: 'center',
      width: '100%',
      height: 200,
      borderWidth: 1,
      borderColor: theme.colors.outline,
      borderRadius: theme.roundness,
      backgroundColor: theme.colors.background,
      marginTop: 8,
      overflow: 'hidden',
    },

    saveButton: {
      marginTop: 16,
    },
    cancelButton: {
      marginTop: 8,
    },
  });
};
