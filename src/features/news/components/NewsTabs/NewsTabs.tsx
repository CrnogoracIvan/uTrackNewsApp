import { Text, TouchableOpacity, View } from 'react-native';
import { createStyles } from './NewsTab.styles.ts';
import { INewsCategory } from '../../../../types.ts';
import { useNewsContext } from '../../context/NewsContextProvider.tsx';
import { NEWS_CATEGORIES } from '../../../../constants.ts';

export const NewsTabs = () => {
  const styles = createStyles();
  const { activeTabIndex, setActiveTabIndex } = useNewsContext();

  const renderTab = (tab: INewsCategory, tabIndex: number) => {
    return (
      <TouchableOpacity
        key={`tab-${tabIndex}`}
        style={activeTabIndex === tabIndex ? styles.activeTab : styles.tab}
        onPress={() => {
          setActiveTabIndex(tabIndex);
        }}
      >
        <Text
          style={
            activeTabIndex === tabIndex ? styles.activeTabText : styles.tabText
          }
        >
          {tab.label}
        </Text>
      </TouchableOpacity>
    );
  };
  return (
    <View style={styles.tabsContainer}>
      {NEWS_CATEGORIES.map((tab, index) => renderTab(tab, index))}
    </View>
  );
};
