import WebView from 'react-native-webview';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { TRootStackParamList } from '../../../../types.ts';
import { RouteProp } from '@react-navigation/core';

type TProps = {
  route: RouteProp<TRootStackParamList, 'Article'>;
  navigation: NativeStackNavigationProp<TRootStackParamList, 'Article'>;
};

export const SingleArticleScreen = ({ route }: TProps) => {
  const { article } = route.params;
  return <WebView source={{ uri: article.url }} style={{ flex: 1 }} />;
};
