import React, { useMemo } from 'react';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import WebView from 'react-native-webview';
import { TRootStackParamList } from '../../../../types';

type TProps = NativeStackScreenProps<TRootStackParamList, 'Article'>;

export const SingleArticleScreen = (props: TProps) => {
  const { route } = props;
  const { article } = route.params;

  const customArticleUrl = useMemo(() => {
    if (
      article.url.startsWith('http://') ||
      article.url.startsWith('https://')
    ) {
      return article.url;
    }
    return `https://${article.url}`;
  }, [article.url]);

  if (!customArticleUrl) {
    return null;
  }

  return <WebView source={{ uri: customArticleUrl }} style={{ flex: 1 }} />;
};
