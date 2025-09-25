import React from 'react';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import WebView from 'react-native-webview';
import { TRootStackParamList } from '../../../../types';

type TProps = NativeStackScreenProps<TRootStackParamList, 'Article'>;

export const SingleArticleScreen = (props: TProps) => {
  const { route } = props;
  const { article } = route.params;

  const getArticleUrl = () => {
    if (['http://', 'https://'].includes(article.url)) {
      return article.url;
    }
    return `https://${article.url}`;
  };

  return <WebView source={{ uri: getArticleUrl() }} style={{ flex: 1 }} />;
};
