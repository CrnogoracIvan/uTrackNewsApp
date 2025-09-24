import { Pressable, Text, View } from 'react-native';
import { createStyles } from './NewsTab.styles.ts';

interface IProps {
  tabs: string[];
  activeTabIndex: number;
  onTabPress: (index: number) => void;
}
export const NewsTabs = ({ tabs, activeTabIndex, onTabPress }: IProps) => {
  const styles = createStyles();
  const renderTab = (tab: string, index: number) => {
    return (
      <Pressable
        key={`tab-${index}`}
        style={activeTabIndex === index ? styles.activeTab : styles.tab}
        onPress={() => {
          onTabPress(index);
        }}
      >
        <Text>{tab}</Text>
      </Pressable>
    );
  };
  return (
    <View style={styles.tabsContainer}>
      {tabs.map((tab, index) => renderTab(tab, index))}
    </View>
  );
};
