import { Platform, StyleSheet, TextStyle } from 'react-native';

export const createStyles = () => {
  const tab = {
    padding: 5,
    minWidth: 40,
  };

  const tabText = {
    fontSize: 16,
    textTransform: 'uppercase',
  } as TextStyle;

  return StyleSheet.create({
    tabsContainer: {
      display: 'flex',
      flexDirection: 'row',
      gap: 6,
      zIndex: 1,
      marginBottom: 2,
      paddingVertical: 12,
    },

    tab,
    activeTab: {
      ...tab,
      borderBottomWidth: 2,
      borderBottomColor: 'red',
    },
    tabText,
    activeTabText: {
      ...tabText,
      fontWeight: 'bold',
    } as TextStyle,

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
