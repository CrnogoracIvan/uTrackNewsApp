import { StyleSheet, TextStyle } from 'react-native';
import { MD3Theme } from 'react-native-paper';

export const createStyles = (theme: MD3Theme) => {
  const tab = {
    padding: 5,
    minWidth: 40,
  };

  const tabText = {
    fontSize: 18,
    textTransform: 'uppercase',
    color: theme.colors.onSurface,
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
  });
};
