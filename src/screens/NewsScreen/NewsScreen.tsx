import React from 'react';
import { ActivityIndicator, Text, View } from 'react-native';
import { useGetNews } from '../../queries/useNewsQuery.ts';
import { RegularLayout } from '../../components/RegularLayout/RegularLayout.tsx';

export const NewsScreen = () => {
  const { data, isLoading } = useGetNews();

  console.log(data);

  const renderSpinner = () => <ActivityIndicator size="large" />;

  return <RegularLayout>{renderSpinner()}</RegularLayout>;
};
