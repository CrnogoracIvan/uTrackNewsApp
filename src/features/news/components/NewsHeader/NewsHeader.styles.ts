import { Platform, StyleSheet } from 'react-native';

export const createStyles = () => {
  return StyleSheet.create({
    gradientStyle: {
      position: 'absolute',
      top: Platform.OS === 'ios' ? 56 : 60,
      left: 0,
      width: '100%',
      zIndex: 1,
      height: 40,
    },
  });
};
