import { Text, View } from 'react-native';
import { Icon, useTheme } from 'react-native-paper';
import { createStyles } from './NoArticlesFound.styles.ts';

export const NoArticlesFound = () => {
  const theme = useTheme();
  const styles = createStyles(theme);
  return (
    <View style={styles.container}>
      <Icon
        size={64}
        source={'newspaper-remove'}
        color={theme.colors.onSurface}
      />
      <Text style={styles.text}>No articles found</Text>
    </View>
  );
};
