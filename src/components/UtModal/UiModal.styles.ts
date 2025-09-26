import { StyleSheet } from 'react-native';

export const createStyles = () => {
  return StyleSheet.create({
    modalContainer: {
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'white',
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
    },
    contentText: {
      textAlign: 'center',
      lineHeight: 22,
    },
    contentTextBold: {
      fontWeight: 'bold',
    },
    buttonContainer: {
      flexDirection: 'row',
      gap: 8,
    },
  });
};
