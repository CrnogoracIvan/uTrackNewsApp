import React from 'react';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import WebView from 'react-native-webview';
import { TRootStackParamList } from '../../../../types';

type TProps = NativeStackScreenProps<TRootStackParamList, 'Article'>;

export const SingleArticleScreen = (props: TProps) => {
  const { route } = props;
  const { article } = route.params;

  return <WebView source={{ uri: article.url }} style={{ flex: 1 }} />;
};
