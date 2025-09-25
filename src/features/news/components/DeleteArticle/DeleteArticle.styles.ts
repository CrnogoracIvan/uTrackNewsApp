import { StyleSheet } from 'react-native';

export const createStyles = () => {
  return StyleSheet.create({
    trigger: {
      position: 'absolute',
      top: 8,
      right: 8,
      zIndex: 10,
      backgroundColor: 'rgba(255, 0, 0, 0.7)',
      borderRadius: 4,
      padding: 2,
    },
    modalContainer: {
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'white',
      padding: 20,
      height: 200, // adjust as needed
      width: 300, // adjust as needed
      margin: 20,
      alignSelf: 'center', // Centers the modal itself
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
