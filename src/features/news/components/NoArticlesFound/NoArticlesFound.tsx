import { Text, View } from 'react-native';
import { Icon } from 'react-native-paper';

export const NoArticlesFound = () => (
  <View
    style={{
      flex: 1,
      height: '100%',
      justifyContent: 'center',
      alignItems: 'center',
      gap: 12,
    }}
  >
    <Icon size={64} source={'newspaper-remove'} />
    <Text>No articles found</Text>
  </View>
);
