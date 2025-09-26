import { Text, View } from 'react-native';
import { Icon } from 'react-native-paper';
import { createStyles } from './NoArticlesFound.styles.ts';

export const NoArticlesFound = () => {
  const styles = createStyles();
  return (
    <View style={styles.container}>
      <Icon size={64} source={'newspaper-remove'} />
      <Text>No articles found</Text>
    </View>
  );
};
