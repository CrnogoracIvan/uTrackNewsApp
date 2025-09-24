import React from 'react';
import { Text, View } from 'react-native';
import { useGetNews } from '../../queries/useNewsQuery.ts';

export const NewsScreen = () => {
  const { data, isLoading } = useGetNews();

  console.log(data);
  return (
    <View>
      <Text>nesto</Text>
    </View>
  );
};
