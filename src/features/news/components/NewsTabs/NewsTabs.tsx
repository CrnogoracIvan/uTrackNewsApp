import { Pressable, Text, View } from 'react-native';
import { createStyles } from './NewsTab.styles.ts';
import LinearGradient from 'react-native-linear-gradient';
import { ITab } from '../../../../types.ts';

interface IProps {
  tabs: ITab[];
  activeTabIndex: number;
  onTabPress: (index: number) => void;
}
export const NewsTabs = ({ tabs, activeTabIndex, onTabPress }: IProps) => {
  const styles = createStyles();
  const renderTab = (tab: ITab, tabIndex: number) => {
    return (
      <Pressable
        key={`tab-${tabIndex}`}
        style={activeTabIndex === tabIndex ? styles.activeTab : styles.tab}
        onPress={() => {
          onTabPress(tabIndex);
        }}
      >
        <Text
          style={
            activeTabIndex === tabIndex ? styles.activeTabText : styles.tabText
          }
        >
          {tab.label}
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
