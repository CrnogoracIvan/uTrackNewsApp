import { StyleSheet, TextStyle } from 'react-native';

export const createStyles = () => {
  const tab = {
    padding: 5,
    minWidth: 40,
  };

  const tabText = {
    textTransform: 'uppercase',
  } as TextStyle;

  return StyleSheet.create({
    tabsContainer: {
      display: 'flex',
      flexDirection: 'row',
      gap: 6,
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
  });
};
