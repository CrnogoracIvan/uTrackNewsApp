import { Platform, StyleSheet, TextStyle } from 'react-native';

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
  });
};
