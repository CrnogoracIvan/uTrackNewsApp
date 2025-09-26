import { useNewsContext } from '../../context/NewsContextProvider.tsx';
import { View } from 'react-native';
import { NewsTabs } from '../NewsTabs/NewsTabs.tsx';
import LinearGradient from 'react-native-linear-gradient';
import { NewsSearch } from '../NewsSearch/NewsSearch.tsx';
import { createStyles } from './NewsHeader.styles.ts';
import { useTheme } from 'react-native-paper';

export const NewsHeader = () => {
  const theme = useTheme();
  const styles = createStyles();

  const { isSearchVisible } = useNewsContext();

  const renderActiveHeaderComponent = () => {
    if (isSearchVisible) {
      return <NewsSearch />;
    }
    return <NewsTabs />;
  };

  return (
    <View>
      {renderActiveHeaderComponent()}
      <LinearGradient
        style={styles.gradientStyle}
        colors={[theme.colors.background, 'rgba(255,255,255,0)']}
      />
    </View>
  );
};
