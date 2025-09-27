import { ActivityIndicator, Text, View } from 'react-native';
import { useTheme } from 'react-native-paper';

export const UtLoadingComponent = () => {
  const theme = useTheme();
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        gap: 6,
      }}
    >
      <ActivityIndicator size="large" />
      <Text style={{ color: theme.colors.onSurface }}>Loading...</Text>
    </View>
  );
};
