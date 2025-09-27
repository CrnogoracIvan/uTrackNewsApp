import React, { useMemo, useState } from 'react';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import WebView from 'react-native-webview';
import { TRootStackParamList } from '../../../../types';
import { UtItemNotFound } from '../../../../components/UtItemNotFound/UtItemNotFound.tsx';
import { View } from 'react-native';
import { UtLoadingComponent } from '../../../../components/UtLoadingComponent/UtLoadingComponent.tsx';
import { createStyles } from './SingleArticleScreen.styles.ts';
import { useTheme } from 'react-native-paper';

type TProps = NativeStackScreenProps<TRootStackParamList, 'Article'>;

export const SingleArticleScreen = (props: TProps) => {
  const theme = useTheme();
  const styles = createStyles(theme);
  const { route } = props;
  const { article } = route.params;
  const [hasError, setHasError] = useState(false);
  const [loading, setLoading] = useState(true);

  const customArticleUrl = useMemo(() => {
    if (
      article.url.startsWith('http://') ||
      article.url.startsWith('https://')
    ) {
      return article.url;
    }
    return `https://${article.url}`;
  }, [article.url]);

  return (
    <View style={styles.container}>
      {loading && !hasError && (
        <View style={styles.loaderContainer}>
          <UtLoadingComponent />
        </View>
      )}
      {hasError ? (
        <UtItemNotFound iconName={'link-variant-off'} text={'Page Not Found'} />
      ) : (
        <WebView
          source={{ uri: customArticleUrl }}
          onLoadStart={() => setLoading(true)}
          onLoadEnd={() => setLoading(false)}
          onError={() => setHasError(true)}
          onHttpError={() => setHasError(true)}
          javaScriptEnabled={true}
          domStorageEnabled={true}
          startInLoadingState={true}
          originWhitelist={['*']}
          allowsInlineMediaPlayback={true}
          mixedContentMode="compatibility"
          allowFileAccess={true}
        />
      )}
    </View>
  );
};
