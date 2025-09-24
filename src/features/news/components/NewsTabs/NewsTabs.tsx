import { Pressable, Text, View } from 'react-native';
import { createStyles } from './NewsTab.styles.ts';
import LinearGradient from 'react-native-linear-gradient';

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
        <Text
          style={
            activeTabIndex === index ? styles.activeTabText : styles.tabText
          }
        >
          {tab}
        </Text>
      </Pressable>
    );
  };
  return (
    <>
      <View style={styles.tabsContainer}>
        {tabs.map((tab, index) => renderTab(tab, index))}
      </View>
      <LinearGradient
        style={styles.gradientStyle}
        colors={['white', 'rgba(255,255,255,0)']}
      />
    </>
  );
};
