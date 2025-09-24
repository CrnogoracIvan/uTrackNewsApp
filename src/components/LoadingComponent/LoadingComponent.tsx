import { ActivityIndicator, Text, View } from 'react-native';

export const LoadingComponent = () => {
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
      <Text>Loading...</Text>
    </View>
  );
};
