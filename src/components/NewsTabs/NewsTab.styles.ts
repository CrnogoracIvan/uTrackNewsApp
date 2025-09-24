import { StyleSheet } from 'react-native';

export const createStyles = () => {
  const tab = {
    padding: 5,
  };

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
  });
};
